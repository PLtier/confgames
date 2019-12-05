const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const CompetitionSchema = new Schema({
    competitionName: {
        type: String,
        required: true
    },
    participants: [User.schema]
});

const Competition = mongoose.model('competition', CompetitionSchema);

module.exports = {
    schema: CompetitionSchema,
    model: Competition
};