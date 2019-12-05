const jwt = require('jsonwebtoken');

const generateToken = (sponsorName) => {
    return jwt.sign({ sponsorName}, process.env.JWT_SECRET, {
        expiresIn: process.env.NODE_ENV !== 'production' ? '1d' : '7d',
    });
};
module.exports = generateToken;