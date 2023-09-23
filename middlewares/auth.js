const jwt = require('jsonwebtoken');

const { promisify } = require('util');
async function auth(req, res, next) {
    const {authorization} = req.headers
    if (!authorization) {
        return res.status(401).json({message:"Please Login First"})
    }
    try{
        let decoded =await promisify(jwt.verify)(authorization,process.env.SECRET);
        req.id = decoded.id
        req.role = decoded.role
        next();
    }catch(err){
        return res.status(401).json({message:"Please Login First"})
    }
}

module.exports = {auth};