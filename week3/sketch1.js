let rot = 0.0;  
  
function setup() {  
    createCanvas(800, 800);  
    noFill();  
    stroke(0);  
    strokeWeight(15);  
}  
  
function draw() {  
    background(255);  
    rectMode(CENTER); 
 
    for (let x = 0; x < 10; x++) {  
        for (let y = 0; y < 10; y++) {  
            let scaleAmount = 0.5 + y * 0.5;
            let yRotation = 1 + y * 0.1;
            let mouseRotation = (mouseX / width - 1) * PI / 2;
            let mouseScale = 0.5 + (mouseY / height);

            push(); 
            stroke(360 * (y/10), 200, 100);
            translate(x * 75 + 25, y * 75 + 25); 
            rotate(yRotation + mouseRotation); 
            scale(scaleAmount * mouseScale); 
            line(-25, -20, 20, -28);
            pop();  
        }  
    }  
}