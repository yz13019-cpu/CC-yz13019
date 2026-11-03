# Self Portrait

I used live webcam feed into a grid of colored blocks on a white background. I can click anywhere in the image to pick a color for all the visible blocks.

## Faced Problems
- I used the formula from `09_use_brightness/sketch.js` to turn the red, green, and blue values of each pixel into one brightness value. Because I wanted bright areas of the camera image to stand out, I set the brightness threshold to 110 and the pixel at the top left of each grids. If that pixel is bright enough, I draw a block. Otherwise, the grids stays white.
- I followed the approach in `11_track_color/sketch.js` to reading a camera pixel's color with `get(x, y)` when I click. But I find the problem that the camera image stretches to fill the window, so the position of mouse pressed is not the position of color block. In order to fix this problem, I first use `map()` to find the same relative position in the original camera image, which converts the mouse's horizontal and vertical position from the canvas width to the camera width.

## Final visual effect
The result is a live webcam feed that changes as people and objects move in front of the camera. If I hold up a blue object and click on it, all visible blocks turn into blue. 