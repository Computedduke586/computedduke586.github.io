const xSize = 1475;
const ySize = 689;
const inputSize = 125;
const backgroundColour = 220;
let yIndex = inputSize;
let palette = [255, 0];
let colour = [];
let nextColour = [];
let startingColour = [];
let initiated = false;

let slider;
let button0;
let button1;
let button2;
let input0;
let checkbox;

function setup() {  
  createCanvas(xSize, ySize);
  background(color(backgroundColour));
  
  textSize(12);
  textFont('Verdana');
  
  
  button0 = createButton("Generate");
  button0.position(15, 85);
  button0.mousePressed(() => {
      fill(backgroundColour);
      rect(0, inputSize, xSize, ySize);
      
      if(colour.length < 1){
        Randomize();
      }
      colour = startingColour.slice();
      
      initiated  = true;
      yIndex = inputSize;
      
      button0.attribute('disabled', '')
  });
  

  text("Density", 20, 67);
  slider = createSlider(0, 1, 0.5, 0.05);
  slider.position(15, 40);
  slider.size(80);
  slider.input(() => {
    Randomize();
    palette[1] = slider.value();
    let rule = parseInt(input0.value());
    if(!isNaN(rule) && rule >= 0 && rule <= 255) initiated = false;
  });
  
  button1 = createButton("Randomize");
  button1.position(105, 40);
  button1.mousePressed(() => {
    Randomize();
    initiated = false;
  });
  
  button2 = createButton("Stop");
  button2.position(90, 85);
  button2.mousePressed(() => initiated = false);
  
  text("Rule (0 - 255)", 200, 75);  
  input0 = createInput("0");
  input0.position(198, 40);
  input0.input(() => initiated = false);
  
  text("Loop", 155, 110);
  checkbox = createCheckbox();
  checkbox.position(135, 86);
}

function draw() { 
  fill(backgroundColour);
  noStroke();
  rect(20, 10, 50, 23);
  fill(0);
  text(slider.value(), 20, 30);
  
  loadPixels();
  
  if(initiated){
    button2.removeAttribute('disabled');
      
    let xPos = 0;

    strokeWeight(1.01);
    for(let i = 0; i < xSize; i++){
      set(xPos, yIndex, palette[colour[i]]); 
      xPos += 1;
    }
    
    let rule = parseInt(input0.value());
    if(!isNaN(rule) && rule >= 0 && rule <= 255){
      rule = rule.toString(2).padStart(8, 0).split('').map(Number);
      NumberingSystem(...rule);
    }
    else
      Randomize();

    yIndex++;
  }
  else{
    button0.removeAttribute('disabled');
    button2.attribute('disabled', '')
  }
  
  if(yIndex >= ySize){
    if(checkbox.checked()){
      yIndex = inputSize;
    }
    else
      initiated = false;
  }
 
  
  updatePixels();
  frameRate(60);
}

function Randomize(){ 
  colour = [];
  for(let i = 0; i < xSize; i++){
    let value = random(0, 1);
    value = value < slider.value() ? 1 : 0;

    colour.push(value);
  }
  startingColour = colour.slice();
}

function NumberingSystem(int1, int2, int3, int4, int5, int6, int7, int8){
  let nextColour = [];
  for(let i = 0; i < xSize; i++){
    let previous = (i - 1 + xSize) % xSize;
    let next = (i + 1) % xSize;
        
    if(colour[previous] == 1 && colour[i] == 1 && colour[next] == 1){
      nextColour.push(int1);
    }
    else if(colour[previous] == 1 && colour[i] == 1 && colour[next] == 0){
      nextColour.push(int2);
    }
    else if(colour[previous] == 1 && colour[i] == 0 && colour[next] == 1){
      nextColour.push(int3);
    }
    else if(colour[previous] == 1 && colour[i] == 0 && colour[next] == 0){
      nextColour.push(int4);
    }
    else if(colour[previous] == 0 && colour[i] == 1 && colour[next] == 1){
      nextColour.push(int5);
    }
    else if(colour[previous] == 0 && colour[i] == 1 && colour[next] == 0){
      nextColour.push(int6);
    }
    else if(colour[previous] == 0 && colour[i] == 0 && colour[next] == 1){
      nextColour.push(int7);
    }
    else if(colour[previous] == 0 && colour[i] == 0 && colour[next] == 0){
      nextColour.push(int8);
    }
    else{
      nextColour.push(0);
      console.log("Value Invalid! Value: ", colour[i]);
    }
  }
  colour = nextColour.slice();  

}
