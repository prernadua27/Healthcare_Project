var jwt = require('jsonwebtok');
const createToken = (userData) =>{
    return jwt.sign(userData,process.env);
    JWT_SECRET
}