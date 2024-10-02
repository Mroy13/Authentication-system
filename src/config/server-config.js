const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    PORT: process.env.PORT,
    SALTROUNDS: process.env.SALT_ROUND,
    SECRET_KEY: process.env.SECRET_KEY,
}