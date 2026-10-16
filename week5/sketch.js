const COLORS = {
    background: "#09527F",
    second: "#F35808",
    minute: "#F35808",
    minuteHighlight: "#F35808",
    hour: "#7EE5B6",
    ellipseLine: "#F35808"
};

const SETTINGS = {
    count: 60,
    clockScale: 0.8,
    spacing: 7,
    ellipseWidth: 280,
    ellipseHeight: 14,
    rotationSpeed: 0.0008
};

let ellipses = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(RADIANS);

    for (let i = 0; i < SETTINGS.count; i++) {
        ellipses.push({index: i, angle: map(i, 0, SETTINGS.count - 1, 0, PI)});
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(COLORS.background);

    let cx = width / 2;
    let cy = height / 2;
    let clockSize = min(width, height) * SETTINGS.clockScale;
    let s = clockSize / 600;
    let spacing = SETTINGS.spacing * s;
    let maxWidth = SETTINGS.ellipseWidth * s;
    let ellipseHeight = SETTINGS.ellipseHeight * s;
    let startY = cy - ((SETTINGS.count - 1) * spacing) / 2;
    let currentSecond = second();
    let currentMinute = minute();
    let currentHour = hour();

    updateClockTime();

    push();
    translate(cx, cy);
    rotate(frameCount * SETTINGS.rotationSpeed);
    translate(-cx, -cy);

    drawHourglassEllipses(cx, startY, spacing, maxWidth, ellipseHeight, currentSecond, currentMinute, s);
    drawMinuteHighlight(cx, startY, spacing, maxWidth, currentMinute, s);
    drawHourRings(cx, cy, spacing, currentHour, s);
    pop();

}

function drawHourglassEllipses(cx, startY, spacing, maxWidth, ellipseHeight, currentSecond, currentMinute, s) {
    for (let item of ellipses) {
        let i = item.index;
        let y = startY + i * spacing;
        let w = maxWidth * abs(sin(item.angle));
        let isSecondActive = i <= currentSecond;
        let isMinuteActive = i >= SETTINGS.count - currentMinute;
        let lineColor = color(COLORS.ellipseLine);
        let lineAlpha = 45;
        let fillColor = color(COLORS.background);

        if (isSecondActive) {
            fillColor = color(COLORS.second);
        }

        if (isMinuteActive) {
            lineColor = color(COLORS.minute);
            lineAlpha = 190;
        }

        stroke(red(lineColor), green(lineColor), blue(lineColor), lineAlpha);
        strokeWeight(1.5 * s);
        fill(fillColor);
        ellipse(cx, y, w, ellipseHeight);
    }
}

function drawMinuteHighlight(cx, startY, spacing, maxWidth, currentMinute, s) {
    let minuteIndex = SETTINGS.count - currentMinute - 1;
    let minuteY = startY + minuteIndex * spacing;
    let minuteAngle = map(minuteIndex, 0, SETTINGS.count - 1, 0, PI);
    let minuteWidth = maxWidth * abs(sin(minuteAngle));

    noFill();
    stroke(255);
    strokeWeight(1 * s);
    ellipse(
        cx,
        minuteY,
        minuteWidth + 8 * s,
        17 * s
    );    
}

function drawHourRings(cx, cy, spacing, currentHour, s) {
    if (currentHour === 0) {
        return;
    }

    let hourDiameter = (SETTINGS.count - 1) * spacing + 14 * s;

    for (let i = 1; i <= currentHour; i++) {
        let diameter = hourDiameter * (i / currentHour);

        let ringColor = color(COLORS.hour);
        ringColor.setAlpha(40 + i * 5);

        noFill();
        stroke(ringColor);
        strokeWeight(1.5 * s);
        ellipse(cx, cy, diameter, diameter);
    }
}

function updateClockTime() {
    let timeElement = document.getElementById("clock-time");

    if (timeElement) {
        let h = String(hour()).padStart(2, "0");
        let m = String(minute()).padStart(2, "0");
        let s = String(second()).padStart(2, "0");

        timeElement.textContent = h + ":" + m + ":" + s;
    }
}