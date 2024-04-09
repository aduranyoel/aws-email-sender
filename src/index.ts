import { SQSEvent, Handler, APIGatewayProxyResult } from 'aws-lambda';
import { sendEmail } from './utils/sendEmail';

export const handler: Handler = async (event: SQSEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log('event', event);

    await sendEmail(['aduran.yoel+to@gmail.com']);

    return {
      body: JSON.stringify({ success: true }),
      headers: {
        'content-type': 'application/json',
      },
      statusCode: 200,
    };
  } catch (error) {
    console.error('ERROR: sending mail: ', error);
    return {
      body: JSON.stringify({ error }),
      headers: {
        'content-type': 'application/json',
      },
      statusCode: 500,
    };
  }
};
