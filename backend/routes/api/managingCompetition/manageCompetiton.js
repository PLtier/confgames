const express = require("express");
const router = express.Router();
const users = require('./users');
const Competition = require('../../../models/Competition');

const {model} = require("../../../models/Sponsor");
const Sponsor = model;

router
    .post('/', (req, res) => {
    let {sponsor} = res.locals,
        //w body jest competition name
        newCompetition = new Competition.model(req.body);
        sponsor.competitions.push(newCompetition);
        sponsor.save();
        res.json({
            success: true,
            message: 'competition has been created'
        })
});



router
    .route('/:id')
    .delete((req, res) => {
        let {sponsor} = res.locals,
            {id} = req.params;
        sponsor.competitions.find(x => x._id = id).remove();
        sponsor.save();
        res.json({
            success: true,
            message: 'competition has been deleted'
        })
    })
    .patch((req, res) => {
        let {sponsor} = res.locals,
            {id} = req.params,
            {newCompetitionName} = req.body;
            sponsor.competitions.find(x => x._id = id).competitionName = newCompetitionName;
        sponsor.save();
        res.json({
            success: true,
            message: 'competition name has been changed'
        })
    });



router.use('/:id/users', (req,res,next)=>{
    let sponsor = req.sponsor,
        {id} = req.params;
    Sponsor.findOne(sponsor).then(sponsor=>{
        res.locals.competition = sponsor.competitions.find(x => x._id = id)
        res.locals.sponsor = sponsor;
        next();
    });
}, users);

module.exports = router;