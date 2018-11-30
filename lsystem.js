let axiom = "F";
let sentence = axiom;
let button;
let rules = [];
let len = 100;
rules[0] = {
  a: "F",
  b: "FF+[+F+F-F]-[-F+F+F]"
}

function generate() {
  len*=0.5;
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
  sentence = nextSentence;
  createP(sentence);
  turtle();
}

function turtle() {
  background(51);
  resetMatrix();
  translate(width/2,height);
  stroke(255, 100);
  for (var i = 0; i < sentence.length; i++) {
    let current = sentence[i];
    if (current == "F"){
      line(0,0,0,-len);
      translate(0,-len);
    } else if (current == "+"){
      rotate(PI/6);
    } else if (current == "-"){
      rotate(-PI/6);
    } else if (current == "["){
      push();
    } else if (current == "]"){
      pop();
    }
  }
}

function setup() {
  createCanvas(400, 400);
  background(51);
  createP(axiom);
  turtle();
  button = createButton("generate");
  button.mouseClicked(generate);
}

function draw() {

}
