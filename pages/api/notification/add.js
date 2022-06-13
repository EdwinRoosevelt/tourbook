const AWS = require("aws-sdk");

const awsTourbookUser = {
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
};

export default function handler(req, res) {
  AWS.config.update(awsTourbookUser);

  const docClient = new AWS.DynamoDB.DocumentClient();

  const { inviter, invitee, tourId, tourTitle, inviteType } = req.body;

  const params = {
    TableName: "tourbook_users",
    Key: {
      userName: invitee,
    },
  };

  var notifications;
  var isNewNotification = true;
  
  docClient.get(params, function (err, data) {
    if (err) {
      res.json({ success: false, message: err });
    } else {

      notifications = data.Item.notifications;

      data.Item.notifications.map((item) => {
        if (item.tourId === tourId) isNewNotification = false;
      });

      // res.status(200).json({ success: true, isNewNotification });
      if (isNewNotification) {
        const params = {
          TableName: "tourbook_users",
          Key: {
            userName: invitee,
          },
          AttributeUpdates: {
            notifications: {
              Action: "ADD",
              Value: [{ inviteType, inviter, tourId, tourTitle }],
            },
          },
        };
        docClient.update(params, function (err, data) {
          if (err) {
            res.json({ success: false, message: err });
          } else {
            res.status(200).json({ success: true, message: "Invite sent!" });
          }
        });
      } else {
        res.status(200).json({ success: true, message: "Invite already sent" });
      }
    }
  });


  



}
