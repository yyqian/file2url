#!/usr/bin/env bash
cd ~/Downloads/qiniu-upload
mv ~/Desktop/Screen*.png .
sh ~/upload2qiniu.sh . && rm -rf *