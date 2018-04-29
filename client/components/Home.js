import React, {Component} from 'react'
import { connect } from 'react-redux'
import {SearchBar, AccountDetails, BubbleChart, StatBar } from '../components'

class Home extends Component {
  render(){
    const {acctDetails, repoDetails} = this.props
    return (
      <div>
        <div>
          <SearchBar />
          { acctDetails && <StatBar acctDetails={acctDetails} /> }
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    acctDetails: state.SearchBar.acctDetails,
    repoDetails: state.SearchBar.repoDetails
  }
}
export default connect(mapState)(Home);


// { acctDetails && <AccountDetails />}
// { repoDetails && <BubbleChart />}
