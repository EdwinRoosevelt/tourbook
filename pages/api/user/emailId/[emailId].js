const AWS = require("aws-sdk");

import { awsTourbookUser } from "../../../../constants"
// const awsTourbookUser = {
//   accessKeyId: process.env.TOURBOOK_AWS_ACCESS_ID,
//   secretAccessKey: process.env.TOURBOOK_AWS_SECRET_KEY,
//   region: process.env.TOURBOOK_AWS_REGION,
// };


export default function handler(req, res) {
  const { emailId } = req.query;
  AWS.config.update(awsTourbookUser);

  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: "tourbook_users",
    IndexName: "emailId-index",
    Key: {
      emailId
    },
    KeyConditionExpression: "emailId = :hkey",
    ExpressionAttributeValues: {
      ":hkey": emailId,
    },
  };

  docClient.query(params, function (err, data) {
    if (err) {
      console.log(err);
      res.json({ success: false, message: err });
    } else {
      if (data.Count === 0)
        res.status(404).json({ success: false, message: "No User with such an emailId found!" });
      else res.status(200).json({ success: true, Item: data.Items[0] });
    }
  });
}
