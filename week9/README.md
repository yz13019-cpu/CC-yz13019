# Gestural control

I used the head of my favorite cartoon character, Nailong, as inspiration. Users can control the size of Nailong’s head by changing the distance between their hands and rotate it with their hands. When the index finger and thumb of hand come together, the image keeps its current position, size, and rotation, and a Nailong sound plays automatically. When the index finger and thumb separate, the sound stops, and users can control the image again.

Since the image is inside a circle, I use the distance between the centers of the two hands as the circle’s diameter. The angle of the line connecting the two hands controls the rotation of the image.

I faced the problem of let picture rotates with hands, so I use 'atan2()' to find the angle of the line between my two hands and rotate the image. 
https://p5js.org/reference/p5/atan2/