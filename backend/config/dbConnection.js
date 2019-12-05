const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const mongoURI = `mongodb://localhost:27017/${process.env.DB_NAME}`

const connectDB = () => {
    let database = mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
        .catch(err => console.log(err));
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }
    return database;
};
module.exports = connectDB;