let rot = 0.0; 
 
function setup() { 
    createCanvas(800, 800); 
    noFill(); 
    stroke(0); 
    strokeWeight(2); 
} 
 
function draw() { 
    background(255); 
    let mouseRotation = (mouseX / width) * PI / 2;

    for (let x = 0; x < 10; x++) { 
        for (let y = 0; y < 10; y++) { 
            let xPos = x * 75 + 50 + sin(y * 0.5 + frameCount * 0.02) * 30; 
            let yPos = y * 75 + 50 + cos(x * 0.5 + frameCount * 0.02) * 30;   
 
            push(); 
            translate(xPos, yPos); 
            rotate(sin(frameCount * 0.01) + mouseRotation); 
            quad(-50, 50, 50, -50, -50, -50, 50, 50); 
            pop(); 
        } 
    } 
}