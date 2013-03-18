This is the README for d3-area-proportional-simple-venn

This is a plugin for d3.js JavaScript library. This plugin helps you create simple Venn/Euler diagrams that have only 2 circles. 

This plugin is designed to be as simple as possible to facilitate its ease of use amongst programmers and non-programmers alike. While there are obvious refinements, my goal is to keep the source code simple enough for someone without a JavaScript background to be able to read and understand (and ultimately extend) it.

What? Why?
There are many times where you know a given population of 2 sets as well as the overlap (commonality) between them and want a visual of it. That's where areaPorportionalSimpleVenn comes in. You could do brush up on your college math and derive equations to solve for the distance in between the 2 circles but then you'd realize that it's easier to just have the computer repeatedly calculate the area between the circles until it comes up with an answer that is very close to your own area (overlap).

2 circles are easy. More than 2 circles requires a PhD in Math which I do not posess.

To help us solve this problem, we're taking the information and graphing it on graph paper with circles that are at most 2 units high/wide. 

So you basically say that each population represents the area of a circle. The population overlap represents the area of overlap of the circles. It's not so simple to determine what the center's of both circles should be but it is simple to say that the correct answer for the distance between the 2 circles (disks?) lies somewhere at 0,0 (both circles are on top of one another) or the sum of both circles' radii which means they are barely not touching at all and look like 2 circles next to each other. 

Because of some of the math dealing with circles, some numbers aren't allowed to be greater than 1 so what the plugin does is before it starts the math it scales everything down. Then it does the math and find which distance works, then it scales everything back up so that it fits comfortably in the div you specified.

This means you think in terms of your own units. For example if we went into a 2 coffee shop and asked everyone if they own a cat we'd maybe have the following:

 people in the coffee shop A is 40. Those who own a cat = 25
 people in the coffee shop B is 60. Those who own cat = 25

Say we want to draw a diagram representing this. 

The total population in A is 40, the population of B is 60. The population of A that share something in common with B is 25.So if the circles represented the area of the total population of each, circle A would be slightly smaller than circle B. The question is, how much do they overlap? Because one circle is a different size than the other it's not so simple. We do know the overlap amount should = 25.

Armed with this knowledge, we can plug in 40, 60, 25 into areaPorportionalSimpleVenn and get a good visual. Note that if you multiplied all numbers by the same factor (say 1000 if you asked in supermarket-goers or 1/5 if you asked people in a small coffee shop), the diagram would look identical.


Usage
1. source the d3 library (either download it locally or use an existing copy as shown in the example)
2. download and source this plugin
3. after the DOM is finished loading, tell this plugin to draw a diagram

You may optionally use AJAX techniques to call this plugin repeatedly and it will first remove the existing graphic and then draw a new one.

You supply the size of each circle and the amount of overlap and the hex color of each circle and it will output a SVG in your div that has a class of .venn-diagram.

Example
<!doctype html>
<html>
<!--source d3 first-->
<script src=''></script>
<script src='d3.areaProportionalVenn.js'></script>
<body>
<div class='venn-diagram' style='height:170px;width:320px;border 1px solid red;'>
</div>
<script>
window.onload=function(){
d3.areaPorportionalVennDiagram('#555', '#336699', 5000, 2500, 1000);
}
</script>
</body>
<html>

Credit for the math should be given to Scott Marley's response on http://math.stackexchange.com/questions/97850/get-the-size-of-an-area-defined-by-2-overlapping-circles as I used it wholesale after doing some tests in Ruby.
