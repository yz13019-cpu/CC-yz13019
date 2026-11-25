let data;
let altitude = [];
let counts = [];
let binSize = 5;
let numberOfBins = 16;
let selectedData;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  selectedData = select("#selected-data");
  data = await loadJSON("assets/fireballs.json");

  let altitudeColumn = 0;
  for (let i = 0; i < data.fields.length; i++) {
    if (data.fields[i] == "alt") {
      altitudeColumn = i;
    }
  }

  for (let i = 0; i < data.data.length; i++) {
    altitude[i] = Number(data.data[i][altitudeColumn]);
  }

  for (let i = 0; i < numberOfBins; i++) {
    counts[i] = 0;
  }

  for (let i = 0; i < altitude.length; i++) {
    for (let j = 0; j < numberOfBins; j++) {
      let lowerAltitude = j * binSize;
      let upperAltitude = lowerAltitude + binSize;

      if (altitude[i] >= lowerAltitude && altitude[i] < upperAltitude) {
        counts[j] = counts[j] + 1;
      }
    }
  }

}

function draw() {
  background(13, 81, 120);

  let centerX = width / 2;
  let centerY = height / 2;
  let outerRadius = min(width, height) * 0.38;
  let innerRadius = outerRadius * 0.2;
  let ringSpacing = (outerRadius - innerRadius) / (numberOfBins - 1);
  let mouseDistance = dist(mouseX, mouseY, centerX, centerY);
  let selectedBin = -1;

  for (let i = 0; i < counts.length; i++) {
    let radius = map(i, 0, numberOfBins - 1, innerRadius, outerRadius);

    if (mouseDistance >= radius - ringSpacing / 2 && mouseDistance < radius + ringSpacing / 2) {
      selectedBin = i;
    }

    noFill();
    stroke(110, 180, 160, 100);
    strokeWeight(1);
    if (selectedBin == i) {
      stroke(255);
      strokeWeight(2);
    }
    ellipse(centerX, centerY, radius * 2, radius * 2);

    noStroke();
    fill(255, 98, 0);
    for (let j = 0; j < counts[i]; j++) {
      let angle = j / counts[i] * 360;
      let x = centerX + radius * sin(angle);
      let y = centerY + radius * cos(angle);
      ellipse(x, y, 4, 4);
    }
  }

  fill(110, 180, 160);
  ellipse(centerX, centerY, 44, 44);
  fill(255);

  if (selectedBin >= 0) {
    let lowerAltitude = selectedBin * binSize;
    let upperAltitude = lowerAltitude + binSize;

    selectedData.html(lowerAltitude + "-" + upperAltitude + " km | " + counts[selectedBin] + " records");
  } else {
    selectedData.html("");
  }
}
