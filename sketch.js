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
  for (var i = 0; i < coral.length; i++) {
    coral[i].generateAppendages();
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
    coral[i].checkConstraints();
    coral[i].render();
  }
}

function mouseClicked() {
  for (var i = 0; i < coral.length; i++) {
    if (mouseX < coral[i].x+coral[i].hradius && mouseX > coral[i].x-coral[i].hradius){
      if (mouseY < coral[i].y && mouseY > coral[i].y - coral[i].height){
        coral[i].clicked();
      }
    }
  }

}

function Appendage(coral){
  this.r = random(coral.appendageR+20,coral.appendageR+80);
  this.g = random(coral.appendageG+20,coral.appendageG+80);
  this.b = random(coral.appendageB+20,coral.appendageB+80);
  this.x = random(coral.x-20,coral.x+20) + random(-coral.width/2,coral.width/2);
  this.y = random(coral.y-20,coral.y+20) - coral.vradius;
}

function Coral(x,y) {
  this.minwidth = 40;
  this.minheight = 40;
  this.width = random(50,100);
  this.height = random(50,200);
  this.hradius = this.width/2;
  this.vradius = this.height/2;
  this.x = x;
  this.y = y;
  this.r = random(255);
  this.g = random(255);
  this.b = random(255);
  this.appendageR = random(255);
  this.appendageG = random(255);
  this.appendageB = random(255);
  this.minAppendages = 5;
  this.numAppendages = random(4,200);
  this.appendages = [];

  this.generateAppendages = () => {
    this.appendages = [];
    for (var i = 0; i < this.numAppendages; i++) {
      this.appendages.push(new Appendage(this));
    }
  }

  this.checkConstraints = () =>{
    if (this.width < this.minwidth){
      this.width = this.minwidth;
      this.hradius = this.width/2;
    }

    if (this.height < this.minheight){
      this.height = this.minheight;
      this.hradius = this.height/2;
    }

    if (this.numAppendages < this.minAppendages){
      this.numAppendages = this.minAppendages;
    }
  }

  this.clicked = () => {
    for (var i = 0; i < coral.length; i++) {
      coral[i].r = random(this.r-50,this.r+50);
      coral[i].g = random(this.g-50,this.g+50);
      coral[i].b = random(this.b-50,this.b+50);
      coral[i].appendageR = random(this.appendageR-50,this.appendageR+50);
      coral[i].appendageG = random(this.appendageG-50,this.appendageG+50);
      coral[i].appendageB = random(this.appendageB-50,this.appendageB+50);
      coral[i].width = random(this.width-20,this.width+20);
      coral[i].hradius = coral[i].width/2;
      coral[i].height = random(this.height-20,this.height+20);
      coral[i].vradius = coral[i].height/2;
      coral[i].numAppendages = coral[i].numAppendages+random(-50,10);
      coral[i].checkConstraints();
      coral[i].generateAppendages();
    }
  }

  this.render = () => {
    fill(this.r, this.g, this.b);
    ellipse(this.x,this.y-this.vradius,this.width,this.height);

    for (var i = 0; i < this.appendages.length; i++) {
      fill(this.appendages[i].r,this.appendages[i].g,this.appendages[i].b);
      stroke(this.appendages[i].g,this.appendages[i].g,this.appendages[i].b);
      arc(this.appendages[i].x,this.appendages[i].y, 30, 30, 0, PI/2, CHORD);
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
