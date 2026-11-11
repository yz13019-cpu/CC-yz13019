let capture;
let disp;
let selectedRegion = "all";

const brightnessThreshold = 110;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  disp = createGraphics(640, 480);
  disp.noStroke();

  capture = await createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();
}

function draw() {
  capture.loadPixels();
  disp.background(255);

  const stepSize = 20;

  for (let y = 0; y < capture.height; y += stepSize) {
    for (let x = 0; x < capture.width; x += stepSize) {
      const i = (y * capture.width + x) * 4;
      const r = capture.pixels[i];
      const g = capture.pixels[i + 1];
      const b = capture.pixels[i + 2];
      const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

      let showCell = true;

      if (selectedRegion === "bright") {
        showCell = brightness >= brightnessThreshold;
      } else if (selectedRegion === "dark") {
        showCell = brightness < brightnessThreshold;
      }

      if (showCell) {
        disp.fill(r, g, b);
        disp.rect(x, y, stepSize, stepSize);
      }
    }
  }

  image(disp, 0, 0, width, height);
}

function mousePressed() {
  if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    const x = floor(map(mouseX, 0, width, 0, capture.width));
    const y = floor(map(mouseY, 0, height, 0, capture.height));
    const pickedColor = capture.get(x, y);
    const brightness = 0.299 * pickedColor[0]
      + 0.587 * pickedColor[1]
      + 0.114 * pickedColor[2];

    if (brightness >= brightnessThreshold) {
      selectedRegion = "bright";
    } else {
      selectedRegion = "dark";
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
