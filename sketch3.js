var coral = [];
var bubbles = [];

let axiom = "F";
let rules = [];
let sentence;

rules[0] = {
  a: "F",
  b: "+[+FF]-[-F+F+F]F"
}

rules[1] = {
  a: "F",
  b: "+[+F-F-F]F-[-F+F+F]FF"
}

rules[2] = {
  a: "F",
  b: "FF+[+F-F]-[-F]"
}

function setup() {
  createCanvas(1080, 600);
  for (var i = 0; i < 15; i++) {
    bubbles.push(new Bubble());
  }
  for (var i = 1; i < 9; i++) {
    coral.push(new Coral(300+i*50,500));
  }
}

function draw() {
  background(50, 89, 100);
  fill(255);
  push();
  translate(-75,-100);
  textSize(36);
  textFont('Handlee');
  text("Coral",width/2,height/2);
  pop();
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
  this.r2 = random(this.r-80,this.r+80);
  this.g = random(255);
  this.g2 = random(this.g-80,this.g+80);
  this.b = random(255);
  this.b2 = random(this.b-80,this.b+80);
  this.minwidth = 30;
  this.minheight = 100;
  this.width = random(this.minwidth,150);
  this.height = random(this.minheight,200);
  this.minlength = 3;
  this.length = random(this.minlength,10);
  this.minwid = 2;
  this.wid = random(this.minwid,10);
  this.angle = random([random(-PI/6,-PI/10),random(PI/10,PI/6)]);
  // this.angle = PI/6;
  this.lendiff = random(0.1,0.9);
  this.complexity = random(2,3);
  this.curvature = random(-20,20);

  this.generate = (sentence,len,times,lendiff) => {
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
      return this.generate(nextSentence,len*lendiff,times-1);
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
    if (coral.width < coral.minwidth){
      coral.width = random(coral.minwidth,coral.minwidth+20);
    }
    if (coral.height < coral.minheight){
      coral.height = random(coral.minheight,coral.minheight-20);
    }
  }

  this.clicked = () => {
    for (var i = 0; i < coral.length; i++) {
      coral[i].r = random(this.r-30,this.r+30);
      coral[i].g = random(this.g-30,this.g+30);
      coral[i].b = random(this.b-30,this.b+30);
      coral[i].r2 = random(this.r2-30,this.r2+30);
      coral[i].g2 = random(this.g2-30,this.g2+30);
      coral[i].b2 = random(this.b2-30,this.b2+30);
      coral[i].length = random(this.length-2,this.length+2);
      coral[i].angle = random(this.angle-PI/12,this.angle+PI/12);
      coral[i].curvature = random(this.curvature-2,this.curvature+2);
      coral[i].wid = random(this.wid-1,this.wid+1);
      // coral[i].strokeWidth = random(this.strokeWidth*0.7,this.strokeWidth*1.3);
      // coral[i].strokeWidth2 = random(this.strokeWidth2*0.7,this.strokeWidth2*1.3);
      this.checkConstraints(this);
    }
  }

  this.render = () => {
    push();
    this.renderL(this.l,this.length);
    pop();
  }

  this.renderL = (l,length) => {
    translate(this.x,this.y);
    stroke(this.r2,this.g2,this.b2);
    for (var i = 0; i < l.length; i++) {
      let current = l[i];
      let len = length;
      if (current == "F"){
        strokeWeight(0.8);
        this.shape(length);
        translate(0,-length);
      } else if (current == "X"){
        strokeWeight(0.8);
        this.shape(length);
        translate(0,-length);
      } else if (current == "+"){
        rotate(this.angle);
      } else if (current == "-"){
        rotate(-this.angle);
      } else if (current == "["){
        push();
      } else if (current == "]"){
        pop();
      } else if (current == "/"){
        len = len*0.5;
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
