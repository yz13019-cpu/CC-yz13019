let video;
let videoReady = false;
let handPose;
let hands = [];
let picture;
let pinchAudio;
let audioPlaying = false;
let circleX;
let circleY;
let circleSize = 0;
let circleAngle = 0;
let displayScale = 1;
let displayX = 0;
let displayY = 0;

async function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  pixelDensity(1);
  noStroke();
  circleX = width / 2;
  circleY = height / 2;

  pinchAudio = createAudio("nailong.mp3");
  pinchAudio.volume(0.4);

  picture = await loadImage("picture.png");
  let side = min(picture.width, picture.height);
  picture = picture.get((picture.width - side) / 2, (picture.height - side) / 2, side, side);

  video = createCapture(VIDEO, videoLoaded);
  video.hide();
  handPose = await ml5.handPose({ maxHands: 2 });
  handPose.detectStart(video, gotHands);
}

function draw() {
  background(220);
  if (videoReady === false) {
    if (audioPlaying === true) {
      pinchAudio.stop();
      audioPlaying = false;
    }
    return;
  }
  let videoWidth = video.width;
  let videoHeight = video.height;
  displayScale = min(width / videoWidth, height / videoHeight);
  let displayWidth = videoWidth * displayScale;
  let displayHeight = videoHeight * displayScale;
  displayX = (width - displayWidth) / 2;
  displayY = (height - displayHeight) / 2;

  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, displayX, displayY, displayWidth, displayHeight);
  pop();

  updateCircleFromHands();

  if (circleSize <= 0) {
    return;
  }
  push();
  beginClip();
  circle(circleX, circleY, circleSize);
  endClip();
  translate(circleX, circleY);
  rotate(circleAngle);
  image(picture, -circleSize / 2, -circleSize / 2, circleSize, circleSize);
  pop();
}

function updateCircleFromHands() {
  let pinching = false;
  let cameraScale = 640 / video.width;
  for (let i = 0; i < hands.length; i++) {
    let finger = hands[i].index_finger_tip;
    let thumb = hands[i].thumb_tip;
    if (dist(finger.x, finger.y, thumb.x, thumb.y) * cameraScale < 30) {
      pinching = true;
    }
  }

  if (pinching === true) {
    if (audioPlaying === false) {
      pinchAudio.loop();
      audioPlaying = true;
    }
  } else {
    if (audioPlaying === true) {
      pinchAudio.stop();
      audioPlaying = false;
    }
  }

  if (hands.length === 2 && pinching === false) {
    let first = getPalm(hands[0]);
    let second = getPalm(hands[1]);
    let x1 = (video.width - first.x) * displayScale + displayX;
    let y1 = first.y * displayScale + displayY;
    let x2 = (video.width - second.x) * displayScale + displayX;
    let y2 = second.y * displayScale + displayY;
    circleX = (x1 + x2) / 2;
    circleY = (y1 + y2) / 2;
    circleSize = dist(x1, y1, x2, y2);
    if (circleSize > 35) {
      let change = atan2(y2 - y1, x2 - x1) - circleAngle;
      circleAngle += change;
    }
  }
}

function getPalm(hand) {
  let pointIds = [0, 5, 9, 13, 17];
  let x = 0;
  let y = 0;
  for (let i = 0; i < pointIds.length; i++) {
    let point = hand.keypoints[pointIds[i]];
    x += point.x;
    y += point.y;
  }
  return { x: x / pointIds.length, y: y / pointIds.length };
}

function videoLoaded() {
  videoReady = true;
}

function gotHands(results) {
  hands = results;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
