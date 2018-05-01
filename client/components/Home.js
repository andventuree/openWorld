import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Banner, SearchBar, StatBar, RepoDetails } from '../components'
import { Container, Divider } from 'semantic-ui-react'

class Home extends Component {
  render(){
    const { acctDetails, repoDetails } = this.props
    return (
      <Container>
      <Divider hidden/>
        <Container textAlign='center'>
          <Banner />
        </Container>
        <SearchBar />
        { acctDetails && <StatBar acctDetails={acctDetails} /> }
        { acctDetails && <RepoDetails repoDetails={repoDetails} /> }
      </Container>
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
