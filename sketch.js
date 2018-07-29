"use strict";

class Particle {
  constructor(i, r) {
    this.RAD = 4;
    this.BOUNCE = -1;
    this.SPEED_MAX = 1.8;
    this.FORCE_MAX = 0.5;
    this.DIST_MAX = 60;
    this.dis = random(r - 10, r + 10);
    this.speed = createVector(
      random(-this.SPEED_MAX, this.SPEED_MAX),
      random(-this.SPEED_MAX, this.SPEED_MAX)
    );
    this.acc = createVector(0, 0);
    this.pos = createVector(random(width), random(height));
    this.neighboors = [];
    this.target = createVector(width / 2, height / 2);
    this.otarget = createVector(width / 2, height / 2);
    this.count = 0;
    this.index = i;
  }

  arrive() {
    var desired = p5.Vector.sub(this.target, this.pos);
    var d = desired.mag();
    var speed = this.SPEED_MAX;
    if (d < 120) {
      speed = map(d, 0, 100, 0, this.SPEED_MAX);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.speed);
    steer.limit(this.FORCE_MAX / 5);
    this.applyForce(steer);
  }

  applyForce(f) {
    this.acc.add(f);
  }

  ball() {
    var vector = p5.Vector.fromAngle(radians(3 * this.index));
    vector.setMag((this.index % 10 + 2) * 15);
    var target = vector.add(this.otarget);
    var distance = p5.Vector.sub(this.target, this.pos);
    var d = distance.mag();
    if (d > 150) {
      this.pos = target;
    }
  }

  flee(m) {
    var desired = p5.Vector.sub(this.otarget, this.pos);
    var d = desired.mag();
    if (d < this.dis) {
      desired.setMag(this.SPEED_MAX);
      desired.mult(-1);
      var steer = p5.Vector.sub(desired, this.speed);
      steer.limit(this.FORCE_MAX * 2);
      steer.mult(m);
      this.applyForce(steer);
    }
  }

  checkEdges() {
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.speed.x *= this.BOUNCE;
    } else if (this.pos.x > width) {
      this.pos.x = width;
      this.speed.x *= this.BOUNCE;
    }
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.speed.y *= this.BOUNCE;
    } else if (this.pos.y > height) {
      this.pos.y = height;
      this.speed.y *= this.BOUNCE;
    }
  }

  update() {
    this.pos.add(this.speed);
    this.speed.add(this.acc);
    this.acc.mult(0);
  }

  display() {
    fill(255, 14);
    ellipse(this.pos.x, this.pos.y, this.RAD, this.RAD);
  }
}

class Triangle {
  constructor(p1, p2, p3) {
    this.A = p1;
    this.B = p2;
    this.C = p3;
  }

  display() {
    vertex(this.A.x, this.A.y);
    vertex(this.B.x, this.B.y);
    vertex(this.C.x, this.C.y);
  }
}

var NB_PARTICLES = 120;
var triangles = [];
var parts = [];
var img;
var col;
var pressed = false;
// var over = false;
var count = 0;
// var oldover = false;

function setup() {
  if (windowWidth < 500) {
    createCanvas(0.85 * windowWidth, 0.45 * windowHeight);
    NB_PARTICLES = 45;
    for (var i = 0; i < NB_PARTICLES; i++) {
      parts.push(new Particle(i, 80));
    }
  } else {
    createCanvas(0.45 * windowWidth, 0.85 * windowHeight);
    for (var i = 0; i < NB_PARTICLES; i++) {
      parts.push(new Particle(i, 130));
    }
  }
  col = color(32, 152, 209);
}

function draw() {
  col = color(
    42 + 10 * sin(frameCount * 0.05),
    162 + 10 * sin(frameCount * 0.05),
    219 + 10 * sin(frameCount * 0.05)
  );
  background(255);
  triangles = [];

  for (var i = 0; i < NB_PARTICLES; i++) {
    if (pressed) {
      if (i % 4 == 0) {
        parts[i].arrive();
      }
      parts[i].flee(3);
    }
    parts[i].checkEdges();
    parts[i].update();
  }

  // oldover = over;

  for (var i = 0; i < NB_PARTICLES; i++) {
    var p1 = parts[i];
    p1.neighboors = [];
    p1.neighboors.push(p1);
    for (var j = i + 1; j < NB_PARTICLES; j++) {
      var p2 = parts[j];
      var d = p1.pos.dist(p2.pos);
      if (d > 0 && d < p1.DIST_MAX && p1.neighboors.length < 10) {
        p1.neighboors.push(p2);
      }
    }
    if (p1.neighboors.length > 1) {
      addTriangles(p1.neighboors);
    }
  }
  drawTriangles();

  // if(window.over && window.clicked == false){
  //   over = true;
  // }else{
  //   over = false;
  // }

  if (window.clicked && count == 0) {
    for (var i = 0; i < NB_PARTICLES; i++) {
      if (i % 4 == 0) {
        var vector = p5.Vector.fromAngle(radians(3 * i));
        vector.setMag(parts[i].dis);
        parts[i].target = parts[i].target.add(vector);
      }
    }
    pressed = true;
    count = 1;
  }
}

function drawTriangles() {
  noStroke();

  fill(red(col), green(col), blue(col), 13);
  stroke(
    max(red(col) - 10, 0),
    max(green(col) - 10, 0),
    max(blue(col) - 10, 0),
    13
  );
  //noFill();
  beginShape(TRIANGLES);
  for (var i = 0; i < triangles.length; i++) {
    triangles[i].display();
  }
  endShape();
}

function addTriangles(p_neighboors) {
  var s = p_neighboors.length;
  if (s > 2) {
    for (var i = 1; i < s - 1; i++) {
      for (var j = i + 1; j < s; j++) {
        triangles.push(
          new Triangle(
            p_neighboors[0].pos,
            p_neighboors[i].pos,
            p_neighboors[j].pos
          )
        );
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
