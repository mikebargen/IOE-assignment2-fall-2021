// this is a very simple sketch that demonstrates how to place a video cam image into a canvas
// this is built of the sample code from sketch9 of the week7-posenet in class examples 

let video;
let pose;
let img;  //adding image in
let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;
let eyerX = 0;
let eyerY = 0;

function setup(){
createCanvas(640, 480);
video = createCapture(VIDEO);
video.hide();
poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses) 

// image from https://www.flaticon.com/free-icon/basketball_1041168?term=basketball&page=1&position=66&page=1&position=66&related_id=1041168&origin=search 
img = loadImage('images/basketball.png')   
}

function modelLoaded(){
    console.log("modelLoaded function has been called so this work!!!!");
};

function gotPoses(poses){
   // console.log(poses);
    if( poses.length >0 ){
        pose = poses[0].pose;
       let nX = poses[0].pose.keypoints[0].position.x;
       let nY = poses[0].pose.keypoints[0].position.y;
       let elX = poses[0].pose.keypoints[1].position.x;
       let elY = poses[0].pose.keypoints[1].position.y;
       let erX = poses[0].pose.keypoints[2].position.x;
       let erY = poses[0].pose.keypoints[2].position.y;

       // using lerp allowed the keypoints to be tracked more smoothly
       //Code from 'The Coding Train' https://www.youtube.com/watch?v=EA3-k9mnLHs&ab_channel=TheCodingTrain  
       noseX = lerp(noseX, nX, 0.5);
       noseY = lerp(noseY, nY, 0.5);
       eyelX = lerp(eyelX, elX, 0.5);
       eyelY = lerp(eyelY, elY, 0.5);
       eyerX = lerp(eyerX, erX, 0.5);
       eyerY = lerp(eyerY, erY, 0.5);
    } 
    
} 

function draw(){
image(video, 0, 0);
let d = dist(noseX, noseY, eyelX, eyelY, eyerX, eyerY);
if(pose){

    // using distance as the size of the ball allows the ball to scale up and down based on the position of my head. The distance between my eyes and nose are being tracked to calculate this distance
    image(img, noseX-100, noseY-100, d-100, d-100);
}    


    
}