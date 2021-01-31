const express = require('express');
const Result = require('../models/result');
const { login, findUser } = require('../controller/user');
const { md5 } = require('../utils');
const { PWD_SALT, PRIVATE_KEY, JWT_EXPIRED } = require('../conf/config');
const boom = require('boom');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/info', (req, res) => {
    findUser('admin').then(user => {
        console.log(user);
        if (user) {
            new Result({ userInfo: user }, '用户信息查询成功').success(res);
        } else {
            new Result('用户信息查询失败').fail(res);
        }
    })
})

router.post(
    '/login',
    [
        body('username').isString().withMessage('用户名必须为字符'),
        body('username').isString().withMessage('密码必须为字符')
    ],
    (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            const [{ msg }] = err.errors;
            next(boom.badRequest(msg));
        } else {
            let { username, password } = req.body;
            password = md5(`${password}${PWD_SALT}`);
    
            login(username, password).then(user => {
                if (!user || user.length === 0) {
                    new Result('登录失败').fail(res);
                  } else {
                    const token = jwt.sign(
                      { username },
                      PRIVATE_KEY,
                      { expiresIn: JWT_EXPIRED }
                    )
                    new Result({ token }, '登录成功').success(res);
                }
            })
        }
    })

module.exports = router;