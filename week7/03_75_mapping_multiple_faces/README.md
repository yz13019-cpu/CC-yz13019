# Projection Mapping

An interactive p5.js projection-mapping sketch for three 400 × 400 surfaces arranged as the left, top, and right faces of a cube. A soft-edged pink ball moves across the connected edges, slows near the edges, speeds up toward the center of each face, and bounces from the unconnected edges.

## Controls

| Key | Action |
| --- | --- |
| `c` | Enter or exit calibration mode |
| `f` | Toggle fullscreen |
| `s` | Save the calibrated surface mapping as JSON |
| `l` | Load `map.json` |

## What I made

I created three 400 × 400 projection surfaces and assigned them to the left, top, and right faces. I wrote a soft-edged pink ball animation that crosses the connected edges between faces. The ball slows near an edge, accelerates toward the center, and reflects from edges that are not connected to another face.

## Process reflection

One of my biggest challenges was figuring out which edges between the three faces should let the ball pass through and which edges should make it bounce back. I spent a lot of time working out the correct connections between the faces of the cube. Another challenge was adjusting the ball's speed. I wanted it to move fastest near the center of a face and slow down as it approached an edge. I used a distance-based easing function to control the acceleration, and asked an LLM to help me understand and write the speed formula. I then applied that formula in my sketch.

## Adjust the animation

Edit the constants near the top of `sketch.js`:

- `BALL_RADIUS`: ball size.
- `MAX_SPEED`: maximum speed near the center of a face.
- `EDGE_SPEED`: minimum speed near an edge.
- `ACCEL_ZONE`: how far from an edge the ball accelerates.
- `BALL_COLOR` and `BALL_CORE_COLOR`: ball colors in RGB values from 0 to 255.
