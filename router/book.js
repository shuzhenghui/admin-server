const express = require('express');
const Result = require('../models/result');
const { UPLOAD_PATH } = require('../conf/config');
// const boom = require('boom');
const multer = require('multer');

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `${UPLOAD_PATH}/book`);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
});

router.post('/upload', upload.single('file'), (req, res, next) => {
    if (!req.file || req.file.length === 0) {
        new Result('上传电子书失败').fail(res)
    } else {
        new Result('上传成功').success(res)
    }
})

module.exports = router;