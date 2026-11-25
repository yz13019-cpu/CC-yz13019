# Data Visualization/Data Portraiture

## Data Source & System Context
The dataset comes from **NASA’s Center for Near-Earth Object Studies (CNEOS)** Fireball and Bolide Data system.

## Research Question
**At what atmospheric altitudes do recorded fireballs most frequently reach peak brightness? How sharply does event frequency drop off near Earth's surface?**

## What This Visualization Reveals, Hides, and Argues For
By dividing altitude onto 16 ranges (0–80 km in 5 km interval), each orange dot represents a single recorded event. This radial image reveals that fireball detections are not evenly distributed. They cluster densely in the middle altitude (30–45 km) and become sparse at very low and very high altitudes.

What I hide: 5 km interval hides individual event such as exact date/time, geographic coordinates (latitude/longitude), velocity, radiated impact energy, and exact altitudes within a single ring.

## Data
I refashions the raw dataset by:
1. Reading the JSON table (`data.fields` and `data.data`) to find the `"alt"` column and transfer them into the altitude numbers.
2. Grouping hundreds of separate altitude values into 16 ranges (`5 km`) and counting how many events fall into each one.
3. Using the mouse's distance from the center (`dist()`) to highlight rings when the user hovers.