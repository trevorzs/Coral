var coral = [];
var bubbles = [];

function setup() {
  createCanvas(1200, 600);
  for (var i = 0; i < 15; i++) {
    bubbles.push(new Bubble());
  }
  for (var i = 1; i < 9; i++) {
    coral.push(new Coral(i*133,500));
  }
}

function draw() {
  background(50, 89, 100);
  noStroke();
  fill(92, 65, 37);
  rect(0,500,1200,100);
  stroke(255);
  noFill();
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].render();
    bubbles[i].move();
  }
  noStroke();
  for (var i = 0; i < coral.length; i++) {
    coral[i].render();
  }
}

function mouseClicked() {
  for (var i = 0; i < coral.length; i++) {
    if (mouseX < coral[i].x+coral[i].width/2 && mouseX > coral[i].x-coral[i].width/2){
      if (mouseY < coral[i].y && mouseY > coral[i].y - coral[i].height){
        coral[i].clicked();
        coral[i].render();
      }
    }
  }

}

function Coral(x,y) {
  this.x = x;
  this.y = y;
  this.r = random(255);
  this.g = random(255);
  this.b = random(255);
  this.minwidth = 30;
  this.minheight = 100;
  this.width = random(this.minwidth,150);
  this.height = random(this.minheight,200);
  this.numAppendages = random(1,15);
  this.minAppendages = 1;
  this.curvature = random(-20,20);

  this.checkConstraints = (coral) => {
    if (coral.width < coral.minwidth){
      coral.width = random(coral.minwidth,coral.minwidth+20);
    }
    if (coral.height < coral.minheight){
      coral.height = random(coral.minheight,coral.minheight-20);
    }
    if (coral.numAppendages < coral.minAppendages){
      coral.numAppendages = random(coral.minAppendages,coral.minAppendages+4);
    }
  }

  this.clicked = () => {
    for (var i = 0; i < coral.length; i++) {
      coral[i].r = random(this.r-50,this.r+50);
      coral[i].g = random(this.g-50,this.g+50);
      coral[i].b = random(this.b-50,this.b+50);
      coral[i].width = random(this.width-20,this.width+20);
      coral[i].height = random(this.height-20,this.height+20);
      coral[i].numAppendages = random(this.numAppendages-4,this.numAppendages+4);
      this.checkConstraints(this);
    }
  }

  this.render = () => {
    push();
    this.appendages(this.numAppendages,this.width/this.numAppendages);
    pop();
  }

  this.appendages = (num,width) => {
    if (num > 0){
      fill(this.r, this.g, this.b);
      noStroke();
      beginShape();
      vertex(this.x-this.width/2, this.y);
      bezierVertex(this.x-this.width/2 + this.curvature, this.y-this.height, this.x-this.width/2+width,this.y-this.height,this.x-this.width/2+width,this.y);
      endShape();
      translate(width,0);
      this.appendages(num-1,width);
    }
  }

  this.appendage = (y,length) => {
    if (length > 4){
      push();
      stroke(255);
      strokeWeight(5);
      translate(0,0,0,-length);
      rotate(PI/4);
      line(this.x,y,this.x,y-length);
      pop();
      this.appendage(y-length,length*0.67);

    }
  }
}


function Bubble() {
  this.x = random(width);
  this.y = random(height);
  this.hspeed = 1;
  this.vspeed = random(-2,-0.8);
  this.diameter = random(5,20);

  this.move = () => {
    if (this.y < -this.diameter){
      this.reset();
    }
    this.x += random(-this.hspeed,this.hspeed);
    this.y += this.vspeed;
  }

  this.reset = () => {
    this.y = height+this.diameter;
    this.x = random(width);
    this.diameter = random(5,20);
  }

  this.render = () => {
    ellipse(this.x,this.y,this.diameter/2,this.diameter/2);
  }
}
