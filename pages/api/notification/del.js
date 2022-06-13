const AWS = require("aws-sdk");

const awsTourbookUser = {
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
};

export default function handler(req, res) {
  AWS.config.update(awsTourbookUser);

  const docClient = new AWS.DynamoDB.DocumentClient();

  const { user, tourId, inviteType } = req.body;

  const params = {
    TableName: "tourbook_users",
    Key: {
      userName: user,
    },
  };

  // res.status(200).json({ success: true, user, tourId });

  docClient.get(params, function (err, data) {
    if (err) {
      res.json({ success: false, message: err });
    } else {

        var userData = data.Item;

        const newNotifications = data.Item.notifications.filter(item => {
            return item.tourId !== tourId
        })

        userData.notifications = newNotifications

      // res.status(200).json({ success: true, data: newNotifications });

      const params = {
        TableName: "tourbook_users",
        Item: userData,
      };

      docClient.put(params, function (err, data) {
        if (err) {
          console.log(err);
          res.status(503).json({ success: false, message: err });
        } else {
          console.log(data);
          res.status(200).json({
            success: true,
            message: "notification deleted successfully",
          });
        }
      });

    }
  });
}