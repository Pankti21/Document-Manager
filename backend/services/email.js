import { SNSClient, AddPermissionCommand, PublishCommand } from "@aws-sdk/client-sns";

const client = new SNSClient({ region: "us-east-1" });

const params = {
  Subject: "Cloud Crowd : Notification",
  Message: "You are subscribed to Cloud Crowd email notification service",
  TopicArn: "arn:aws:sns:us-east-1:257091321010:FileTopic",
};

const publishToSNS = async () => {
  try {
    const command = new PublishCommand(params);
    const { MessageId } = await client.send(command);
    console.log(`Your message with id ${MessageId} has been delivered.`);
  } catch (e) {
    console.log(e);
  }
};

publishToSNS();
