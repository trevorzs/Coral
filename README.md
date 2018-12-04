## Background
#### Generative Art
Generative Art refers to art that is created partly by an autonomous system. It can refer to art being primarily driven by complex algorithms or a mixture of machine and user input. This web app is an interactive visualization of generative coral.

#### Coral
In this web app, Corals are generated using a stochastic Lindenmayer System(l-system). Each coral then stores different properties as a virtual "genotype". Clicking on a coral will cause a new set of coral to be generated, based on the "genetics" of the coral that was clicked. This allows for dynamic evolution of the coral guided by user input.

For more info on l-systems and how I implemented them in this app, scroll to the bottom of this readme.

## Functionality and MVP
Click on a button to reset and reseed initial coral with randomized properties

Click on a coral to generate a new set of coral based on clicked coral's "genetics"

Sliders allow users to alter genetic change from one generation to the next

Touchscreen mobile web browser compatibility (play on your phone's browser!)

## Screenshots

Randomly Generated Coral on Macbook Pro:
![Desktop](readme_images/screenshot1.png)

Coral on iPhone Chrome Browser:
![iPhone](readme_images/screenshot2.jpg)

Coral on iPhone landscape mode:
![iPhone landscape](readme_images/screenshot3.jpg)

## Stochastic Lindenmayer System
Lindenmayer Systems, better known as l-systems, are a popular type of formal grammar in algorithmic botany. They are useful in imitating different structures of plants based on the provided rules and axioms.

On each iteration, the previous string (beginning with the axiom) will be read through, applying a rule for each letter in the previous string. Since this process is exponential, each Coral only iterates 2-3 times for processing efficiency.

For this web app, I have created three rules to apply to a single axiom, "F". When generating the string to be interpreted, the algorithm may choose between the three rules with equal probability (thus making it stochastic). This creates a larger variation in shape and structure of the coral.

##### Axiom: "F"

##### Rules:

a: "F",
b: "+[+FF]-[-F+F+F]F"

a: "F",
b: "+[+F-F-F]F-[-F+F+F]-FF"

a: "F",
b: "F[+F]F[-F][F]"

##### Example Generated String:

1st iteration:
"F" -> "+[+FF]-[-F+F+F]F"

3rd iteration:

 "+[++[+FF]-[-F+F+F]F[+F[+F]F[-F][F]]F[+F]F[-F][F][-F[+F]F[-F][F]][F[+F]F[-F][F]]-+[+F-F-F]F-[-F+F+F]-FF[++[+F-F-F]F-[-F+F+F]-FF]+[+F-F-F]F-[-F+F+F]-FF[-F[+F]F[-F][F]][+[+F-F-F]F-[-F+F+F]-FF]-+[+F-F-F]F-[-F+F+F]-FF[++[+F-F-F]F-[-F+F+F]-FF]F[+F]F[-F][F][-+[+F-F-F]F-[-F+F+F]-FF][+[+FF]-[-F+F+F]F]]+[++[+FF]-[-F+F+F]F+[+FF]-[-F+F+F]F]-[-F[+F]F[-F][F]++[+FF]-[-F+F+F]F++[+FF]-[-F+F+F]F]F[+F]F[-F][F]-[-+[+F-F-F]F-[-F+F+F]-FF[+F[+F]F[-F][F]]+[+FF]-[-F+F+F]F[-+[+FF]-[-F+F+F]F][+[+FF]-[-F+F+F]F]++[++[+F-F-F]F-[-F+F+F]-FF-+[+F-F-F]F-[-F+F+F]-FF-F[+F]F[-F][F]]+[+FF]-[-F+F+F]F-[-+[+F-F-F]F-[-F+F+F]-FF++[+FF]-[-F+F+F]F++[+FF]-[-F+F+F]F]-F[+F]F[-F][F]+[+FF]-[-F+F+F]F++[++[+F-F-F]F-[-F+F+F]-FF-+[+F-F-F]F-[-F+F+F]-FF-+[+F-F-F]F-[-F+F+F]-FF]+[+F-F-F]F-[-F+F+F]-FF-[-+[+FF]-[-F+F+F]F+F[+F]F[-F][F]++[+F-F-F]F-[-F+F+F]-FF]-F[+F]F[-F][F]F[+F]F[-F][F]]-+[+F[+F]F[-F][F]+[+F-F-F]F-[-F+F+F]-FF]-[-+[+F-F-F]F-[-F+F+F]-FF++[+FF]-[-F+F+F]F++[+FF]-[-F+F+F]F]+[+F-F-F]F-[-F+F+F]-FF+[++[+F-F-F]F-[-F+F+F]-FFF[+F]F[-F][F]]-[-F[+F]F[-F][F]++[+F-F-F]F-[-F+F+F]-FF++[+F-F-F]F-[-F+F+F]-FF]+[+F-F-F]F-[-F+F+F]-FF"

This resulting string is then iterated over. For each character in the string, a different thing will be rendered. F will render the coral's base shape. +/- will apply a rotate transformation based on the coral's angle gene. And "[" / "]" will push/pop the transformation slate, allowing branches to branch off without dramatically altering future transformations.

## Todo
There is extreme variation in types of coral found in nature. The algorithm I am using could always be tweaked to account for more types and produce more realistic coral upon evolution. Base shapes right now are rectangles. Variation of base shape may help render more realistic coral but may require more processing power.
