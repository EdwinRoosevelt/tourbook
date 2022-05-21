const AWS = require("aws-sdk");
const uuid = require("uuidV4");

const tourId = uuid.uuid().slice(0, 8);

const awsTourbookUser = {
  accessKeyId: "AKIAQZMKKHQJFO4NBIYU",
  secretAccessKey: "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",
  region: "ap-south-1",
};

export default function handler(req, res) {

    AWS.config.update(awsTourbookUser);
    const docClient = new AWS.DynamoDB.DocumentClient();

    try {
      if (req.body == null) throw "Empty Requeset Body";

      const Item = req.body;
      Item.tourId = tourId.toUpperCase();

      const params = {
        TableName: "tourbook_tours",
        Item: Item,
      };

      docClient.put(params, function (err, data) {
        if (err) {
          res.status(503).json({ success: false, message: err });
        } else {
            res.status(200).json({
              success: true,
              tourId: Item.tourId,
              message: "Tour added successfully",
            });
        }
      });

      
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
}
