// this is a very simple sketch that demonstrates how to place a video cam image into a canvas 
// this is built of the sample code from sketch3 of the week7-posenet in class examples

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

// image from https://www.flaticon.com/free-icon/clown_743420?term=clown&page=1&position=13&page=1&position=13&related_id=743420&origin=search 
img = loadImage('images/clown.png')   
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

//tracks the distance between the nose and the left eye to messure distance
 //Code from 'The Coding Train' https://www.youtube.com/watch?v=EA3-k9mnLHs&ab_channel=TheCodingTrain  
let d = dist(noseX, noseY, eyelX, eyelY);
if(pose){

    //using distance for the diameter of the image to scale it 
    image(img, noseX-100, noseY-100, d*4, d*4);
}    
    
}