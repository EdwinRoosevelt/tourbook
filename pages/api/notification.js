const AWS = require("aws-sdk");

const awsTourbookUser = {
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
};

export default function handler(req, res) {
  AWS.config.update(awsTourbookUser);

  const docClient = new AWS.DynamoDB.DocumentClient();

  const { type, userName, tourId, action } = req.body;

  const params = {
    TableName: "tourbook_users",
    Key: {
      userName,
    },
    AttributeUpdates: {
      notifications: {
        Action: "ADD",
        Value: [{ type: "TourInvite", tourId: tourId }],
      },
    },
  };

  docClient.update(params, function (err, data) {
    if (err) {
      res.json({ success: false, message: err });
      console.log(err);
    } else {
      res.status(200).json({ success: true, data });
    }
  });
}
