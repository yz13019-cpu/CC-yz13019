let pMapper;
let leftQuad;
let middleQuad; 
let rightQuad;

const SURFACE_SIZE = 400;
const BALL_RADIUS = 100;
const MAX_SPEED = 6.2;
const EDGE_SPEED = 1;
const ACCEL_ZONE = 170;
const BALL_COLOR = [255, 105, 205]; 
const BALL_CORE_COLOR = [255, 190, 235];
const STEP_EPSILON = 0.01;

const ball = {face: "top", x: 200, y: 200, dx: 0.91, dy: 0.42};
const faceColors = {left: [16, 20, 38], top: [28, 18, 34], right: [15, 30, 34]};

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pMapper = createProjectionMapper(this);
  leftQuad = pMapper.createQuadMap(SURFACE_SIZE, SURFACE_SIZE, 2, 2);
  middleQuad = pMapper.createQuadMap(SURFACE_SIZE, SURFACE_SIZE, 2, 2);
  rightQuad = pMapper.createQuadMap(SURFACE_SIZE, SURFACE_SIZE, 2, 2);
  normalizeDirection();
}

function draw() {
  background(0);
  moveBall();

  leftQuad.displaySketch((pg) => drawFace(pg, "left"));
  middleQuad.displaySketch((pg) => drawFace(pg, "top"));
  rightQuad.displaySketch((pg) => drawFace(pg, "right"));
}

function moveBall() {
  const distanceToEdge = Math.min(ball.x, SURFACE_SIZE - ball.x, ball.y, SURFACE_SIZE - ball.y);
  const t = constrain(distanceToEdge / ACCEL_ZONE, 0, 1);
  const eased = t * t * (3 - 2 * t);
  const speed = EDGE_SPEED + (MAX_SPEED - EDGE_SPEED) * eased;
  const stepX = ball.dx * speed;
  const stepY = ball.dy * speed;
  ball.x += stepX;
  ball.y += stepY;
  let crossed = false;

  if (ball.face === "left" && ball.y < 0) {
    const oldX = ball.x;
    ball.face = "top";
    ball.x = -ball.y;
    ball.y = oldX;
    [ball.dx, ball.dy] = [-ball.dy, ball.dx];
    crossed = true;
  } else if (ball.face === "left" && ball.x > SURFACE_SIZE) {
    ball.face = "right";
    ball.x -= SURFACE_SIZE;
    crossed = true;
  } else if (ball.face === "right" && ball.x < 0) {
    ball.face = "left";
    ball.x += SURFACE_SIZE;
    crossed = true;
  } else if (ball.face === "right" && ball.y < 0) {
    ball.face = "top";
    ball.y += SURFACE_SIZE; 
    crossed = true;
  } else if (ball.face === "top" && ball.y > SURFACE_SIZE) {
    ball.face = "right";
    ball.y -= SURFACE_SIZE; 
    crossed = true;
  } else if (ball.face === "top" && ball.x < 0) {
    const oldX = ball.x;
    const oldY = ball.y;
    ball.face = "left";
    ball.x = oldY;   
    ball.y = -oldX;
    [ball.dx, ball.dy] = [ball.dy, -ball.dx];
    crossed = true;
  }

  if (!crossed) {
    if (ball.face === "left") {
      if (ball.x < 0) {
        ball.x = -ball.x + STEP_EPSILON;
        ball.dx = Math.abs(ball.dx);
      }
      if (ball.y > SURFACE_SIZE) {
        ball.y = 2 * SURFACE_SIZE - ball.y - STEP_EPSILON;
        ball.dy = -Math.abs(ball.dy);
      }
    } else if (ball.face === "right") {
      if (ball.x > SURFACE_SIZE) {
        ball.x = 2 * SURFACE_SIZE - ball.x - STEP_EPSILON;
        ball.dx = -Math.abs(ball.dx);
      }
      if (ball.y > SURFACE_SIZE) {
        ball.y = 2 * SURFACE_SIZE - ball.y - STEP_EPSILON;
        ball.dy = -Math.abs(ball.dy);
      }
    } else { 
      if (ball.x > SURFACE_SIZE) {
        ball.x = 2 * SURFACE_SIZE - ball.x - STEP_EPSILON;
        ball.dx = -Math.abs(ball.dx);
      }
      if (ball.y < 0) {
        ball.y = -ball.y + STEP_EPSILON;
        ball.dy = Math.abs(ball.dy);
      }
    }
  }
  normalizeDirection();
}

function normalizeDirection() {
  const magnitude = Math.hypot(ball.dx, ball.dy) || 1;
  ball.dx /= magnitude;
  ball.dy /= magnitude;
}

function drawFace(pg, faceName) {
  pg.background(...faceColors[faceName]);

  if (ball.face === faceName) {
    drawSoftBall(pg, ball.x, ball.y);
  }

  if (ball.face === "left" && faceName === "top" && ball.y < BALL_RADIUS * 1.5) {
    drawSoftBall(pg, -ball.y, ball.x);
  } else if (ball.face === "top" && faceName === "left" && ball.x < BALL_RADIUS * 1.5) {
    drawSoftBall(pg, ball.y, -ball.x);
  } else if (ball.face === "left" && faceName === "right" && ball.x > SURFACE_SIZE - BALL_RADIUS * 1.5) {
    drawSoftBall(pg, ball.x - SURFACE_SIZE, ball.y);
  } else if (ball.face === "right" && faceName === "left" && ball.x < BALL_RADIUS * 1.5) {
    drawSoftBall(pg, SURFACE_SIZE + ball.x, ball.y);
  } else if (ball.face === "right" && faceName === "top" && ball.y < BALL_RADIUS * 1.5) {
    drawSoftBall(pg, ball.x, SURFACE_SIZE + ball.y);
  } else if (ball.face === "top" && faceName === "right" && ball.y > SURFACE_SIZE - BALL_RADIUS * 1.5) {
    drawSoftBall(pg, ball.x, ball.y - SURFACE_SIZE);
  }
}

function drawSoftBall(pg, x, y) {
  pg.push();
  pg.noStroke();

  for (let layer = 18; layer >= 1; layer--) {
    const fraction = layer / 18;
    const diameter = BALL_RADIUS * 2 * fraction;
    const alpha = 3 + (1 - fraction) * 22;
    pg.fill(...BALL_COLOR, alpha);
    pg.circle(x, y, diameter);
  }

  pg.fill(...BALL_CORE_COLOR);
  pg.circle(x, y, BALL_RADIUS * 0.72);
  pg.pop();
}

function keyPressed() {
  switch (key.toLowerCase()) {
    case "c":
      pMapper.toggleCalibration();
      break;
    case "f": {
      const isFullscreen = fullscreen();
      fullscreen(!isFullscreen);
      break;
    }
    case "l":
      pMapper.load("map.json");
      break;
    case "s":
      pMapper.save("map.json");
      break;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
