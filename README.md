# qiniu-upload

主要用于 Markdown 写作时插入图片和文件超链接的需求.

在命令行中指定多个要上传的文件或文件夹, 该应用将自动上传文件到七牛云, 并且返回 Markdown 格式的图片或文件的链接.

使用方法:

- 复制 config-sample.js 到 config.js
- 配置 config.js, 主要是七牛云账户相关的信息
- 运行命令 `node upload.js args...`

`args` 可以是多个文件名或者文件夹名称. 如果是文件夹名称, 会上传该文件夹下所有文件（包括 . 开头的隐藏文件, 但不包括子文件夹）

返回格式如下:

```
[desktop.ini](http://cdn.yyqian.com/201604181255-FjDO2SfiO1hHJc8WNROUF1ptKpV3?attname=desktop.ini)
[upload.js](http://cdn.yyqian.com/201604181255-FtPw_MbFHH8amIj5TVyONSkKy9KB?attname=upload.js)
[upload-history.log](http://cdn.yyqian.com/201604181255-FrNtXI0y-X_BFJ7LVsDhD5YGdD2Q?attname=upload-history.log)
![ss.jpg](http://cdn.yyqian.com/201604181255-FuyxlbTOMYTV4It7CAKqbB8Typas?imageView2/2/w/800/h/600)
```

也可以根据需要使用 bash script 将输出复制到粘贴板, 见 upload.sh 示例脚本.