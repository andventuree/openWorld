import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Banner, SearchBar, StatBar, RepoDetails } from '../components'
import { Container, Divider } from 'semantic-ui-react'
import { showComponents } from '../store'

class Home extends Component {
  render(){
    const { account, repos, show } = this.props
    return (
      <Container>
      <Divider hidden/>
        <Container textAlign='center'>
          <Banner />
        </Container>
        <SearchBar />
        { show && <StatBar account={account} /> }
        { show && <RepoDetails repos={repos} /> }
      </Container>
    )
  }
}

const mapState = state => {
  console.log('state: ', state);
  if (Object.keys(state.SearchBar).length > 0) {
    // this.props.doneLoading()
    return {
      account: state.SearchBar.account,
      repos: state.SearchBar.repos,
      show: state.SearchBar.show
    }
  } else {
    return {}
  }
}

const mapDispatch = dispatch => {
  return {
    doneLoading: function(){
      dispatch(showComponents())
    }
  }
}

export default connect(mapState, mapDispatch)(Home)

