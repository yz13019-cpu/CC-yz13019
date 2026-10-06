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
  quad(-20, 20, 20, -20, -20, -20, 20, 20);
  pop();
}

function draw() {
  if (doExport) {
    beginRecordSvg("myPlot" + seed + ".svg");
  }

  background(255);
  noFill();
  stroke(0);
  noiseSeed(seed);
  randomSeed(seed);

  let noiseScale = 0.015;
  let gridSize = 20;

  for (let y = 20; y < height - 20; y += gridSize) {
    for (let x = 20; x < width - 20; x += gridSize) {
      let n = noise(x * noiseScale, y * noiseScale);
      let threshold = 0.55;

      if (n > threshold) {
        let rot = map(n, 0.55, 1, -0.5, 0.5);
        drawBasicForm(x, y, rot);
      }
    }
  }

  if (doExport) {
    endRecordSvg();
    doExport = false;
  }
}