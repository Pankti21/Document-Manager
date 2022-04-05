import AWS from "aws-sdk";

export const invokeLambda = (FunctionName, Payload) => {
    console.log("hello1");
    AWS.config.update({region: "us-east-1"});
    const params = {
        FunctionName,
        Payload,
    };
    const lambda = new AWS.Lambda();
    lambda.invoke(params, (error, data) => {
        console.log("hello2");
        if (error) {
            console.log(error);
            console.log(error);
        } else {
            console.log("hello");
            console.log(data);
        }
    });
};
// invokeLambda("sendVerificationEmail", '{"email" : "uppeabhishek97@gmail.com"}');
// invokeLambda("sendEmail", '{"emails" : ["uppeabhishek97@gmail.com"], "message": "hello", "subject": "world"}');
