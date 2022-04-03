import { TextractClient, AnalyzeDocumentCommand } from "@aws-sdk/client-textract";
import { S3Object } from "@aws-sdk/client-textract";

const client = new TextractClient({ region: "us-east-1" });

export const analyzeFile = async (fileName) => {
  try {
    const params = {
      Document: {
        S3Object: {
          Bucket: "cloudcrowd2",
          Name: fileName
        }
      },
      FeatureTypes: ["FORMS", "TABLES"]
    };

    const command = new AnalyzeDocumentCommand(params);
    const result = await client.send(command);

    return result.Blocks;
  } catch (err) {
    console.log(err);
    return;
  }
}