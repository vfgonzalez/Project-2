var db = require("../models");

var sequelize = require('sequelize');

const http = require('http');
const express = require('express');
const bodyParser = require("body-parser")
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const app = express();
const session = require('express-session');
const moment = require("moment")
require('dotenv').config()

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))

const accountSid = process.env.TWILIO_ACCOUNT_SID_LIVE;
const authToken = process.env.TWILIO_AUTH_TOKEN_LIVE;
const client = require('twilio')(accountSid, authToken);



var timestamp = moment().format("ddd, DD MMM YYYY HH:mm ZZ")
var postingStamp = moment().format("ddd, MMM Do YYYY hh:mm")


var dataArr = []
var smsPostObj = {}

async function smsPost() {
  app.post("/api/posts", function(req, res) {
    console.log(req.body);
    db.resources.create({
      title: "Mobile input",
      description: "This is a Mobile contribution",
      category: "Mobile Link",
      link : dataArr,
      author : "Mobile User on " + postingStamp

    })
      .wait(function(dbPost) {
        res.json(dbPost);
        console.log("post route on TWILIO")
      
      });
  });
}
module.exports = function (app) {
  app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();
    // ===initial message, auto reply
    twiml.message('Welcome to Slack overflow! Thanks for sharing your link! Visit us at www.google.com');
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
          title: "Mobile Submission"
        }
        console.log(smsPostObj);
     
        






      }

    ).wait(function smsPost() {
      app.post("/api/posts", function(req, res) {
        console.log(req.body);
        db.resources.create({
          title: "Mobile input",
          description: "This is a Mobile contribution",
          category: "Mobile Link",
          link : dataArr,
          author : "Mobile User on " + postingStamp
    
        })
          .wait(function(dbPost) {
            res.json(dbPost);
            console.log("post route on TWILIO")
          
          });
      });
    })

    // Ends Conversation
    res.end(twiml.toString());

    // function smsPost(smsPostObj) {
    //   $.ajax({
    //     method: "POST",
    //     url: "/api/posts",
    //     data: smsPostObj
    //   })
    //     .then(function () {
    //       console.log("SMSPOST route run");

    //     });
    // }

  });
}
// http.createServer(app).listen(1337, () => {
//   console.log('Express server listening on port 1337');
// });