var coral = [];
var bubbles = [];

let axiom = "FX";
let rules = [];
let sentence;
rules[0] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]"
}
rules[1] = {
  a: "X",
  b: "XF+[+X-F-X]-[-X+F+X]"
}

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
  this.angle = random(-PI/4,PI/4);
  this.lendiff = random(0.1,0.9);
  this.complexity = random(2,3);
  this.strokeWidth = random(1,4);
  this.strokeWidth2 = random(1,4);

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
      coral[i].r = random(this.r-50,this.r+50);
      coral[i].g = random(this.g-50,this.g+50);
      coral[i].b = random(this.b-50,this.b+50);
      coral[i].r2 = random(this.r2-50,this.r2+50);
      coral[i].g2 = random(this.g2-50,this.g2+50);
      coral[i].b2 = random(this.b2-50,this.b2+50);
      coral[i].length = random(this.length-4,this.length+4);
      coral[i].angle = random(this.angle-PI/8,this.angle+PI/8);
      coral[i].strokeWidth = random(this.strokeWidth*0.7,this.strokeWidth*1.3);
      coral[i].strokeWidth2 = random(this.strokeWidth2*0.7,this.strokeWidth2*1.3);
      this.checkConstraints(this);
    }
  }

  this.render = () => {
    const l = this.generate(axiom,this.len,this.complexity,this.lendiff);
    push();
    this.renderL(l,this.length);
    pop();
  }

  this.renderL = (l,length) => {
    translate(this.x,this.y);
    stroke(this.r,this.g,this.b, 100);
    for (var i = 0; i < l.length; i++) {
      let current = l[i];
      if (current == "F"){
        strokeWeight(this.strokeWidth);
        line(0,0,0,-length);
        translate(0,-length);
      } else if (current == "X"){
        strokeWeight(this.strokeWidth2);
        stroke(this.r2,this.g2,this.b2,100);
        line(0,0,0,-length);
        translate(0,-length);
      } else if (current == "+"){
        rotate(this.angle);
      } else if (current == "-"){
        rotate(-this.angle);
      } else if (current == "["){
        push();
      } else if (current == "]"){
        pop();
      }
    }
  }

  this.generate = (sentence,len,times,lendiff) => {
    if (times > 0){
      let nextSentence = "";
      for (let i = 0; i < sentence.length; i++) {
        let current = sentence[i];
        let found = false;
        for (let j = 0; j < rules.length; j++) {
          if (current == rules[j].a){
            nextSentence += rules[j].b;
            found = true;
            break;
          }
        }
        if (!found){
          nextSentence += current;
        }
      }
      return this.generate(nextSentence,len*lendiff,times-1);
    }
    return sentence;
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
