const jwt = require('jsonwebtoken')
const {User} = require('../database/model/model')

const authenticate = async (req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try{
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token,"x3V9LcU67DKjWlP5ZT8GfX2NrYvSEsCq");


            req.user = await User.findById(decoded.id);
            console.log(req.user)
            next();
        }catch(err){

            console.log(err)
            res.status(401).json({message:"Not authorized"})
        }
    }

    if(!token){
        console.log("User not authorized")
        res.status(401).json({message:"Not authorized, No token"})
    }
}

module.exports = {authenticate}