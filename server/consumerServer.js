var express=require("express");
require("dotenv").config();
var sgMail= require("@sendgrid/mail");
var AWS = require("aws-sdk");
AWS.config.update({region: 'ap-south-1'});
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log(process.env.SENDGRID_API_KEY);
// Load the AWS SDK for Node.js
var app=express();

// Set the region
AWS.config.update({region: 'ap-south-1'});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var queueURL = "https://sqs.ap-south-1.amazonaws.com/233050499454/bug_tracker_mails_record";



var params = {
 AttributeNames: [
    "SentTimestamp"
 ],
 MaxNumberOfMessages: 10,
 MessageAttributeNames: [
    "All"
 ],
 QueueUrl: queueURL,
 VisibilityTimeout: 20,
 WaitTimeSeconds: 20
};

// exports.handler=(event,context,callback)=>{


sqs.receiveMessage(params, function(err, data) {
    console.log("data: "+JSON.stringify(data));
  if (err) {
    console.log("Receive Error", err);
    callback(err,'Error fetching messages from SQS');

  } else if (data.Messages) {

    for(var i=0;i<data.Messages.length;i++){
        console.log(data.Messages[i].Body);


    const msg = {
        to: data.Messages[i].Body, // Change to your recipient
        from: 'bugtrackerrr@gmail.com', // Change to your verified sender
        subject: 'Welcome to BugTracker',
        text: 'Your account has been created with BugTracker',
        html: '<strong>Kindly Login with your credentials</strong>',
      }
      sgMail
        .send(msg)
        .then(() => {

          console.log('Email sent')
          console.log(msg);

        })
        .catch((error) => {
          console.error(error)
        })


    console.log("Number of messages from SQS"+ data.Messages.length);
    console.log("Recieved message: "+JSON.stringify(data.Messages[i]));
    // console.log("Message body: "+data.Messages[0].Body);
    
    var deleteParams = {
      QueueUrl: queueURL,
      ReceiptHandle: data.Messages[i].ReceiptHandle
    };
    sqs.deleteMessage(deleteParams, function(err, data) {

      if (err) {
        console.log("Delete Error", err);
      } else {
        console.log("Message Deleted", data);
      }
    });
    }
    
  }
});


app.listen(5000,function(){
    console.log("Server is running on port 5000");
});