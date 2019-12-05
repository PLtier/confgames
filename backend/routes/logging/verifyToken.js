const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();
const verifyToken = async (req, res, next) => {
    const authHeader = req.header('Authorization').trim()
    const token = authHeader && authHeader.split(' ')[1] || '';
    console.log(authHeader, token)
    try {
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'You need to login'
            })
        }
        const decrypt = await jwt.verify(token, process.env.JWT_SECRET);
        req.sponsor = {
            sponsorName: decrypt.sponsorName
        }
        next()
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Invalid token'
        })
    }
};

module.exports = verifyToken;