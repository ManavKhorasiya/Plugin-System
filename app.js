var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// let request = require('request');
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth : `5b0fbad7df8f091c952d62d2aab7236ab549ff6f`});
const request = require('request');
const fs = require('fs');
// let demo_package = require('./Packages/Demo Package');

const releases = octokit.request("GET /repos/{owner}/{repo}/releases/assets/{assets_id}", {
  owner : 'ManavKhorasiya',
  repo : 'Demo-Package',
  assets_id : 24333955,
}).then((response) => {
  let url = response.data.url;
  var name = response.data.name;
  console.log(name);
  request(
    {
      url : url,
      method : "GET",
      headers : {
        Accept : "application/octet-stream",
        Authorization : "5b0fbad7df8f091c952d62d2aab7236ab549ff6f",
        "User-Agent" : "",
      }
    }, (err,response,body) => {
      if(err) {
        console.log(err);
      }
      console.log(response.statusCode);
      if(!err && response.statusCode == 200) {
        fs.writeFile(name, body, (err) => {
          if(err) {
            console.log(`Error occurred in writing file : ${err}`);
          } else {
            console.log('File written');
          }
        })
      }
    }
  )
});

// console.log(name);
