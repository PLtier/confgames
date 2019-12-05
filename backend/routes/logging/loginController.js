const generateToken = require('./generator');
const accountExists = require('./accountExists');
const login = async (req, res) => {

    try {
        const result = await accountExists(req.body.sponsorName, req.body.password);
        const {sponsorName} = result;
        const token = generateToken(sponsorName)
        console.log(token)
        res.json({
            success: true,
            token
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.toString()
        })
    }
};
// loginController.js file
module.exports = login;