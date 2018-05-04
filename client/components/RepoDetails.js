import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Segment, Table, Header, Divider } from 'semantic-ui-react'

class RepoDetails extends Component {
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
            { this.props.repos && this.props.repos.map(repo => {
              return (
                <Table.Row key={repo.id}>
                  <Table.Cell>
                    <Header as='h5' textAlign='left'>{repo.name}</Header>
                  </Table.Cell>
                  <Table.Cell singleLine>{repo.repoStarted.slice(0,4)}</Table.Cell>
                  <Table.Cell>{repo.watchers}</Table.Cell>
                  <Table.Cell>{repo.forks}</Table.Cell>
                  <Table.Cell>
                    {repo.description}
                  </Table.Cell>
                </Table.Row>
              )
            })}
            </Table.Body>
            </Table>

          </Segment>
        </Container>
      </div>
    )
  }
}

const mapState = state => {
  console.log('state.SearchBar.repos: ', state.SearchBar.repos);
  return {
    repos: state.SearchBar.repos
  }
}

export default connect(mapState)(RepoDetails)
