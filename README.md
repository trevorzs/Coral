## Background
#### Generative Art
Generative Art refers to art that is created partly by an autonomous system. It can refer to art being primarily driven by complex algorithms or a mixture of machine and user input. This web app is an interactive visualization of generative coral.

#### Coral
In this web app, Corals are generated using a stochastic Lindenmayer System(l-system). Each coral then stores different properties as a virtual "genotype". Clicking on a coral will cause a new set of coral to be generated, based on the "genetics" of the coral that was clicked. This allows for dynamic evolution of the coral guided by user input.

#### Stochastic Lindenmayer System
Lindenmayer Systems, better known as l-systems, are a popular type of formal grammar in algorithmic botany. They are useful in imitating different structures of plants based on the provided rules and axioms. For this web app, I have created three rules to apply to a single axiom. When generating the string to be interpreted, the algorithm may choose between the three rules with equal probability (thus making it stochastic). This creates a larger variation in shape and structure of the coral.

Rules:

a: "F",
b: "+[+FF]-[-F+F+F]F"

a: "F",
b: "+[+F-F-F]F-[-F+F+F]-FF"

a: "F",
b: "F[+F]F[-F][F]"

## Functionality and MVP
Click on a button to reset and reseed initial coral with randomized properties

Click on a coral to generate a new set of coral based on clicked coral's "genetics"

Sliders allow users to alter genetic change from one generation to the next

## Todo
There is extreme variation in types of coral found in nature. The algorithm I am using could always be tweaked to account for more types and produce more realistic coral upon evolution. Base shapes right now are rectangles. Variation of base shape may help render more realistic coral but may require more processing power.

## Wireframes
This app will consist of a single screen with a simple canvas. The canvas will have a reset button, and contain a series of 8 coral that can be clicked on. Additionally, there will be a button linking to my Github.

## Architecture and Technologies
p5.js for rendering generative designs
Stochastic Lindenmayer System for generation of fractal coral

## Implementation Timeline
Day 1:
Learn enough p5.js to generate simple designs

Day 2:
Implement generation of initial seed coral, designate "phenotypes" and "genotypes"

Day 3:
Implement generation of new generations of coral

Day 4:
User interactivity and decoration of canvas (sea theme)
