function setup() { 
    createCanvas(windowWidth, windowHeight); 
    noFill(); 
    stroke(255); 
    strokeWeight(2); 
} 
 
function draw() { 
    background(50); 
 
    for (let x = 0; x < 2; x++) { 
        for (let y = 0; y < 3; y++) { 
            setCenter(x * 75 + 150, y * 75 + 60);
            let size = x * 10 + mouseX / 10;

            push();
            polarEllipses(20, size, 60, 60); 
            pop();

            push();
            fill(255,0,0,50);
            polarEllipses(20, size, size, 60); 
            pop();



        } 
    } 
}

