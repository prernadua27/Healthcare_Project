// first we are initializing jsonwebtoken moduke to use functionalities of JWT e.g:. sign,. verify

const jwt = require('jsonwebtoken');

//After successful Register of UserActivation, and then calling the login endpoint with the already regisstered userModels, 
//It will create and return JWT Token.

const generateJwtToken = (userData)=>{
    return jwt.sign(userData,process.env.PRIVATE_KEY,{expiresIn:400000})
}

//After login we are adding the token and for vallidating the JWT token that it is correct or not we will proceed with secure routes to GET/POST/UPDATE/DELETE.

const validateJwtToken = (req,res,next) => {
    //we are checking that token is available or not in request headers
    const authCheck = req.headers.authorization;
    //option 1: req header token ,auth not sent

    if(!tokenCheck) return res.status (401).json({err:"TOKEN NOT AVAILABLE"});
     //403: forbidden

     //option 2: req header token : but not in a right format 
     //authorization : BASIC / BEARER
     // BASIC btoa(USERNAME_PASSWORD) -> BASIC [base64]
     //BEARER : hhfhbhdjcnsnisciu;        

    const token = req.headers.authorization.split(' ')[1];

    if(!token){
        return res.status(401).json({err:'Invalid Token'});
    }

    try{
        const validateToken= jwt.verify(token,process.env.PRIVATE_KEY);
        req.user=validateToken;
        next();
    }catch(err){
        return res.status(401).json(err.message);
    }
};

module.exports={generareJWTToken,validateJwtToken}