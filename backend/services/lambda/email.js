import AWS from 'aws-sdk';
import {SENDER_EMAIL_ADDRESS} from "../../utils/constants.js";

export const sendEmails = async (emails, subject, message) => {
    AWS.config.update({"region": "us-east-1"});
    const params = {
        ConfigurationSetName: "cloud-crowd",
        Source: SENDER_EMAIL_ADDRESS,
        Destination: {
            ToAddresses: emails
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: message
                },
                Text: {
                    Charset: "UTF-8",
                    Data: message
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject
            }
        }
    };
    try {
        const data = await new AWS.SES().sendEmail(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (e) {
        console.error(e);
        return {
            statusCode: 400,
            body: JSON.stringify(e),
        };
    }
}

export const sendVerificationEmail = async (email) => {
    const params = {
        EmailAddress: email
    }
    AWS.config.update({"region": "us-east-1"});
    try {
        const data = await new AWS.SES().verifyEmailIdentity(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (e) {
        console.error(e);
        return {
            statusCode: 400,
            body: JSON.stringify(e),
        };
    }
}