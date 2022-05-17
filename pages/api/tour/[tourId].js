const AWS = require("aws-sdk");
const uuid = require("uuidV4");

const tourId = uuid.uuid().slice(0, 5);

const awsTourbookUser = {
  accessKeyId: "AKIAQZMKKHQJFO4NBIYU",
  secretAccessKey: "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",
  region: "ap-south-1",
};

export default function handler(req, res) {
  const { tourId } = req.query;
  AWS.config.update(awsTourbookUser);

  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: "tourbook_tours",
    Key: {
      tourId: tourId,
    },
  };

  docClient.get(params, function (err, data) {
    const { Item } = data;
    if (err) {
      res.json({ message: err });
    } else {
      if (Object.keys(data).length === 0)
        res.status(404).json({ message: "Tour not found!" });
      else res.status(200).json({ success: true, Item });
    }
  });
  //res.status(200).json({ message: "reply from db", tourId: tourId});
}
