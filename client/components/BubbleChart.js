import React, { Component } from 'react'
import { connect } from 'react-redux'

class BubbleChart extends Component{
  render(){
    return (
      <div id='bubble-chart-container'></div>
    )
  }
}

const mapState = state => {
  return {
    acctDetails: state.acctDetails,
    repoDetails: state.repoDetails
  }
}

export default connect(mapState)(BubbleChart)
