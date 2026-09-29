# Week 4 — Iteration Generation II

## Design Intention
My drawBasicForm() function uses the shape from my previous assignment as the basic visual element. I repeat and overlap this form in a regular grid to create a larger generative pattern. By keeping the positions of the forms organized while allowing their rotation and scale to change, I explore the relationship between order and randomness. Each new seed generates a different arrangement while following the same basic system.

## Transformation Rules
Rotation: Noise is used to control the rotation of each form. The rotation value changes gradually across the grid, creating connected and continuous variation rather than completely independent random changes.

Scale: Noise is also used to control the size of each form. The scale ranges from 0.1 to 1.0, allowing some forms to become much smaller while others remain close to their original size.


```javascript
//Inclass note
let seed = 1234;
let doExport = false;

function setup() {
  createCanvas(567, 384);
}

function keyPressed() {
  if (key == "r") {
    seed = floor((random(13001)));
  }
  if (key == "s") {
    doExport = true;
  }
}

function mousePressed() {
  seed = floor((random(13001)));
}

function drawRectangle(x,y,rot) {
  push();
  translate(x, y);
  rotate(rot);
  rect(0, 0, 40);
  pop();
}

function draw() {
if (doExport) {
    beginRecordSvg("myPlot" + seed + ".svg");
}

  background(220);
  noFill();
  noiseSeed(seed);
  randomSeed(seed);

  let step = 46;
  let inc = .01;
  let noiseVal = random();

  rectMode(CENTER);

  for (let x = step; x < width -step; x += step) {
    for (let y = step; y < height - step; y += step) {
      let rot = TWO_PI * noise(noiseVal);
      drawRectangle(x, y, rot);
      noiseVal += inc;
    }
  }


  if (doExport) {
    endRecordSvg();
    doExport = false;
  }
}
```