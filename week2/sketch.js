let xPos;
let yPos;
let randomX;
let R;
let currentVariation;

let circleCount;
let c1;
let c2;

function setup() {
    createCanvas(800, 800);
    background('#69AD6A');
    xPos = width/2;
    yPos = height/2;
    console.log("xPos: " + xPos + " , yPos: " + yPos);

    R = 300/sqrt(2)/2;
    currentVariation = 0;
    circleCount = 0;
}

function draw() {
    background('#69AD6A');
    rectMode(CENTER);
    noStroke();

    if (currentVariation == 0) {
        variation0();
    } else if (currentVariation == 1) {
        variation1();
    } else if (currentVariation == 2) {
        variation2();
    } else if (currentVariation == 3) {
        variation3();
    } else if (currentVariation == 4) {
        variation4();
    } else if (currentVariation == 5) {
        variation5();
    } else if (currentVariation == 6) {
        variation6();
    }
}

function mousePressed() {
    if (currentVariation < 2) {
        currentVariation++;
    } else if (currentVariation == 2) {
        circleCount ++;

        if (circleCount == 1) {
            c1 = random(150, width - 150);
        }

        if (circleCount == 2) {
            c2 = random(150, width - 150);
        }

        if (circleCount == 3) {
            currentVariation++;
        }
    } else if (currentVariation < 6) {
        currentVariation++;
    }  
}

function variation0() {
    push();
    fill('#000000');
    ellipse(xPos, yPos, 300);
    pop();

    push();
    fill('#ffffff');
    square(xPos, yPos, 300/sqrt(2));
    pop();

    push();
    fill('#000000');
    ellipse(xPos, yPos, 300/sqrt(2));
    pop();

    push();
    fill('#F697CD');
    triangle(xPos, yPos - R, 
        xPos + R * cos(radians(30)), 
        yPos + R * sin(radians(30)), 
        xPos - R * cos(radians(30)), 
        yPos + R * sin(radians(30)));
    pop();
}

function variation1() {
    push();
    fill('#000000');
    ellipse(xPos, yPos, 300);
    pop();

    push();
    fill('#ffffff');
    translate(xPos, yPos);
    rotate(PI/4);
    square(0, 0, 300/sqrt(2));
    pop();

    push();
    fill('#000000');
    ellipse(xPos, yPos, 300/sqrt(2));
    pop();

    push();
    fill('#F697CD');
    translate(xPos, yPos);
    rotate(PI);
    triangle(0, 0 - R, 
        0 + R * cos(radians(30)), 
        0 + R * sin(radians(30)), 
        0 - R * cos(radians(30)), 
        0 + R * sin(radians(30)));
    pop();
}

function variation2() {
    push();
    fill('#000000');
    ellipse(xPos, yPos, 300/sqrt(2));
    pop();

    push();
    fill('#F697CD');
    translate(xPos, yPos);
    rotate(PI);
    triangle(0, 0 - R, 
        0 + R * cos(radians(30)), 
        0 + R * sin(radians(30)), 
        0 - R * cos(radians(30)), 
        0 + R * sin(radians(30)));
    pop();

    if (circleCount >= 1) {
        push();
        fill('#000000');
        ellipse(c1, c1, 300);
        pop();
        
        push();
        fill('#ffffff');
        square(c1, height - c1, 300/sqrt(2));
        pop();
    }

    if (circleCount >= 2) {
        push();
        fill('#000000');
        ellipse(c2, c2, 300);
        pop();

        push();
        fill('#ffffff');
        square(c2, height - c2, 300/sqrt(2));
        pop();

    }

}

function variation3() {
    push();
    translate(xPos, yPos);
    scale(3);
    fill('#000000');
    ellipse(0, 0, 300);
    pop();

    push();
    fill('#ffffff');
    translate(xPos, yPos);
    rotate(PI/4);
    square(0, 0, 300/sqrt(2));
    pop();

    push();
    fill('#000000');
    ellipse(xPos, yPos, 300/sqrt(2));
    pop();

    push();
    fill('#F697CD');
    translate(xPos, yPos);
    rotate(PI);
    triangle(0, 0 - R, 
        0 + R * cos(radians(30)), 
        0 + R * sin(radians(30)), 
        0 - R * cos(radians(30)), 
        0 + R * sin(radians(30)));
    pop();
}

function variation4() {
    push();
    fill('#000000');
    ellipse(xPos, yPos, 300);
    pop();

    push();
    translate(xPos, yPos);
    scale(3);
    fill('#ffffff');
    rotate(PI/4);
    square(0, 0, 300/sqrt(2));
    pop();

    push();
    fill('#000000');
    ellipse(xPos, yPos, 300/sqrt(2));
    pop();

    push();
    fill('#F697CD');
    translate(xPos, yPos);
    rotate(PI);
    triangle(0, 0 - R, 
        0 + R * cos(radians(30)), 
        0 + R * sin(radians(30)), 
        0 - R * cos(radians(30)), 
        0 + R * sin(radians(30)));
    pop();
}

function variation5() {
    push();
    fill('#000000');
    ellipse(xPos - 200, yPos, 300);
    pop();

    push();
    fill('#ffffff');
    translate(xPos - 20, yPos);
    rotate(PI/4);
    square(0, 0, 300/sqrt(2));
    pop();

    push();
    fill('#000000');
    ellipse(xPos + 150, yPos, 300/sqrt(2));
    pop();

    push();
    fill('#F697CD');
    translate(xPos + 250, yPos);
    rotate(PI/6);
    triangle(0, 0 - R, 
        0 + R * cos(radians(30)), 
        0 + R * sin(radians(30)), 
        0 - R * cos(radians(30)), 
        0 + R * sin(radians(30)));
    pop();
}

function variation6() {
    push();
    fill('#000000');
    ellipse(xPos - 200, yPos, 300);
    pop();

    push();
    fill('#ffffff');
    translate(xPos - 20, yPos);
    rotate(PI/4);
    square(0, 0, 300/sqrt(2));
    pop();

    push();
    fill('#000000');
    ellipse(xPos + 150, yPos, 300/sqrt(2));
    pop();

    push();
    fill('#F697CD');
    translate(xPos + 150, yPos);
    rotate(PI/6);
    scale(3);
    triangle(0, 0 - R, 
        0 + R * cos(radians(30)), 
        0 + R * sin(radians(30)), 
        0 - R * cos(radians(30)), 
        0 + R * sin(radians(30)));
    pop();
}

