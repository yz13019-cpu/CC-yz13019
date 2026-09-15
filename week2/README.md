# Week 2 — Shape Variations

## Design Intention

My design is to visualize an explosion. The circle, square, and triangle begin as a quiet and contained composition, then gradually release, expand, rotate, and move apart. Each moment of the explosion has its own beauty and meaning. The forms do not simply break apart; each transformation creates the conditions for the next one. 

## Transformation Rules

- **Variation 0:** Basic centered composition with a circle, square, and triangle.
- **Variation 1:** Rotate the square by `PI/4` and the triangle by `PI`.
- **Variation 2:** Use `random()` to place additional circles and squares along opposite diagonals. Each click adds another pair.
- **Variation 3:** Scale the large black circle.
- **Variation 4:** Scale the white square.
- **Variation 5:** Translate the shapes horizontally.
- **Variation 6:** Translate, rotate, and scale the pink triangle.

## Intended vs. Actual Results

The final coded results are similar to my original paper sketches, but the digital versions became more dynamic and extreme. The main difference is that coding allowed me to use `random()` and precise transformations. In Variation 2, the random positioning creates different arrangements each time.

```javascript
//Inclass note
let xPos;
let yPos;
let randomX;

function setup() {
    createCanvas(windowWidth, windowHeight);
    // colorMode(HSB);
    background(100,0,0);
    xPos = width/2;
    yPos = height/2;
    console.log("xPos: " + xPos + " , yPos: " + yPos);
}

function draw() {
    ellipse(200, 200, 50, 75);
    // rectMode(CORNER);
    rectMode(CENTER);
    
    strokeWeight(1);
    // noStroke();
    stroke(0,100,0);
    // stroke('blue');

    fill(0,0,100,50);
    // noFill();

    // ellipse(width/2, height/2, 100);
    background(180,100,100);
    ellipse(xPos, yPos, 100);
    ellipse(xPos + randomX, yPos+30, 100);


    rect(200, 200, 50, 50);
    quad(100, 100, 100, 200, 110, 300, 200, 100);
    point(10,10);
    line(10, 10, 100, 100);

    translate(200, 200);
    // rotate(PI/4);
    angleMode(DEGREES);
    rotate(45);
    rect(100,100,200);

    push();
    rotate(20);
    rect(100,100,200);
    pop();

}

function mousePressed() {
    // xPos = mouseX;
    // yPos = mouseY;

    xPos = random(0, width);
    yPos = random(0,height);
    randomX = random(0,width/2);
    console.log("xPos: " + xPos + " , yPos: " + yPos);
}


```