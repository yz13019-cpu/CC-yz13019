// let sqSize, sqX, sqY;
// let circleXpos;
// let xDir;

// let rot = 0.0;

let x= 0;
let y = 0;
let incX = 0.01;
let incY = 0.025;

function setup() {
    createCanvas(800, 800);
    // sqX = width/2;
    // sqY = width/2;
    // sqSize = 100;
    // rectMode(CENTER);
    // strokeWeight(2);
    // circleXpos = width/2;
    // // xDir = width;

    // noStroke(); 
    colorMode(HSB);

    stroke(2);
    noFill();
}

function draw() {
    background(220);
    // if (mouseX < width/2) {
    //     fill(0);
    //     console. log ("mouse is on the left")
    // } else {
    //     fill(255);
    // }

    // if (mouseY < 200) {
    //     noStroke();
    // } else if (mouseY >= 200 && mouseY < 400) {
    //     stroke(127);
    //     strokeWeight(2);
    // } else {
    //     stroke (127);
    //     strokeWeight (20);
    // }

    // rect(sqX, sqY, sqSize);
    
    // noStroke();
    // fill(200, 200, 10);
    // ellipse(circleXpos, height/2, 200);
    // circleXpos += xDir;

    // if (circleXpos >= width || circleXpos <= 0) {
    //     xDir *= -1;
    // }

    // for (thing to check, what to check againt, what to do when you are done with a loop)
    // for (let i = 0; i < 50 ; i ++) {
    //     // console. log(i);
    //     // ellipse(i * 100 + 50, 100, i * 10 + 2);
    //     noFill();
    //     // stroke(value);
    //     ellipse(width/2, height/2, i * 10 + 2);
    // }

    // for (let i = 0; i < 50 ; i ++) {
    //     ellipse (mouseX, mouseY, i * 10 + 2);
    // }
    // noLoop(); 

    // rect(CENTER);
    // for (let x = 0; x < 10; x ++) {
    //     for (let y = 0; y < 7; y ++) {
    //         fill(360* (x*y/70), 100, 100);
    //         push();
    //         translate(x*75 + 25 , y *75 +25, 50);
    //         scale(frameCount%1000/50);
    //         rotate(rot);
    //         rect(0,0,50, 50);
    //         pop();
    //         rot += 0.2;
    //     }
    // }
    // let modded = frameCount % 10;
    // rot = 0.0;
    // console.log("raw frameCount:" + frameCount, "mod frame: " + modded);
    // if (frameCount% 100 ==0) {
    //     noLoop();
    // }
    // // noLoop();

    let xPos = ((sin(x) + 1)/2)* width;
    let yPos = ((cos(x) + 1)/2)* width;
    fill(225);
    noStroke();
    ellipse(xPos, yPos, 50);

    if(frameCount%20)

    // point(xPos, width/2);

    x += incX;
    y += incY;

}


