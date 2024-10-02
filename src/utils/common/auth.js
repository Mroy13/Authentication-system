const jwt = require('jsonwebtoken');
function createJwttoken(data, secret_key) {
    try {
        const res = jwt.sign({
            data
        }, secret_key, { expiresIn: '5m' });
        return res;
    } catch (error) {
        throw error;
    }
    
}

function verifyToken(token,key){
try {
    const res= jwt.verify(token,key);
    return res;
} catch (error) {
    throw error;
}
}
module.exports = {
    createJwttoken,
    verifyToken
}