// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
this is built of the sample code from sketch of the week7-posenet in class examples  
=== */

let video;
let poseNet;
let poses = [];
let img;  //adding pencil image in
let img2;  //adding eraser image in
let leftWristX = 0;
let leftWristY = 0;
let rightWristX = 0;
let rightWristY = 0;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, {outputStride:8, quantBytes:4}, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();

  // image from https://www.flaticon.com/premium-icon/pencil_2280557?term=pencil&page=1&position=2&page=1&position=2&related_id=2280557&origin=search 
  img = loadImage('images/pencil.png');

  // image from https://www.flaticon.com/premium-icon/eraser_3403871?term=eraser&page=1&position=35&page=1&position=35&related_id=3403871&origin=search 
  img2 = loadImage('images/eraser.png');
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function mousePressed(){
  console.log(JSON.stringify(poses))
}


function gotPoses(poses){
  // console.log(poses);
   if( poses.length >0 ){
       pose = poses[0].pose;
      let rX = poses[0].pose.keypoints[0].position.x;
      let rY = poses[0].pose.keypoints[0].position.y;
      let lX = poses[0].pose.keypoints[1].position.x;
      let lY = poses[0].pose.keypoints[1].position.y;


      // using lerp allowed the keypoints to be tracked more smoothly
      //Code from 'The Coding Train' https://www.youtube.com/watch?v=EA3-k9mnLHs&ab_channel=TheCodingTrain  
      rightWristX = lerp(noseX, rX, 0.5);
      rightWristY = lerp(noseY, rY, 0.5);
      leftWristX = lerp(eyelX, lX, 0.5);
      leftWristY = lerp(eyelY, lY, 0.5); 
} 
}

function draw() {
  image(video, 0, 0, width, height);
  strokeWeight(2);

  // For one pose only (use a for loop for multiple poses!)
  if (poses.length > 0) {
    const pose = poses[0].pose;
      console.log(pose);

    // Create a pink ellipse for the nose
    fill(213, 0, 143);
    const nose = pose.nose;
    ellipse(nose.x, nose.y, 20, 20);

    // Create a yellow ellipse for the right eye
    fill(255, 215, 0);
    const rightEye = pose.rightEye;
    ellipse(rightEye.x, rightEye.y, 20, 20);

    // Create a yellow ellipse for the right eye
    fill(255, 215, 0);
    const leftEye = pose.leftEye;
    ellipse(leftEye.x, leftEye.y, 20, 20);
      
    // fill(0,255,0);
    //   const rightShoulder = pose.rightShoulder;
    // ellipse(rightShoulder.x, rightShoulder.y, 20, 20 );  

    const leftWrist = pose.leftWrist;
    image(img, leftWrist.x-100, leftWrist.y-175, 100, 100);

    const rightWrist = pose.rightWrist;
    image(img2, rightWrist.x, rightWrist.y-175, 100, 100);
  }
}