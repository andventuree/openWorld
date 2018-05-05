import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Banner, SearchBar, StatBar, RepoDetails, BubbleChart } from '../components'
import { Container, Divider } from 'semantic-ui-react'

class Home extends Component {
  render(){
    const { account, repos, loaded } = this.props
    return (
      <Container>
        <Divider hidden/>
        <Container textAlign='center'>
          <Banner />
        </Container>
        <SearchBar />
        { loaded && <StatBar account={account} /> }
        { loaded && <BubbleChart repos={repos}/>}
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

// { loaded && <RepoDetails repos={repos} /> }
