const AWS = require("aws-sdk");

import { awsTourbookUser } from "../../../constants";

export default function handler(req, res) {
  AWS.config.update(awsTourbookUser);
  const docClient = new AWS.DynamoDB.DocumentClient();

  const newNotification = req.body;

  // Getting Recepient userData
  const params = {
    TableName: "tourbook_users",
    Key: {
      userName: newNotification.recipient,
    },
  };
  docClient.get(params, function (err, data) {
    if (err) {
      res.json({ success: false, message: err });
    } else {

      // Adding Notification
      if (newNotification.method === "ADD")
        data.Item.notifications.push(newNotification);

      // Deleting Notification
      else if (newNotification.method === "DEL") {
        const newNotificationList = data.Item.notifications.filter(
          (x) => x.id !== newNotification.id
        );
        data.Item.notifications = newNotificationList;
      }

      // Editing Recepient's notificationList
      const params = {
        TableName: "tourbook_users",
        Item: data.Item,
      };
      docClient.put(params, function (err, data) {
        if (err) {
          res.status(503).json({ success: false, message: err });
        } else {
          if (newNotification.method === "ADD")
            res.status(200).json({
              success: true,
              message: "Notification sent",
            });
          else if (newNotification.method === "DEL")
            res.status(200).json({
              success: true,
              message: "Notification deleted",
            });
        }
      });
    }
  });
}
