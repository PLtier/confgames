
const logoutController = (req, res) => {
res.clearCookie('token');
res.send('succesfully left')
};

module.exports = logoutController;