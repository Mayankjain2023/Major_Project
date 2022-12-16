var express=require("express");
var mongoose = require("mongoose");
var bodyparser=require('body-parser');
var mongoURI=require("./config/database").mongo.url;
require("dotenv").config();
var sgMail= require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//loading aws-sdk and uuid
var AWS = require("aws-sdk");
var uuid = require('uuid');
AWS.config.update({region: 'ap-south-1'});

// // Load the AWS SDK for Node.js
// var AWS = require('aws-sdk');
// // Set the region
// AWS.config.update({region: 'REGION'});

// var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

// var queueURL = "https://sqs.ap-south-1.amazonaws.com/233050499454/bug_tracker_mails_record";

// var params = {
//  AttributeNames: [
//     "SentTimestamp"
//  ],
//  MaxNumberOfMessages: 10,
//  MessageAttributeNames: [
//     "All"
//  ],
//  QueueUrl: queueURL,
//  VisibilityTimeout: 20,
//  WaitTimeSeconds: 0
// };



// sqs.receiveMessage(params, function(err, data) {
//     console.log("data: "+JSON.stringify(data));
//   if (err) {
//     console.log("Receive Error", err);
//     callback(err,'Error fetching messages from SQS');

//   } else if (data.Messages) {
//     // console.log(data.Messages);
//     // console.log(data.Messages[0].MessageAttributes);
//     console.log(data.Messages[0].Body);


//     const msg = {
//         to: data.Messages[0].Body, // Change to your recipient
//         from: 'bugtrackerrr@gmail.com', // Change to your verified sender
//         subject: 'Welcome to BugTracker',
//         text: 'Your account has been created with BugTracker by',
//         html: '<strong>Kindly Login with your credentials</strong>',
//       }
//       sgMail
//         .send(msg)
//         .then(() => {

//           console.log('Email sent')
//           console.log(msg);

//         })
//         .catch((error) => {
//           console.error(error)
//         })



//     console.log("Number of messages from SQS"+data.Messages.length);
//     console.log("Recieved message: "+JSON.stringify(data.Messages[0]));
//     console.log("Message body: "+data.Messages[0].Body);
    
//     // var deleteParams = {
//     //   QueueUrl: queueURL,
//     //   ReceiptHandle: data.Messages[0].ReceiptHandle
//     // };
//     // sqs.deleteMessage(deleteParams, function(err, data) {

//     //   if (err) {
//     //     console.log("Delete Error", err);
//     //   } else {
//     //     console.log("Message Deleted", data);
//     //   }
//     // });
//   }
// });
















// // Create an SQS service object
// var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

// var queueURL = "https://sqs.ap-south-1.amazonaws.com/233050499454/bug_tracker_mails_record";

// var params = {
//  AttributeNames: [
//     "SentTimestamp"
//  ],
//  MaxNumberOfMessages: 10,
//  MessageAttributeNames: [
//     "All"
//  ],
//  QueueUrl: queueURL,
//  VisibilityTimeout: 30,
//  WaitTimeSeconds: 0
// };

// sqs.receiveMessage(params, function(err, data) {
//   if (err) {
//     console.log("Receive Error", err);
//   } else if (data.Messages) {
//     var deleteParams = {
//       QueueUrl: queueURL,
//       ReceiptHandle: data.Messages[0].ReceiptHandle
//     };
//     sqs.deleteMessage(deleteParams, function(err, data) {
//       if (err) {
//         console.log("Delete Error", err);
//       } else {
//         console.log("Message Deleted", data);
//       }
//     });
//   }
// });



// //creating s3 object
// var s3 = new AWS.S3({apiVersion: '2006-03-01'});

// // //listing buckets
// s3.listBuckets(function(err, data) {
//     if (err) {
//       console.log("Error", err);
//     } else {
//       console.log("Success", data.Buckets);
//     }
//   });


  //listing bucket oobje


  //UPLOADING IN S3 Bucket

//   var uploadParams = {Bucket: 'node-sdk-sample-60ef9c2d-d14c-41ef-9ccb-37d93b170f8f', Key: '', Body: ''};
//   var file = 'defaultProfile';
//     var fs = require('fs');
//     var fileStream = fs.createReadStream(file);
//     fileStream.on('error', function(err) {
//     console.log('File Error', err);
//     });
//     uploadParams.Body = fileStream;
//     var path = require('path');
//     uploadParams.Key = path.basename(file);

//     s3.upload (uploadParams, function (err, data) {
//         if (err) {
//           console.log("Error", err);
//         } if (data) {
//           console.log("Upload Success", data.Location);
//         }
//       });


// // Create unique bucket name
// var bucketName = 'node-sdk-sample-' + uuid.v4();
// // Create name for uploaded object key
// var keyName = 'hello_world.txt';

// // Create a promise on S3 service object
// var bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName}).promise();

// // Handle promise fulfilled/rejected states
// bucketPromise.then(
//   function(data) {
//     // Create params for putObject call
//     var objectParams = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
//     // Create object upload promise
//     var uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
//     uploadPromise.then(
//       function(data) {
//         console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
//       });
// }).catch(
//   function(err) {
//     console.error(err, err.stack);
// });


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));


var app=express();
require('./config/passport');
app.use(bodyparser.json());
// app.get("*",function(req,res){
//     res.sendFile(__dirname+'../client/index.html');
// })
app.all('/*',function(req,res,next){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers','Content-type,Accept,X-Access-Token,X-key,Authorization');
    if(req.method=='OPTIONS'){
        res.status(200).end();
    }else{
        next();
    }
});
app.use('/user/',require('./routes/authRoutes.js'));
app.use('/',require('./routes/protectedRoutes.js'));
app.use('/',require('./routes/projectRoute.js'));
app.use('/',require('./routes/profileImage.js'));


app.listen(5500,function(){
    console.log("Server is running on port 5500");
});
