# Sound Visualization: Nailong Instrument

For this assignment, I chose Option 1 and designed an instrument based on a character called Nailong. I chose six voice samples and used different body parts of Nailong to visualize the sounds. Users can use the keyboard to control which body parts make sounds and use the mouse to lower or raise the pitch. When the sounds play, the whole character changes its size depending on the sound level.

## Controls
| Key or action | Function |
| --- | --- |
| Q | Head sound |
| W | Left arm sound |
| E | Right arm sound |
| A | Belly sound |
| S | Left leg sound |
| D | Right leg sound |
| Space | Start or stop the instrument |
| B | Turn the drum beat on or off |
| Hold several sample keys | Play different sounds together |
| Move the mouse left inside the canvas | Lower the pitch and make the sounding body parts shorter and wider |
| Move the mouse right inside the canvas | Raise the pitch and make the sounding body parts longer and thinner |

## Problems
 was controlling the pitch and the body parts together. I used `map()` to map the mouse's x-position to a playback rate from 0.5 to 1.5. Then I mapped this value to body-part lengths from 0.7 to 1.3 times their original lengths. When drawing the pictures, I used a mathematical formula to make longer body parts thinner and shorter body parts wider.

I also experimented with `analysis.smooth(0.6)` to make the character change its scale more smoothly. Finding the position of each body part was also difficult. Sometimes the parts were too far apart or moved away from each other. I tried many times to find the right positions.

Although this instrument is simple to use, it is still hard to control the beats and sounds together.

## Three-Day Practice
**Day 1:** I found it hard to control a single sound while moving the mouse. I changed some code to adjust the positions and make the movements smoother.
**Day 2:** I tried playing different sounds together. In the first version of my code, I could only play one sound at a time. I wanted to hear what would happen when different sounds played together, and I found that something magical happened when they were combined.
**Day 3:** I had better control of the instrument and could play the sounds more rhythmically with the beat.