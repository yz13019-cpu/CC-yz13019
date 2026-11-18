let sounds = [];
let pictures = [];

let keys = ['q', 'w', 'e', 'a', 's', 'd'];
let files = ['head', 'left-arm', 'right-arm', 'belly', 'left-leg', 'right-leg'];
let held = [false, false, false, false, false, false];
let rates = [1, 1, 1, 1, 1, 1];
let lengths = [1, 1, 1, 1, 1, 1];

let cropX = [374, 230, 228, 62, 132, 98];
let cropY = [62, 73, 63, 91, 209, 103];
let cropWidths = [770, 586, 512, 895, 733, 788];
let cropHeights = [898, 1415, 1432, 1354, 1144, 1360];

let widths = [140, 70, 70, 220, 80, 80];
let heights = [145, 210, 210, 270, 150, 150];
let offsets = [0, -105, 105, 0, -50, 50];
let order = [4, 5, 1, 2, 3, 0];

let beat;
let analysis;
let amplitude = 0;
let ready = false;
let playing = false;
let drumEnabled = true;
let rate = 1;

async function setup() {
  createCanvas(600, 800);

  for (let i = 0; i < keys.length; i++) {
    pictures[i] = await loadImage('assets/' + files[i] + '.png');
    sounds[i] = await loadSound('assets/nailong-0' + (i + 1) + '.mp3?v=2');
  }

  beat = await loadSound('assets/beat.wav');
  beat.amp(0.25);

  analysis = new p5.Amplitude();
  analysis.smooth(0.8);
  for (let i = 0; i < sounds.length; i++) {
    sounds[i].connect(analysis);
  }
  beat.connect(analysis);

  ready = true;
}

function draw() {
  clear();

  if (ready === false) {
    return;
  }

  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY < height) {
    rate = map(mouseX, 0, width, 0.5, 1.5, true);

    for (let i = 0; i < sounds.length; i++) {
      if (sounds[i].isPlaying()) {
        rates[i] = rate;
        lengths[i] = map(rate, 0.5, 1.5, 0.7, 1.3);
      }
    }
  }

  for (let i = 0; i < sounds.length; i++) {
    sounds[i].rate(rates[i]);
  }

  amplitude = analysis.getLevel();
  let bodyScale = map(amplitude, 0, 0.25, 1, 1.12, true);
  let centerX = width / 2;
  let centerY = height / 2;
  let bodyBottom = centerY + 105;
  let legTop = centerY + 75;

  push();
  translate(centerX, centerY);
  scale(bodyScale);
  translate(-centerX, -centerY);

  let tops = [];
  tops[0] = bodyBottom - 185 * lengths[3];
  tops[1] = bodyBottom - 200 * lengths[3];
  tops[2] = bodyBottom - 200 * lengths[3];
  tops[3] = bodyBottom;
  tops[4] = legTop;
  tops[5] = legTop;

  for (let i = 0; i < order.length; i++) {
    let part = order[i];
    let partWidth = widths[part] / lengths[part];
    let partHeight = heights[part] * lengths[part];
    let x = centerX + offsets[part] / lengths[3] - partWidth / 2;
    let y = tops[part];

    if (part === 0 || part === 3) {
      y = tops[part] - partHeight;
    }

    image(
      pictures[part],
      x, y, partWidth, partHeight,
      cropX[part], cropY[part], cropWidths[part], cropHeights[part]
    );
  }

  pop();
}

function playSample(index) {
  getAudioContext().resume();

  if (playing === false) {
    playing = true;
    changeBeat();
  }

  sounds[index].stop();
  rates[index] = rate;
  lengths[index] = map(rate, 0.5, 1.5, 0.7, 1.3);
  sounds[index].rate(rate);
  sounds[index].amp(0.28);
  sounds[index].loop(true);
  sounds[index].play();
}

async function toggleSound() {
  await getAudioContext().resume();

  if (playing === true) {
    playing = false;
    stopSamples();
  } else {
    playing = true;
  }

  changeBeat();
}

function changeBeat() {
  beat.stop();

  if (playing === true && drumEnabled === true) {
    beat.loop(true);
    beat.play();
  }
}

function keyPressed(event) {
  if (ready === false) {
    return;
  }

  if (event.repeat === true) {
    return;
  }

  let pressedKey = event.key.toLowerCase();

  if (pressedKey === ' ') {
    toggleSound();
    return false;
  }

  if (pressedKey === 'b') {
    if (drumEnabled === true) {
      drumEnabled = false;
    } else {
      drumEnabled = true;
    }

    changeBeat();
    return false;
  }

  let index = -1;
  for (let i = 0; i < keys.length; i++) {
    if (pressedKey === keys[i]) {
      index = i;
      break;
    }
  }

  if (index === -1) {
    return;
  }

  if (held[index] === true) {
    return;
  }

  held[index] = true;
  playSample(index);
  return false;
}

function keyReleased(event) {
  if (ready === false) {
    return;
  }

  let releasedKey = event.key.toLowerCase();
  let index = -1;

  for (let i = 0; i < keys.length; i++) {
    if (releasedKey === keys[i]) {
      index = i;
      break;
    }
  }

  if (index >= 0) {
    held[index] = false;
    sounds[index].stop();
  }
}

function stopSamples() {
  for (let i = 0; i < sounds.length; i++) {
    sounds[i].stop();
    held[i] = false;
  }
}

