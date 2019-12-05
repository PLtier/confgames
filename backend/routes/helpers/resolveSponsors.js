const {model} = require('../../models/Sponsor');
const Sponsor = model;

const getSponsor = (req, res, next) => {
    let sponsor = req.sponsor;
    Sponsor.findOne(sponsor).then(sponsor => {
        res.locals.sponsor = sponsor;
        next();
    });
};

module.exports = getSponsor;