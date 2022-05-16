const AWS = require('aws-sdk');
const uuid = require('uuidV4');

const tourId = uuid.uuid().slice(0,5);

const aws_remote_config = {
  accessKeyId: "",
  secretAccessKey: "",
  region: "ap-south-1",
};

const getTour = function (req, res) {
    
}


export default function handler(req, res) {

    AWS.config.update(aws_remote_config);

    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
      TableName: "tourbook_tours",
    };

    docClient.scan(params, function (err, data) {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        res.status(200).json({ success: true, message: data });
      }
    });
  //res.status(200).json({ message: "reply from db", tourId: tourId});
}
