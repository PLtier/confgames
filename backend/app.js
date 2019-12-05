const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const verifyResolveToken = require('./routes/logging/verifyToken');
const logger = require('morgan');
const resolveSponsor = require('./routes/helpers/resolveSponsors');
const connectDB = require('./config/dbConnection');
const allData = require('./routes/api/allData');
const manageCompetition = require('./routes/api/managingCompetition/manageCompetiton');
const sendMailRouter = require('./routes/maling/sendMail');
const logRouter = require('./routes/logging/logRouter');
const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(cors());


app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend/build')));

//Routes
app.use('/competitions', verifyResolveToken, resolveSponsor, manageCompetition); //ready
app.use('/sendmail', verifyResolveToken, resolveSponsor, sendMailRouter);
app.use('/log', logRouter); //ready
app.use('/allData', verifyResolveToken, resolveSponsor, allData); //działa


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

if(process.env.NODE_ENV === 'production'){
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'))
  })
}

//connect to db
connectDB();

module.exports = app;
