import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRepoDetails, fetchAcctFromDB } from '../store'
import { Container, Grid } from 'semantic-ui-react'

class RepoDetails extends Component {
  constructor(props){
    super(props)
    this.state = {
      showRepos: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    const accountName = this.props.acctDetails.name
    const numOfRepos = this.props.acctDetails.public_repos
    this.props.loadRepoDetails(accountName, numOfRepos)
    console.log('Loading the RepoDetails Component', this.props);
  }

  handleClick(){
    this.props.loadRepoDB(this.props.acctDetails.name.toLowerCase())
    this.setState({showRepos: true})
    // this.setState({showRepos: true, repos: this.props.repos, repoDetails: this.props.repoDetails})
    console.log(this.state);
  }

  shouldComponentUpdate(){
    if (this.state.showRepos) return true
    else return false
  }

  render(){
    return (
      <div>
      <Container textAlign='center'>
        <button onClick={this.handleClick}>click me for repos</button>
      </Container>
      <Container style={{background: 'white'}}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={6} />
            <Grid.Column width={4}>
             <div>This should display repo data.</div></Grid.Column>
            <Grid.Column width={6} />
          </Grid.Row>

        </Grid>
      </Container>
      { this.state.showRepos && this.props.repos.map(repo => (
        <div style={{background: 'white'}}>{repo.name}</div>
      ))
      }
      </div>
    )
  }
}

const mapState = state => {
  return {
    repos: state.SearchBar.repos,
    repoDetail: state.SearchBar.repoDetail
  }
}

const mapDispatch = dispatch => {
  return {
    loadRepoDetails: function(accountName, numOfRepos){
      dispatch(getRepoDetails(accountName, numOfRepos))
    },
    loadRepoDB: function(accountName){
      dispatch(fetchAcctFromDB(accountName))
    }
  }
}

export default connect(mapState, mapDispatch)(RepoDetails)

//should have a PropTypes thing to confirm parameters put in are what they are!
