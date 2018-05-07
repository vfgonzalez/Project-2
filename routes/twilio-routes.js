

const http = require('http');
// const express = require('express');
// const bodyParser = require("body-parser")
const MessagingResponse = require('twilio').twiml.MessagingResponse;
// const app = express();
// const session = require('express-session');
// var sequelize = require('sequelize');
var db = require("../models");
// const $ = require("jquery")
require('dotenv').config()

// JSDOM and jQuery:
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// dom = JSDOM.fromFile("../public/index.html", options).then(dom => {
//   console.log(dom.serialize());
// });

const moment = require("moment");



// var jsonParser = bodyParser.json()
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

// parse various different custom JSON types as JSON
// app.use(bodyParser.json({ type: 'application/*+json' }))

// parse some custom thing into a Buffer
// app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
// app.use(bodyParser.text({ type: 'text/html' }))

const accountSid = process.env.TWILIO_ACCOUNT_SID_LIVE;
const authToken = process.env.TWILIO_AUTH_TOKEN_LIVE;
const client = require('twilio')(accountSid, authToken);



var timestamp = moment().format("ddd, DD MMM YYYY HH:mm ZZ")
var postingStamp = moment().format("ddd, MMM Do YYYY")


var dataArr = {}
var smsPostObj = {}

// function below to add alert to index page when new SMS posting comes in
function addAlert(){
  // $(".sms-alert").append(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
  //       <strong>NEW SMS Link</strong> Click <a href="/index">HERE</a> to refresh the page.
  //       <button type="button" class="close" data-dismiss="alert" aria-label="Close">
  //         <span aria-hidden="true">&times;</span>
  //       </button>
  //     </div>`)
  console.log("AddAlert function Runs");
  
}


module.exports = function (app) {
  app.post('/sms', (req, res, next) => {
    const twiml = new MessagingResponse();
    // ===initial message, auto reply
    twiml.message('Welcome to Slack overflow! Thanks for sharing your link! Visit us at www.slackerflow.herokuapp.com !');
    res.writeHead(200, { 'Content-Type': 'text/xml' });

    client.messages.each({
      dateSent: timestamp,
      to: process.env.TWILIO_NUMBER,
    },

      function (messages) {
        // console.log(messages.body);
        dataArr = messages.body
        // console.log("Stored Value: "+dataArr);
        smsPostObj = {
          link: dataArr,
          author: "Mobile User on " + postingStamp,
          category: "Mobile Link",
          title: "Mobile Submission",
          description: "Shared link using Twilio Number"
        }
        // console.log("initial log: " + smsPostObj);
      }
    );
    
    twiml.redirect("/sms/post");
    res.end(twiml.toString());
    // Ends Conversation
  } 
  )

  app.post("/sms/post", function(req, res) {
    // console.log("****Redirect Object: "+ req.body.Body);
    db.resources.create({
      title: "Mobile Submission",
      description: "Shared link via Slack Text",
      category: "Mobile Link",
      link : req.body.Body,
      author : "Mobile User on " + postingStamp

    })
    .then(function(dbPost) {
        res.json(dbPost);
        addAlert()
        console.log("New Text Submission posted to Database. Refresh Page.");
        
      });
  });






}



// http.createServer(app).listen(1337, () => {
//   console.log('Express server listening on port 1337');
// })