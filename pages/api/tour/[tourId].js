const AWS = require("aws-sdk");
const uuid = require("uuidV4");

const tourId = uuid.uuid().slice(0, 5);

const awsTourbookUser = {
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
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
      res.json({ success: false, message: err });
    } else {
      if (Object.keys(data).length === 0)
        res.status(404).json({ success: false, message: "Tour not found!" });
      else res.status(200).json({ success: true, Item });
    }
  });
  //res.status(200).json({ message: "reply from db", tourId: tourId});
}
