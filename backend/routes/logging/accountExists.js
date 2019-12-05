const {model} = require('../../models/Sponsor');
const Sponsor = model;


const accountExists = async (sponsorName, password) =>{

    let sponsor = await Sponsor.findOne({
        sponsorName: sponsorName
    }).exec();

    if (!sponsor) {
        throw new Error('wrong password');
    }

    sponsor.comparePassword(password, (error, match) => {
        if (!match) {
            throw new Error('wrong password')
        } else if (error){
            console.log('d')
        } else{
        }
    });
return sponsor
    // console.log('epic')
};

module.exports = accountExists;