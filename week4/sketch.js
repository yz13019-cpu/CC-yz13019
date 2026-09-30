let seed = 1234;
let doExport = false;

function setup() {
  createCanvas(576, 384);
}

function keyPressed() {
  if (key == "r") {
    seed = floor(random(13001));
  }

  if (key == "s") {
    doExport = true;
  }
}

function mousePressed() {
  seed = floor(random(13001));
}

function drawBasicForm(x, y, rot) {
  push();
  translate(x, y);
  rotate(rot);
  quad(-50, 50, 50, -50, -50, -50, 50, 50);
  pop();
}

function draw() {
  if (doExport) {
    beginRecordSvg("myPlot" + seed + ".svg");
  }

  background(255);
  noFill();
  noiseSeed(seed);
  randomSeed(seed);

  let noiseVal = random();
  let inc = 0.01;

  for (let y = 30; y < height; y += 60) {
    for (let x = 30; x < width; x += 60) { {
      let rot = map(noise(noiseVal), 0, 1, -1, 1);
      let scaleValue = map(noise(noiseVal + 100), 0, 1, 0.1, 1.0);
      drawBasicForm(x, y, rot);
      noiseVal += inc;
    }
  }
}
  if (doExport) {
    endRecordSvg();
    doExport = false;
  }

}