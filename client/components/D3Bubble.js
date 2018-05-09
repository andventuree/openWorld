import * as d3 from 'd3'
const D3Bubble = {}

// Mapped to life cycle events
D3Bubble.create = function(el, displayContainer, state ){
  let svg = d3.select(el) //should be this._rootNode === #bubble-chart-container
    .append('svg') //creates an svg tag that will hold our chart
    .attr('class', 'd3') //give the svg a d3 className
    .attr('width', displayContainer.width)
    .attr('height', displayContainer.height)
    // .attr("font-family", "sans-serif")
    // .attr("font-size", "20px")
    // .attr("text-anchor", 'middle')

  svg.append('g') //group tag
    .attr('class', 'd3-bubbles') //gives it a className
    .attr('transform', 'translate(0,0)') // define a new coordinate system for a set of SVG elements by applying a transformation to each coordinate specified in this set of SVG elements <g transform="translate(0,0)">

  //html looks like el -> svg (.d3-bubbles) -> g -> bubbles
  this.update(el, displayContainer, state); //state.repos
}

// adds the bubbles after enter()
D3Bubble.update = function(el, displayContainer, state){
  // Re-compute the scales, and render the data bubbles
  let scales = this._scales(el, displayContainer, state) //creates the scaling, //took out 2nd arg , state.domain
  // state.data.sort(function (a, b) { return b.value - a.value; }); // sort them to prevent occlusion of smaller nodes.
  this._drawBubbles(el, scales, state.data, displayContainer) //drawBubbles adds the attributes
}

D3Bubble._drawBubbles = function(el, scales, data, displayContainer ){
  let g = d3.select(el).selectAll('.d3-bubbles') //selects the group (g) of bubbles
  let color = d3.scaleOrdinal(d3.schemeSet2)
  let bubble = g.selectAll('.d3-bubble') //this selects all the bubbles
    .data(data, function(d){ return d.name }) //each bubble will show name

  // Enter
  bubble.enter() //there are no bubbles initially but there will be
    .append('circle') //creating the circles which are bubbles
    .attr('class', 'd3-bubble') //className for each bubble
    .style('fill', function(d){return color(d.watchers)})

    // Enter & Update //used to add properties that define shape of bubble
    .attr('cx', function(){return Math.random() * Number(displayContainer.width)})
    .attr('cy', function(){return Math.random() * Number(displayContainer.height)})
    .attr('r',  function(d){return scales.rConverter(d.watchers)}) //size of each bubble
    .text(function(d){return d.name})

  // let tooltip = bubble.append('div')
  // .attr('class', 'tooltip')
  // .style('display', null)

  // tooltip.append('text')
  // .attr('x', 15)
  // .attr('y', 15)
  // .style('font-size', '1.25em')
  // .attr('font-weight', 'bold')

  bubble.append()
    .on('mouseover', function(d){
      console.log(d.name);
      // d3.select('tooltip')
      // .style('display', null)
    })
    .on('mouseout', function(){
      // d3.select('tooltip')
      // .style('display', 'none')
    })
    .on('mousemove', function(d){
      // let xPos = d3.mouse(this)[0] - 15;
      // let yPos = d3.mouse(this)[1] - 55;
      // d3.select('tooltip')
      // .attr('transform', `translate("${xPos}","${yPos}")`)
      // .select('text')
      // .text(d.name)
    })

  // Exit
  bubble.exit()
    .remove();
}

D3Bubble._scales = function(el, displayContainer, state) { //what was the og solution using el for???
  const xDomain = d3.max(state.data, function(d) {
    return d.watchers;
  })

  let rConverter = d3.scaleSqrt() //radius
  .domain([0, xDomain]) // consider using d3.max() //maybe you should cut out the bottom
  .range([0, 50]) //should be dynamic width

  return {
    rConverter: rConverter //radius (size of each circle/bubble)
  }
}

D3Bubble.destroy = function(el){
  // Cleans up if necessary, like resetting values //whats the method we need here?
}


export default D3Bubble;

  // this is to help with spacing
  // var width = el.offsetWidth; //.offsetWidth read-only property returns the layout width of an element
  // console.log('el.offsetWidth: ', el.offsetWidth);
  // var height = el.offsetHeight;
  // console.log('el.offsetHeight: ', el.offsetHeight);


  // var scaleRadius = d3.scaleLinear()
  // // take the min and max of some property from data and reduce it down to 1-50 scale
  //     .domain([
  //       d3.min(state.data, function(d) { return d.watchers; }), //if its not already a number, convert it!!!
  //       d3.max(state.data, function(d) { return d.watchers; })
  //     ])
  //     .range([1, 50]);


  //   // Used when setting up force and
//   // moving around nodes
// let damper = 0.102;

//   // Charge function that is called for each node. Charge is proportional to the diameter of the
//   // circle (which is stored in the radius attribute of the circle's associated data.
//   // This is done to allow for accurate collision detection with nodes of different sizes.
//   // Charge is negative because we want nodes to repel.
//   // Dividing by 8 scales down the charge to be appropriate for the visualization dimensions.
//   function charge(d) {
//     return -Math.pow(d.radius, 2.0) / 8;
//   }
//   // Here we create a force layout and configure it to use the charge function
//   // from above. This also sets some contants to specify how the force layout should behave.
//   let force = d3.layout.force()
//     .size([800, 800])
//     .charge(charge)
//     .gravity(-0.01)
//     .friction(0.9);

// nodes = createNodes(rawData);
// // Set the force's nodes to our newly created nodes array.
// force.nodes(nodes);

  //  // Sets visualization in "single group mode". The year labels are hidden and the force layout
  //  // tick function is set to move all nodes to the center of the visualization.
  // function groupBubbles() {
  //   hideYears();

  //   force.on('tick', function (e) {
  //     bubbles.each(moveToCenter(e.alpha))
  //       .attr('cx', function (d) { return d.x; })
  //       .attr('cy', function (d) { return d.y; });
  //   });

  //   force.start();
  // }

  //   /*
  //  * Helper function for "single group mode". Returns a function that takes the data for a
  //  * single node and adjusts the position values of that node to move it toward the center of
  //  * the visualization.
  //  *
  //  * Positioning is adjusted by the force layout's alpha parameter which gets smaller and smaller as
  //  * the force layout runs. This makes the impact of this moving get reduced as each node gets closer to
  //  * its destination, and so allows other forces like the node's charge force to also impact final location.
  //  */
  // function moveToCenter(alpha) {
  //   return function (d) {
  //     d.x = d.x + (center.x - d.x) * damper * alpha;
  //     d.y = d.y + (center.y - d.y) * damper * alpha;
  //   };
  // }
