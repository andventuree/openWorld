import React, { Component } from 'react'
import * as d3 from 'd3'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import D3Bubble from './D3Bubble'
import { Container, Segment } from 'semantic-ui-react'

class BubbleChart extends Component{
  constructor(props){
    super(props)
    //maybe refer to this.state as opposed to this.getChartState
    this.getChartState = this.getChartState.bind(this)
    this._setRef = this._setRef.bind(this)
  }

  componentDidMount(){ //create initial bubbles when you component is loaded
    const displayContainer = {width: 1100, height: 800 }
    D3Bubble.create(
      this._rootNode, //element d3 will initially select to
      displayContainer, //maybe can have pre-defined height but have variable width
      this.getChartState() //sending in data
    );
  }

  componentDidUpdate(){
    D3Bubble.update(this._rootNode, this.getChartState())
  }

  getChartState(){
    return {
      data: this.props.repos, //data from fetched repos
    }
  }

  componentWillUnmount(){
    D3Bubble.destroy(this._rootNode);
  }

  _setRef(componentNode){ //method is called when component is rendered
    this._rootNode = componentNode; //set up so you can use "this" keyword in other methods
  }

  render(){
    return (
      <Container>
        <Segment>
          <div id='bubble-chart-container' ref={this._setRef.bind(this)}></div>
        </Segment>
      </Container>
    )
  }
}

// BubbleChart.propTypes = {
//   data: PropTypes.array,
//   domain: PropTypes.object
// }

// const mapState = state => {
//   return {
//     acctDetails: state.acctDetails,
//     repoDetails: state.repoDetails
//   }
// }

export default connect()(BubbleChart)
