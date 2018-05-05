import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'

class BubbleChart extends Component{
  componentDidMount(){
    // d3.select("#bubble-chart-container")

    var svgContainer = d3.select("#bubble-chart-container").append("svg")
    .attr("width", 600)
    .attr("height", 800)
    .style("border", "1px solid black");

    var circles = svgContainer.selectAll("circle")
    .data(this.props.repos)
    .enter()
    .append("circle")

    var circleAttributes = circles
    .attr("cx", function(){return Math.random(800) * 800})
    .attr("cy", function(){return Math.random(800) * 800})
    .attr("r", 5)
    .style("fill", "green");
  }

  render(){
    return (
      <div id='bubble-chart-container'></div>
    )
  }
}

const mapState = state => {
  return {
    // acctDetails: state.acctDetails,
    // repoDetails: state.repoDetails
  }
}

export default connect()(BubbleChart)
