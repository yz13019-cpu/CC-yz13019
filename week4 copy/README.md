```
let  s, m, h, d, mo, y;
let ms, fc;

function setup() {
  createCanvas(600, 800);
  y = year();
  mo = month();
  d = day();
  console.log('year: ' + y + ', month: ' + mo + ', day' + d);

}

function draw() {
  background(220);
  ms = millis();

  fc = frameCount;

  s =second();
  m = minute();
  h = hour();
  if (ps != s) {
    console.log('hour: ' + h + ', minute: ' + m + ', second: ' + s);
  }
  ps = s;
}
```