import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';

const REGION = 'us-east-1';

const sesClient = new SESClient({ region: REGION });
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'aduran.yoel+from@gmail.com';

const createSendEmailCommand = (toAddresses: string[]) => {
  return new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: [
        /* more items */
      ],
      ToAddresses: toAddresses,
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: 'UTF-8',
          Data: 'HTML_FORMAT_BODY',
        },
        Text: {
          Charset: 'UTF-8',
          Data: 'TEXT_FORMAT_BODY',
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'EMAIL_SUBJECT',
      },
    },
    Source: FROM_EMAIL,
    ReplyToAddresses: [
      /* more items */
    ],
  });
};

export const sendEmail = async (toAddresses: string[]) => {
  const sendEmailCommand = createSendEmailCommand(toAddresses);

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (e) {
    console.error('Failed to send email.');
    throw e;
  }
};
