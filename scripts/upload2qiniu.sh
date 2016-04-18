#!/usr/bin/env bash
node ~/work/qiniu-upload/upload.js $@ | tee -a ~/qiniu-upload.log | pbcopy