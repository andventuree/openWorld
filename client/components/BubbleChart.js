import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import { Container, Segment } from 'semantic-ui-react'

class BubbleChart extends Component{
  componentDidMount(){
    // d3.select("#bubble-chart-container")

    var svgContainer = d3.select("#bubble-chart-container").append("svg")
    .attr("width", 100)
    .attr("height", 100)
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
      <Container>
        <Segment>
          <div id='bubble-chart-container'></div>
        </Segment>
      </Container>
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
