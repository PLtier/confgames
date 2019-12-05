const express = require('express');
const loginController = require('./loginController');
const logoutController = require('./logoutController');
const router = express.Router();
const {model} = require('../../models/Sponsor');
const Sponsor = model;

router.post('/in', loginController);
router.post('/out', logoutController);


//ewentualne tworzenie nowych
// router.post("/register", async (request, response) => {
//     try {
//         let user = new Sponsor(request.body);
//         // response.send(user);
//         let result = await user.save();
//         response.send(result);
//     } catch (error) {
//         response.status(500).send(error.toString());
//     }
// });
module.exports = router;
