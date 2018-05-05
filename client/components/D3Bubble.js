// domain: {x: [0, 30], y: [0, 100]}

import * as d3 from 'd3'
const D3Bubble = {}

// Mapped to life cycle events
D3Bubble.create = function(el, props, state ){
  let svg = d3.select(el) //should be this._rootNode === #bubble-chart-container
    .append('svg') //creates an svg tag that will hold our chart
    .attr('class', 'd3') //give the svg a d3 className
    .attr('width', props.width)
    .attr('height', props.height)

  svg.append('g') //group tag
    .attr('class', 'd3-bubbles') //gives it a className
    // .attr('transform', 'translate(0,0)')

  //html looks like el -> svg (.d3-bubbles) -> g -> bubbles
  // "this" error -> try to instantiate a new class
  // this.update(el, state); //state.repos

  // ------------- bubbles have not been appended on after enter()--------------
  //going to try to render something without using special scaling things
  let g = d3.select(el).selectAll('.d3-bubbles') //selects the group (g) of bubbles

  let bubble = g.selectAll('.d3-bubble') //this selects all the bubbles
    .data(state.data, function(d){ return d.name }) //each bubble will show name

  // Enter
  bubble.enter() //there are no bubbles initially but there will be
    .append('circle') //creating the circles which are bubbles
    .attr('class', 'd3-bubble') //className for each bubble
    .attr('cx', function(){return Math.random(800) * 800}) //placement in html tag
    .attr('cy', function(){return Math.random(800) * 800})
    .attr('r', 5) //size of each bubble
    .style('fill', 'black') //gives it color
    // Enter & Update //used to add properties that define shape of bubble

  // Exit
  bubble.exit()
  .remove();
}

// adds the bubbles after enter()
D3Bubble.update = function(el, state){
  // Re-compute the scales, and render the data bubbles
  let scales = this._scales(el, state.domain) //creates the scaling, //took out 2nd arg , state.domain
  this._drawBubbles(el, scales, state.data) //drawBubbles adds the attributes
}

D3Bubble._drawBubbles = function(el, scales, data){
  let g = d3.select(el).selectAll('.d3-bubbles') //selects the group (g) of bubbles

  let bubble = g.selectAll('.d3-bubble') //this selects all the bubbles
    .data(data, function(d){ return d.name }) //each bubble will show name

  // Enter
  bubble.enter() //there are no bubbles initially but there will be
    .append('circle') //creating the circles which are bubbles
    .attr('class', 'd3-bubble') //className for each bubble
    .style('color', 'black') //gives it color

  // Enter & Update //used to add properties that define shape of bubble
  bubble.attr('cx', 50) //placement in html tag
    .attr('cy', 50)
    .attr('r', 5) //size of each bubble

    // bubble.attr('cx', function(d) { return scales.x(d.x) }) //???
    // .attr('cy', function(d) { return scales.y(d.y) })
    // .attr('r', function(d) { return scales.z(d.z)}) //size of each bubble

  // Exit
  bubble.exit()
    .remove();
}

D3Bubble._scales = function(el, domain) {
  if (!domain) {
    return null; //basically, scale dimensions not specified so no scale at all
  }

  var scaleRadius = d3.scaleLinear()
      .domain([
        d3.min(data, function(d) { return d.watchers; }), //if its not already a number, convert it!!!
        d3.max(data, function(d) { return d.watchers; })
      ])
      .range([5,18]);


  var width = el.offsetWidth; //.offsetWidth read-only property returns the layout width of an element
  var height = el.offsetHeight;

  var x = d3.scaleLinear()
    .range([0, width])
    .domain(domain.x);

  var y = d3.scaleLinear()
    .range([height, 0])
    .domain(domain.y);

  var z = d3.scaleLinear()
    .range([5, 20]) //min and max output values of the scale
    .domain([1, 10]); //min and max values of input data

  return {
    x: x, //x position (how far right)
    y: y, //y position (how far down from the top)
    z: z //radius (size of each circle/bubble)
  }
}

D3Bubble.destroy = function(el){
  // Cleans up if necessary, like resetting values //whats the method we need here?
}

export default D3Bubble;
