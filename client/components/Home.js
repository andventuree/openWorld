import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SearchBar, StatBar, RepoDetails } from '../components'
import { Container, Grid } from 'semantic-ui-react'

class Home extends Component {
  render(){
    console.log('this.props in Home component: ', this.props);
    const { acctDetails } = this.props
    return (
      <div>
        <SearchBar />
        { acctDetails && <StatBar acctDetails={acctDetails} /> }
        <div>This already shows in home page</div>
        { acctDetails && <RepoDetails acctDetails={acctDetails} /> }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    acctDetails: state.SearchBar.acctDetails
  }
}
export default connect(mapState)(Home);


// { acctDetails && <AccountDetails />}
// { repoDetails && <BubbleChart />}
// { repoDetails && <h1>repoDetails is available</h1> }

