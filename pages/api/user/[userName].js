const AWS = require("aws-sdk");

import { awsTourbookUser } from "../../../constants"
// const awsTourbookUser = {
//   accessKeyId: process.env.TOURBOOK_AWS_ACCESS_ID,
//   secretAccessKey: process.env.TOURBOOK_AWS_SECRET_KEY,
//   region: process.env.TOURBOOK_AWS_REGION,
// };

export default function handler(req, res) {
  const { userName } = req.query;
  AWS.config.update(awsTourbookUser);

  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: "tourbook_users",
    Key: {
      userName,
    },
  };

  docClient.get(params, function (err, data) {
    const { Item } = data;
    if (err) {
      console.log(err);
      res.json({ success: false, message: err });
    } else {
      if (Object.keys(data).length === 0)
        res.status(404).json({ success: false, message: "User not found!" });
      else res.status(200).json({ success: true, Item });
    }
  });
}
