import React, {Component} from 'react'
import { connect } from 'react-redux'
import {SearchBar, StatBar, RepoDetails } from '../components'
import { Container, Grid } from 'semantic-ui-react'

class Home extends Component {
  render(){
    const {acctDetails, repoDetails} = this.props
    return (
      <div>
      {console.log('repoDetails: ', repoDetails)}
        <SearchBar />
        { acctDetails && <StatBar acctDetails={acctDetails} /> }
        { acctDetails && <RepoDetails /> }
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

