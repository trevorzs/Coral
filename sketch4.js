let coral = [];
let bubbles = [];

let axiom = "F";
let rules = [];
let sentence;

let isStroke = false;
let diff = 0;
let temp;
let colorSliderChanged = false;
let strucSliderChanged = false;
let clicked = false;
let textmin = 3;
let textchange = 0.5;
let textpos = 0;


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
  b: "F[+F]F[-F][F]"
}

let swidth = document.documentElement.clientWidth;
let sheight = document.documentElement.clientHeight;
let offset = swidth/3;
let spacing = swidth/22;
if (swidth/22 < 45){
  spacing = 45;
}
if (swidth < 600){
  offset = 30;
  spacing = 45;
}

let colorSlider, structureSlider;
let colVariance, strucVariance;



function setup() {
  let canvas = createCanvas(swidth, sheight);
  colorSlider = createSlider(0,1,0.1,0.01);
  colorSlider.changed(setColorVariance);
  structureSlider = createSlider(0,1,0.1,0.01);
  structureSlider.changed(setStrucVariance);
  colorSlider.position(20,20);
  colorSlider.style("display","none");
  structureSlider.position(20,50);
  structureSlider.style("display","none");
  canvas.parent('main');
  button = createButton("Regenerate Coral");
  button.mouseClicked(generate);
  button.id("regenerate");
  for (var i = 0; i < 15; i++) {
    bubbles.push(new Bubble());
  }
  for (var i = 1; i < 7; i++) {
    coral.push(new Coral(offset+i*spacing,sheight-100));
  }
}

function setColorVariance(){
  colorSliderChanged = true;
}

function setStrucVariance(){
  strucSliderChanged = true;
}

function generate(){
  clicked = false;
  colorSliderChanged = false;
  strucSliderChanged = false;
  colorSlider.value(0.1);
  structureSlider.value(0.1);
  coral = [];
  for (var i = 1; i < 7; i++) {
    coral.push(new Coral(offset+i*spacing,sheight-100));
  }
}

function resize(){
  swidth = document.documentElement.clientWidth;
  sheight = document.documentElement.clientHeight;
  resizeCanvas(swidth,sheight);
  offset = swidth/3;
  spacing = swidth/22;
  if (swidth/22 < 45){
    spacing = 45;
  }
  if (swidth < 600){
    offset = 30;
    spacing = 45;
  }

  for (var i = 0; i < coral.length; i++) {
    coral[i].x = offset+i*spacing + swidth/21;
    coral[i].y = sheight-100;
  }
}

function draw() {
  window.addEventListener('resize',resize, false);
  window.addEventListener('orientationchange',resize,false);
  background(50, 89, 100);
  button.position(swidth-200,80);
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
  if (clicked){
    colorSlider.style("display","block");
    structureSlider.style("display","block");
    push();
    textSize(12);
    text(`Color Mutation Rate: ${colorSlider.value()}`, colorSlider.x * 2 + colorSlider.width, 30);
    text(`Structural Mutation Rate: ${structureSlider.value()}`, structureSlider.x * 2 + structureSlider.width, 70);
    pop();
  }else{
    colorSlider.style("display","none");
    structureSlider.style("display","none");
    push();
    translate(-63,-50);
    textSize(12);
    if (textpos > textmin || textpos < -textmin){
      textchange = -textchange;
    }
    textpos += textchange;
    text("Click to Evolve Coral",swidth/2,sheight/2);
    text("↓",swidth/2 + 122,sheight/2 + textpos);
    text("↓",swidth/2 -20,sheight/2 + textpos);
    pop();
  }
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

function touchEnded() {
  if (!modalUp){
    for (var i = 0; i < coral.length; i++) {
      if (mouseX < coral[i].x+coral[i].width/2 && mouseX > coral[i].x-coral[i].width/2){
        if (mouseY < coral[i].y && mouseY > coral[i].y - coral[i].height){
          coral[i].clicked();
          coral[i].render();
          isStroke = false;
        }
      }else if (touches.length > 0 && touches[0].x < coral[i].x+coral[i].width/2 && touches[0].x > coral[i].x-coral[i].width/2){
        if (touches[0].y < coral[i].y && touches[0].y > coral[i].y - coral[i].height){
          coral[i].clicked();
          coral[i].render();
          isStroke = false;
        }
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
  this.lendiff = random(0.1,0.9);
  this.complexity=random([2,3]);
  this.curvature = random(-20,20);
  this.sturdiness = 0.002;
  this.flex = 0.0002;
  this.diff = random(-0.001,0.001);
  this.structuralVariance = random(0.02,0.25);
  this.colorVariance = random(0.02,0.2);
  this.colorVariation = random(5,40);

  this.generate = (sentence,times) => {
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
      return this.generate(nextSentence,times-1);
    }
    return sentence;
  }

  this.l = this.generate(axiom,this.complexity);
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
      coral.length = coral.minlength;
    }
    if (coral.angle < -PI/6){
      coral.angle = -PI/6;
    }
    if (coral.angle > PI/6){
      coral.angle = PI/6;
    }

    if (coral.angle < 0.1 && coral.angle > -0.1){
      coral.angle = random([0.1,-0.1]);
    }
    if (coral.colorVariance > 0.3){
      coral.colorVariance = random(0.27,0.3);
    }
    if (coral.structuralVariance > 0.4){
      coral.structuralVariance = random(0.36,0.4);
    }

    if (coral.r < 0){
      coral.r = random(0,10);
    }
    if (coral.r > 255){
      coral.r = random(245,255);
    }
    if (coral.g < 0){
      coral.g = random(0,10);
    }
    if (coral.g > 255){
      coral.g = random(245,255);
    }
    if (coral.b < 0){
      coral.b = random(0,10);
    }
    if (coral.b > 255){
      coral.b = random(245,255);
    }
    if (coral.r2 < 0){
      coral.r2 = random(0,10);
    }
    if (coral.r2 > 255){
      coral.r2 = random(245,255);
    }
    if (coral.g2 < 0){
      coral.g2 = random(0,10);
    }
    if (coral.g2 > 255){
      coral.g2 = random(245,255);
    }
    if (coral.b2 < 0){
      coral.b2 = random(0,10);
    }
    if (coral.b2 > 255){
      coral.b2 = random(245,255);
    }
  }

  this.clicked = () => {
    clicked = true;
    if (colorSliderChanged){
      colVariance = colorSlider.value();
    }else{

      colorSlider.value(parseFloat((this.colorVariance + random(-0.02,0.02)).toFixed(2)));
      colVariance = this.colorVariance;
    }

    if (strucSliderChanged){
      strucVariance = structureSlider.value();
    }else{
      structureSlider.value(parseFloat((this.structuralVariance + random(-0.02,0.02)).toFixed(2)));
      strucVariance = this.structuralVariance;
    }
    for (var i = 0; i < coral.length; i++) {
      let difference = this.colorVariation;
      let roll = random(1);
      if (roll < colVariance){
        difference = 100;
      }
      coral[i].r = random(this.r-difference,this.r+difference);
      coral[i].g = random(this.g-difference,this.g+difference);
      coral[i].b = random(this.b-difference,this.b+difference);
      coral[i].r2 = random(this.r2-difference,this.r2+difference);
      coral[i].g2 = random(this.g2-difference,this.g2+difference);
      coral[i].b2 = random(this.b2-difference,this.b2+difference);
      coral[i].angle = random(this.angle-PI/32,this.angle+PI/32);
      coral[i].curvature = random(this.curvature-2,this.curvature+2);
      coral[i].colorVariance = colorSlider.value();
      coral[i].structuralVariance = structureSlider.value();

      roll = random(1);
      if (roll > strucVariance){
        coral[i].l = this.l;
        coral[i].length = random(this.length-0.5,this.length+0.5);
        coral[i].wid = random(this.wid-1,this.wid+1);
      }else{
        if (this.length > 16){
          coral[i].length = random(this.length-1.5,this.length+1.5);
        }else{
          coral[i].length = random(this.length-4,this.length+4);
        }
        if (this.wid > 16){
          coral[i].wid = random(this.wid-1.5,this.wid+1.5);
        }else{
          coral[i].wid = random(this.wid-4,this.wid+4);
        }
        coral[i].generate = (sentence,times) => {
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
            return this.generate(nextSentence,times-1);
          }
          return sentence;
        }
        coral[i].l = coral[i].generate(axiom,3);
      }
      // coral[i].strokeWidth = random(this.strokeWidth*0.7,this.strokeWidth*1.3);
      // coral[i].strokeWidth2 = random(this.strokeWidth2*0.7,this.strokeWidth2*1.3);
      coral[i].checkConstraints(coral[i],this);
    }
  }

  this.render = () => {
    this.l.slice(0,-1);
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
  this.x = random(swidth);
  this.y = random(sheight);
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
    this.y = sheight+this.diameter;
    this.x = random(swidth);
    this.diameter = random(5,20);
  }

  this.render = () => {
    ellipse(this.x,this.y,this.diameter/2,this.diameter/2);
  }
}
