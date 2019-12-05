const express = require("express");
const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        let {sponsor} = res.locals;
        res.json(sponsor.competitions)
    })
    .delete((req, res) => {
        let {sponsor} = res.locals;
        sponsor.competitions = [];
        sponsor.save();
        res.send('sponsor data cleared')
    });

module.exports = router;