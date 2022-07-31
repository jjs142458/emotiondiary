const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

const endpoint = new AWS.Endpoint("https://kr.object.ncloudstorage.com");
const region = "kr-standard";
const access_key = "gU9VGNv35GsjaRvB8pX8";
const secret_key = "duMzuAB4UQjccjNcPqURA8Ov0ohBVnuCrwy4x3e1";

const S3 = new AWS.S3({
  endpoint: endpoint,
  region: region,
  credentials: {
    accessKeyId: access_key,
    secretAccessKey: secret_key,
  },
});

function setUpload(bucket) {
  const upload = multer({
    storage: multerS3({
      s3: S3,
      bucket: bucket,
      acl: "public-read-write",
      key: function (req, file, cb) {
        let extension = path.extname(file.originalname);
        cb(null, Date.now().toString() + extension);
      },
    }),
  }).single("file");

  return upload;
}

module.exports = setUpload;
