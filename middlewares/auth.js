const jwt = require('jsonwebtoken');

const { promisify } = require('utile');
async function auth(req, res, next) {
    const {authorization} = req.headers
    if (!authorization) {
        return res.status(401).json({message:"Please Login First"})
    }
    try{
        await promisify(jwt.verify)(authorization,process.env.SECRET);
        next();
    }catch(err){
        return res.status(401).json({message:"Please Login First"})
    }
}

module.exports = auth;