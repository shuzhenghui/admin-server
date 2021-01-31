const isEnv = require('../utils/env');

const UPLOAD_PATH = isEnv ? 'E:/项目目录/vue-admin/database' : 'E:/项目目录/vue-admin/fatdatabase';

module.exports = {
    CODE_ERROR: -1,
    CODE_SUCCESS: 0,
    CODE_TOKEN_EXPIRED: -2,
    debug: true,
    PWD_SALT: 'admin_node',
    PRIVATE_KEY: 'admin_template',
    JWT_EXPIRED: 60 * 60, // token失效时间
    UPLOAD_PATH
}