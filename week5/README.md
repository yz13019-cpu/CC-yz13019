# Cyberpunk Clock

## Design Concept

My original idea was to create a digital hourglass. I wanted to use shapes and movement to represent the passage of time in a visual way.

However, while experimenting with `sin()` and `cos()` to control the widths and positions of the ellipses, the result began to look more like an eye or a leaf than a traditional hourglass. Although the final shape was different from my original plan, I decided to keep exploring this unexpected result. Combined with bright orange and green elements, a dark blue background, and continuous rotation, the composition developed into a cyberpunk-inspired clock.

## Visual Elements

- **Orange ellipses:** Represent the progression of seconds and minutes.
- **Green rings:** Represent the current hour.
- **White outline:** Highlights the current minute position.
- **Blue background:** Creates contrast with the bright colors and supports the cyberpunk atmosphere.
- **Continuous rotation:** Adds movement and makes the clock feel more dynamic.
- **Digital time display:** Shows the current time in `HH:MM:SS` format.

## How It Works

### 1. Time Representation

- `second()` returns the current second.
- `minute()` returns the current minute.
- `hour()` returns the current hour.

### 2. Ellipse System

The clock contains 60 ellipses arranged vertically. Their widths are calculated using the sine function.

### 3. Hour Rings

Green circular rings represent the current hour. Their number changes according to the hour returned by `hour()`. At midnight, the rings are hidden.

### 4. Animation

The entire composition rotates continuously using `rotate()` and `frameCount`. This adds movement to the geometric structure.

### 5. Digital Time Display

The HTML element with the ID `clock-time` displays the current time. The `updateClockTime()` function formats the hour, minute, and second as two-digit numbers and updates the display.


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