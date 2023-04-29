let n = 500; // particles count
let particles = []; // particles array

let typedText1 = "embrace impermanence;"; // first string
let typedText2 = "live now."; // second string

let typedArray1 = []; // first string character array
let typedArray2 = []; // second string character array
let index1 = 0; // first string character array index
let index2 = 0; // second string character array index

let timer = 0; // first string timer
let secondTimer = 0; // second string timer (has longer delay)

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  textSize(24);
  textAlign(CENTER);
  textStyle(BOLD);
  typedArray1 = typedText1.split(""); // split first string into array of each character
  typedArray2 = typedText2.split(""); // split second string into an array of each character

  for (let i = 0; i < n; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background(0);

  // Check if 30 seconds have passed before first string is typed
  if (millis() > 30000) {
    timer += deltaTime;
    if (timer >= 100) {
      if (index1 < typedArray1.length) {
        index1++;
      }
      timer = 0;
    }
  }

  // Check if 34 seconds have passed before second string is typed
  if (millis() > 34000) {
    secondTimer += deltaTime;
    if (secondTimer >= 100) {
      if (index2 < typedArray2.length) {
        index2++;
      }
      secondTimer = 0;
    }
  }

  // Display typed text in the center of the canvas
  fill(255);
  text(typedArray1.slice(0, index1).join(""), width / 2, height / 2 - 20);
  text(typedArray2.slice(0, index2).join(""), width / 2, height / 2 + 20);

  for (let i = 0; i < n; i++) {
    particles[i].update();
    particles[i].display();
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y); // particle's position
    this.vel = createVector(random(-1, 1), random(-1, 1)); // paticle's velocity
    this.acc = createVector(0, 0); // particle's acceleration
    this.life = random(50, 200); // particle's lifespan
    this.h = random(0, 360); // particle's hue
    this.s = random(50, 100); // particle's saturation
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.life -= 0.1;
    this.h += random(-5, 5); // add some randomness to the hue
    this.s -= random(0.1, 0.5); // make the particle less saturated over time
  }

  display() {
    strokeWeight(2);
    stroke(this.h, this.s, 100, this.life); // set the particle's color based on its properties
    point(this.pos.x, this.pos.y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
