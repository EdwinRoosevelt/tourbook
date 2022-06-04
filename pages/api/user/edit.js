const AWS = require("aws-sdk");

const awsTourbookUser = {
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
};

export default function handler(req, res) {
  AWS.config.update(awsTourbookUser);
  const docClient = new AWS.DynamoDB.DocumentClient();

  try {
    if (req.body == null) throw "Empty Requeset Body";

    const Item = req.body;

    const params = {
      TableName: "tourbook_users",
      Item: Item,
    };

    docClient.put(params, function (err, data) {
      if (err) {
        console.log(err);
        res.status(503).json({ success: false, message: err });
      } else {
        console.log(data);
        res.status(200).json({
          success: true,
          userId: Item.userId,
          message: "User editted successfully",
        });
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
}
