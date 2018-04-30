import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SearchBar, StatBar, RepoDetails } from '../components'
import { Container, Grid } from 'semantic-ui-react'

class Home extends Component {
  render(){
    console.log('this.props in Home component: ', this.props);
    const { acctDetails, repoDetails } = this.props
    return (
      <div>
        <SearchBar />
        { acctDetails && <StatBar acctDetails={acctDetails} /> }
        { acctDetails && <RepoDetails repoDetails={repoDetails} /> }
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
export default connect(mapState)(Home)
