import React, {Component} from 'react'
import { connect } from 'react-redux'
import {SearchBar, AccountDetails} from '../components'

class Home extends Component {
  render(){
    const {acctDetails, repoDetails} = this.props
    return (
      <div>
        <SearchBar />
        { acctDetails && <AccountDetails />}
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

