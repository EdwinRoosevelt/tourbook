const AWS = require("aws-sdk");


const awsTourbookUser = {
  accessKeyId: "AKIAQZMKKHQJFO4NBIYU",
  secretAccessKey: "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",
  region: "ap-south-1",
};

export default function handler(req, res) {
  AWS.config.update(awsTourbookUser);

  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: "tourbook_tours",
  };

  docClient.scan(params, function (err, data) {
    const { Items } = data;
    if (err) {
      res.status(503).json({ success: false, message: err });
    } else {
      if (Object.keys(data).length === 0)
        res.status(404).json({ success: false, message: "Tour not found!" });
      else res.status(200).json({ success: true, Items });
    }
  });
  //res.status(200).json({ message: "reply from db", tourId: tourId});
}
