'use strict';
const path = require('path');
const fs = require('fs');
const qiniu = require('qiniu');
const config = require('./config.js');

qiniu.conf.ACCESS_KEY = config.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.SECRET_KEY;

const getUptoken = bucket => {
  const putPolicyObj = {
    scope: bucket,
    returnBody: '{"key":$(key),"mimeType":$(mimeType)}',
    saveKey: '${year}${mon}${day}${hour}${min}-$(etag)'
  };
  const putPolicy = new qiniu.rs.PutPolicy2(putPolicyObj);
  return putPolicy.token();
};

//构造上传函数
const uploadFile = (bucket, domain, localFile) => {
  const uptoken = getUptoken(bucket);
  const extra = new qiniu.io.PutExtra();
  const attname = path.basename(localFile);
  qiniu.io.putFileWithoutKey(uptoken, localFile, extra, (err, ret) => {
    if (!err) {
      let url = "http://" + domain + "/" + ret.key;
      let markdown;
      if (ret.mimeType != null && ret.mimeType.startsWith("image")) {
        url += "?imageView2/2/w/800/h/600";
        markdown = getMarkdownImage(url, attname);
      } else {
        url = url + "?attname=" + attname;
        markdown = getMarkdownLink(url, attname);
      }
      console.log(markdown);
    } else {
      console.log(err);
    }
  });
};

const getMarkdownLink = (link, text) => '[' + text + '](' + link + ')';
const getMarkdownImage = (link, text) => '![' + text + '](' + link + ')';
const dig = (pathName, depth, process) => {
  if (fs.statSync(pathName).isDirectory() && depth > 0) {
    fs.readdirSync(pathName).forEach(val => {
      dig(pathName + '/' + val, depth - 1, process);
    });
  } else if (fs.statSync(pathName).isFile()) {
    process(pathName);
  }
};

// Run
const args = process.argv.slice(2);
args.forEach(pathName => {
  dig(path.resolve(pathName), 1, val => {
    uploadFile(config.bucket, config.domain, val);
  });
});
