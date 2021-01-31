const express = require('express');
const fs = require('fs');
const router = require('./router');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const FileStreamRotator = require('file-stream-rotator');

const app = express();

//设置日志文件目录
const logDir = __dirname + '/logs';

//确保日志文件目录存在 没有则创建
fs.existsSync(logDir) || fs.mkdirSync(logDir);

//创建一个写路由
const accessLogStream = FileStreamRotator.getStream({
    filename: logDir + '/accss-%DATE%.log',
    frequency: 'daily',
    verbose: false
})

//写入日志文件
app.use(logger('combined', { stream: accessLogStream }));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);


module.exports = app;
