import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Banner, SearchBar, StatBar, RepoDetails } from '../components'
import { Container, Divider } from 'semantic-ui-react'

class Home extends Component {
  render(){
    console.log('this.props: ', this.props);
    const { account, repos, loaded } = this.props
    return (
      <Container>
        <Divider hidden/>
        <Container textAlign='center'>
          <Banner />
        </Container>
        <SearchBar />
        { loaded && <StatBar account={account} /> }
        { loaded && <RepoDetails repos={repos} /> }
      </Container>
    )
  }
}

const mapState = state => {
  return {
    account: state.SearchBar.account,
    repos: state.SearchBar.repos,
    loaded: state.loaded
  }
}

export default connect(mapState)(Home)

