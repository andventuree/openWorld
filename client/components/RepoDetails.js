import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRepoDetails, fetchAcctFromDB } from '../store'
import { Container, Grid, Segment, Table, Header, Rating, Button, Divider } from 'semantic-ui-react'

class RepoDetails extends Component {
  constructor(props){
    super(props)
    this.state = {
      showRepos: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    // const accountName = this.props.acctDetails.name
    // const numOfRepos = this.props.acctDetails.public_repos
    // this.props.loadRepoDetails(accountName, numOfRepos)
    // console.log('Loading the RepoDetails Component', this.props);
  }

  handleClick(){
    // this.props.loadRepoDB(this.props.acctDetails.name.toLowerCase())
    this.setState({showRepos: true})
    // this.setState({showRepos: true, repos: this.props.repos, repoDetails: this.props.repoDetails})
    console.log(this.state);
  }

  render(){
    return (
      <div>
      <Container textAlign='center'>
        <Divider hidden/>
      </Container>
      <Container >
        <Segment>
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
                <Header as='h3' textAlign='left'>swift-protobuf</Header>
              </Table.Cell>
              <Table.Cell singleLine>2016</Table.Cell>
              <Table.Cell>1800</Table.Cell>
              <Table.Cell>152</Table.Cell>
              <Table.Cell>
                "Plugin and runtime library for using protobuf with Swift"
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
    // repoDetail: state.SearchBar.repoDetails
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

// <Grid>
// <Grid.Row>
//   <Grid.Column width={4}>Name</Grid.Column>
//   <Grid.Column width={4}>Date started</Grid.Column>
//   <Grid.Column width={4}>Watchers</Grid.Column>
//   <Grid.Column width={4}>Forks</Grid.Column>
// </Grid.Row>
// { this.state.showRepos && this.props.repos.map(repo => (
//   <div style={{background: 'white'}}>{repo.name}</div>
// ))
// }
// </Grid>

// <Button onClick={this.handleClick}>click me for repos</Button>

// { this.props.repoDetails ? this.props.repoDetails.map(repo => {
//   return (<Segment>{repo.name}</Segment>)
// }) : <div>Loading</div>
// }
