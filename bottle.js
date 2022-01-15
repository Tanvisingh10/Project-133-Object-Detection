img = "";
objects = [];
function preload(){
    img = loadImage('bottle.jpg');
}

function back(){ 
    window.location = "index.html";
}
function setup(){
    canvas = createCanvas(370,300);
    canvas.position(300,150);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting object";
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        objects = results;
    }
}
function draw(){
    image(img, 0,0, 380, 380);
    if(status != ""){
        objectDetector.detect(img, gotResult);
        for(i = 0; i< objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill('#1800FF');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 10, objects[i].y + 15);
            noFill();
            stroke('#1800FF');           
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }}}