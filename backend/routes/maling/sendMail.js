const express = require("express");
const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");
const router = express.Router();
const objectTo64Csv = require('./csvCreator');

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/", async (req, res) => {
  let {sponsor} = res.locals;
      let {mail} = req.body;
      let csv = [];


        sponsor.competitions.forEach(competition=>{
          // let data = JSON.parse(JSON.stringify(competition));
          // console.log(data);
            competition.participants.forEach(participant=>{
                let {competitionName} = competition,
                    {first_name, last_name, mail} = participant,
                    object = {
                        competitionName,
                        first_name,
                        last_name,
                        mail
                    };
                csv.push(object);
            })
        });

       let data = await objectTo64Csv(JSON.parse(JSON.stringify(csv)));
    const msg = {
      to: mail,
      from: "test@example.com",
        subject: 'Lista uczestników konkursów ConFrontJS 2019',
        text:'To lista Twoich uczestników z konkursów ConFrontJS 2019',
      attachments:[{
          content: data,
          filename: 'confrontjsparticipants.csv',
          type: 'plain/csv'
      }]
    };
    sgMail.send(msg)
    .then(()=> res.json({
      success: true,
      message: 'mail has been sent'
    })).catch(err => res.json({
      success: false,
      message: err.toString()
    }))
});

module.exports = router;
