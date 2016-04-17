'use strict';
const qiniu = require("qiniu");
const config = require('./config.js');

qiniu.conf.ACCESS_KEY = config.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.SECRET_KEY;
//const bucket = config.bucket;
const bucket = 'test';
const domain = config.domain;

const getUptoken = bucket => {
  const putPolicy = new qiniu.rs.PutPolicy(bucket);
  return putPolicy.token();
};

//构造上传函数
const uploadFile = (bucket, localFile) => {
  const uptoken = getUptoken(bucket);
  const extra = new qiniu.io.PutExtra();
  qiniu.io.putFileWithoutKey(uptoken, localFile, extra, (err, ret) => {
    if (!err) {
      console.log(ret);
    } else {
      console.log(err);
    }
  });
};

// Run
const filePath = './README.md';
uploadFile(bucket, filePath);
