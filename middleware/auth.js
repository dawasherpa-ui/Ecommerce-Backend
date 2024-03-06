const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey=process.env.SECRETKEY

// Middleware function to verify JWT token from cookie
function verifyToken(req, res, next) {
    // Get the JWT token from the cookie
    if (req.method !== 'GET') {
        try{
            const token = req.cookies.jwt;
        
            if (!token) {
                return res.status(401).json({auth:false, message: 'Unauthorized: No token provided' });
            }
            // Verify the JWT token
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ auth:false,message: 'Forbidden: Invalid token' });
                }
                // If token is valid, attach decoded token to request object for use in other middleware or routes
                req.decoded = decoded;
                next();
            });}
            catch(err){
                console.log(err)
            }
    } else {
        next()
    }
}

module.exports = {verifyToken};