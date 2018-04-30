import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRepoDetails, fetchAcctFromDB } from '../store'
import { Container, Grid, Segment, Table, Header, Rating } from 'semantic-ui-react'

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
      <Container >
        <Segment>
        <Grid>
          <div>This should display repo data.</div>
            <Grid.Row>
              <Grid.Column width={4}>Name</Grid.Column>
              <Grid.Column width={4}>Date started</Grid.Column>
              <Grid.Column width={4}>Watchers</Grid.Column>
              <Grid.Column width={4}>Forks</Grid.Column>
            </Grid.Row>
          { this.state.showRepos && this.props.repos.map(repo => (
              <div style={{background: 'white'}}>{repo.name}</div>
          ))
          }
        </Grid>

        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine width={2}>Name</Table.HeaderCell>
              <Table.HeaderCell>Created</Table.HeaderCell>
              <Table.HeaderCell>Starred</Table.HeaderCell>
              <Table.HeaderCell>Forks</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Header as='h3' textAlign='left'>A</Header>
              </Table.Cell>
              <Table.Cell singleLine>Power Output</Table.Cell>
              <Table.Cell>
                <Rating icon='star' defaultRating={3} maxRating={3} />
              </Table.Cell>
              <Table.Cell textAlign='right'>
                  80% <br />
                <a href='#'>18 studies</a>
              </Table.Cell>
              <Table.Cell>
                  Creatine supplementation is the reference compound for increasing muscular creatine levels; there is
                  variability in this increase, however, with some nonresponders.
              </Table.Cell>
            </Table.Row>
          </Table.Body>
          </Table>

      </Segment>
      </Container>
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

// <Grid>
//   <Grid.Row>
//     <Grid.Column width={6} />
//     <Grid.Column width={4}></Grid.Column>
//     <Grid.Column width={6} />
//     </Grid.Row>
//   </Grid>
