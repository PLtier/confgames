const mongoose = require('mongoose');
const Competition = require('./Competition');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const SponsorSchema = new Schema({
    sponsorName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },

    competitions: [Competition.schema],
    date: {
        type: Date,
        default: Date.now
    }
});

SponsorSchema.methods.comparePassword = function(plaintext, callback){
    let test = bcrypt.compareSync(plaintext, this.password);
    return callback(null, test);
};

SponsorSchema.pre("save", function(next){
    if(!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});


const Sponsor = mongoose.model('sponsor', SponsorSchema);
module.exports = {
    schema: SponsorSchema,
    model: Sponsor
};