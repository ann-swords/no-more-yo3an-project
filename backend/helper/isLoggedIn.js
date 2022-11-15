const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    // const token = req.header("x-auth-token");
    console.log('req header', req.headers);

    let token = ""
    let authorizationToken = req.header("Authorization");
    console.log(authorizationToken);

    if(!authorizationToken){
        return res.status(401).json({ message : "Ahaaan!!! You are not allowed to view this as this is a protected route."})
    }

    if(authorizationToken){
        authorizationToken = authorizationToken.replace("Bearer ", "");
        console.log(authorizationToken);
        token = authorizationToken;
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded.user;
        next(); //move to the next instruction
    } catch(err){
        return res.status(401).json({message: "Your token is invalid."})
    }
};