var coral = [];
var bubbles = [];

let axiom = "F";
let rules = [];
let sentence;

let isStroke = false;
let diff = 0;

rules[0] = {
  a: "F",
  b: "+[+FF]-[-F+F+F]F"
}

rules[1] = {
  a: "F",
  b: "+[+F-F-F]F-[-F+F+F]-FF"
}

rules[2] = {
  a: "F",
  b: "→F[+F]F[-F][F]"
}

let swidth = Math.min(screen.width,window.innerWidth);
let sheight = Math.min(screen.height,window.innerHeight);



function setup() {
  createCanvas(screen.width, screen.height);
  button = createButton("Regenerate Coral");
  button.mouseClicked(generate);
  button.id("regenerate");
  for (var i = 0; i < 15; i++) {
    bubbles.push(new Bubble());
  }
  for (var i = 1; i < 8; i++) {
    coral.push(new Coral(swidth/3+i*swidth/23,sheight-100));
  }
}

function generate(){
  coral = [];
  for (var i = 1; i < 8; i++) {
    coral.push(new Coral(swidth/3+i*swidth/23,sheight-100));
  }
}

function windowResized(){
  swidth = Math.min(screen.width,window.innerWidth);
  sheight = Math.min(screen.height,window.innerHeight);
  for (var i = 0; i < coral.length; i++) {
    coral[i].x = swidth/3+i*swidth/23 + swidth/21;
    coral[i].y = sheight-100;
  }
}

function draw() {
  background(50, 89, 100);
  button.position(swidth-200,50);
  noStroke();
  fill(156, 118, 73);
  rect(0,sheight-100,swidth,100);
  stroke(255);
  noFill();
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].render();
    bubbles[i].move();
  }
  noStroke();
  for (var i = 0; i < coral.length; i+= 2) {
    coral[i].render();
  }
  fill(255);
  push();
  translate(-75,-100);
  textSize(36);
  textFont('Monoton');
  text("coral",swidth/2,sheight/2);
  pop();
  for (var i = 1; i < coral.length; i+= 2) {
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
  this.r2 = random(this.r-80,this.r+80);
  this.g = random(255);
  this.g2 = random(this.g-80,this.g+80);
  this.b = random(255);
  this.b2 = random(this.b-80,this.b+80);
  this.width = 50;
  this.height = 100;
  this.minlength = 3;
  this.length = random(this.minlength,10);
  this.minwid = 2;
  this.wid = random(this.minwid,10);
  this.angle = random([random(-PI/6,-PI/10),random(PI/10,PI/6)]);
  // this.angle = PI/6;
  this.lendiff = random(0.1,0.9);
  this.complexity=3;
  this.curvature = random(-20,20);
  this.sturdiness = 0.002;
  this.flex = 0.0002;
  this.diff = random(-0.001,0.001);

  this.generate = (sentence,len,times) => {
    if (times > 0){
      let nextSentence = "";
      for (let i = 0; i < sentence.length; i++) {
        let current = sentence[i];
        let found = false;
        if (current == rules[(random([0,1,2]))].a){
          nextSentence += rules[(random([0,1,2]))].b;
          found = true;
        }
        if (!found){
          nextSentence += current;
        }
      }
      return this.generate(nextSentence,len,times-1);
    }
    return sentence;
  }

  this.l = this.generate(axiom,this.len,this.complexity,this.lendiff);
  // this.complexity = 0;
  // this.strokeWidth = random(1,4);
  // this.strokeWidth2 = random(1,4);
  this.shape = (len) =>{
    fill(this.r,this.g,this.b);
    line(0,0,0,-len);
    beginShape();
    // curveVertex(0,0);
    // curveVertex(-10,0);
    // curveVertex(-15,-20);
    // curveVertex(0,0);
    vertex(0,0);
    // bezierVertex(this.curvature,-len,-this.curvature,-len,0,0);

    vertex(0,-len);
    vertex(this.wid,-len);
    vertex(this.wid,0);
    endShape();
  }

  this.checkConstraints = (coral) => {
    if (coral.length < coral.minlength){
      coral = coral.minlength;
    }
    if (coral.angle < -PI/6){
      coral.angle = -PI/6;
    }
    if (coral.angle > PI/6){
      coral.angle = PI/6;
    }
  }

  this.clicked = () => {
    for (var i = 0; i < coral.length; i++) {
      let difference = 15;
      let roll = random(1);
      if (roll >0.9){
        difference = 120;
      }
      coral[i].r = random(this.r-difference,this.r+difference);
      coral[i].g = random(this.g-difference,this.g+difference);
      coral[i].b = random(this.b-difference,this.b+difference);
      coral[i].r2 = random(this.r2-difference,this.r2+difference);
      coral[i].g2 = random(this.g2-difference,this.g2+difference);
      coral[i].b2 = random(this.b2-difference,this.b2+difference);
      coral[i].length = random(this.length-2,this.length+2);
      coral[i].angle = random(this.angle-PI/32,this.angle+PI/32);
      coral[i].curvature = random(this.curvature-2,this.curvature+2);
      coral[i].wid = random(this.wid-1,this.wid+1);
      roll = random(1);
      if (roll <0.9){
        coral[i].l = this.l;
      }
      // coral[i].strokeWidth = random(this.strokeWidth*0.7,this.strokeWidth*1.3);
      // coral[i].strokeWidth2 = random(this.strokeWidth2*0.7,this.strokeWidth2*1.3);
      this.checkConstraints(this);
    }
  }

  this.render = () => {
    this.diff += this.flex;
    if (this.diff > this.sturdiness){
      this.flex = -this.flex;
    } else if (this.diff < -this.sturdiness){
      this.flex = -this.flex;
    }
    if (mouseX < this.x+this.width/2 && mouseX > this.x-this.width/2){
      if (mouseY < this.y && mouseY > this.y - this.height){
        isStroke = true;
      }else{
        isStroke = false;
      }
    }else{
      isStroke = false;
    }
    push();
    this.renderL(this.l,this.length,this.diff);
    pop();

  }

  this.renderL = (l,length,diff) => {
    translate(this.x,this.y);
    stroke(this.r2,this.g2,this.b2);
    if (isStroke){
      if ((this.r2 > 200 && this.g2 > 200 && this.b2 > 200)||(this.r > 200 && this.g > 200 && this.r>200)){
        stroke(0);
      }else{
        stroke(255);
      }
    }
    let len = length;
    for (var i = 0; i < l.length; i++) {
      let current = l[i];
      if (current == "F"){
        strokeWeight(0.8);
        this.shape(len);
        translate(0,-len);
      } else if (current == "X"){
        strokeWeight(0.8);
        this.shape(len);
        translate(0,-len);
      } else if (current == "+"){
        rotate(this.angle-diff);
      } else if (current == "-"){
        rotate(-this.angle-diff);
      } else if (current == "["){
        push();
      } else if (current == "]"){
        pop();
      } else if (current == "/"){
        len = len*0.9;
      }
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
