const mongoose = require('mongoose');
const SponsorData = require('../models/Sponsor');
let Sponsor = SponsorData.model;
const CompetitionData = require('../models/Competition');
let Competition = CompetitionData.model;
const UserData = require('../models/User');
let User = UserData.model;
const fs = require('fs');
const db = require('../config/dbConnection');
db();
const database = mongoose.connection;

const listSponsors = () => {
    Sponsor.find().then(sponsors => {
        console.info(sponsors);
        console.info(`${sponsors.length} sponsors`);
        database.close();
    });
}

const addSponsor = async (sponsor) => {
    try {
        let user = new Sponsor(sponsor);
        let password = user.password;
        await user.save();
        console.log(`added, password is ${password}`)
    } catch (error) {
        console.log(error.toString());
    }
    database.close();
}


const removeSponsor = (sponsorName) => {
    Sponsor.remove({ sponsorName })
        .then(sponsor => {
            console.info('Sponsor Removed');
            database.close();
        });
};

const addTestSponsor = async (testName) => {
    let newUser = new User({
            first_name: "test",
            last_name: "test",
            mail: "test"
        }),
        newCompetition = new Competition({
            competitionName: 'test',
            participants: [newUser]
        }),
        newTestSponsor = {
            sponsorName: testName,
            password: "razdwatrzy12#",
            competitions: [newCompetition]
        };

    try {
        let user = new Sponsor(newTestSponsor);
        await user.save();
        console.log('PASSWORD: razdwatrzy12#')
    } catch (error) {
        console.log(error.toString());
    }
    database.close();
}

const addList = (filepath) =>{
//haven't added yet
}

module.exports = {
    listSponsors,
    removeSponsor,
    addSponsor,
    addTestSponsor
}