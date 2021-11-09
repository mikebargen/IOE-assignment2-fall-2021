// This base code is sourced from https://editor.p5js.org/AndreasRef/sketches/r1_w73FhQ
// The main function of this code is to draw a line from a keypoint 

let video;
let poseNet; 
let poses = [];
let skeletons = [];
let img;  //adding pencil image in
let img2;  //adding eraser image in
let pg;
let rightWristX;
let rightWristY;
let pRightWristX;
let pRightWristY;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  pixelDensity(1);
  pg = createGraphics(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);

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

function draw() {

  image(video, 0, 0, width, height);
  strokeWeight(2);



  // For one pose only (use a for loop for multiple poses!)
  if (poses.length > 0) {
    const pose = poses[0].pose;
      console.log(pose);

  image(video, 0, 0, width, height);

  image(pg, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  //drawSkeleton();


  // displays image of penci on left wrist. The x and y value are both adjusted to postion the pencil in the hand rather than the wrist
  const leftWrist = pose.leftWrist;
    image(img, leftWrist.x-100, leftWrist.y-175, 100, 100);


    // displays image of eraser on right wrist. The y value is negative to bring it higher making it look like its in the hand rather than on the wrist
    const rightWrist = pose.rightWrist 
    image(img2, rightWrist.x, rightWrist.y-175, 100, 100);
}
}

// This code draws a line from a specified keypoint. The coude is from https://editor.p5js.org/AndreasRef/sketches/r1_w73FhQ 
// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < min(poses.length, 1); i++) {
    // For each pose detected, loop through all the keypoints
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = poses[i].pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        if (j == 9) {
          rightWristX = keypoint.position.x;
          rightWristY = keypoint.position.y;

          pg.stroke(30, 30, 650);
          pg.strokeWeight(5);
          pg.line(rightWristX-100, rightWristY-90, pRightWristX-100, pRightWristY-90);

          pRightWristX = rightWristX;
          pRightWristY = rightWristY;
        }
      }
    }
  }
}






// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 10; i < poses.length; i++) {
    // For every skeleton, loop through all body connections
    for (let j = 0; j < poses[i].skeleton.length; j++) {
      let partA = poses[i].skeleton[j][10];
      let partB = poses[i].skeleton[j][1];
      stroke(5, 170, 170);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

// The callback that gets called every time there's an update from the model
function gotPoses(results) {
  poses = results;
}

function keyPressed() {
  pg.clear();
}

function modelReady() {
  select('#status').html('model Loaded');
}