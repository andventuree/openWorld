import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Segment, Table, Divider, Loader, Dimmer } from 'semantic-ui-react'

class RepoDetails extends Component {
  render(){
    return (
      <div>
        <Container textAlign='center'>
          <Divider hidden/>
        </Container>

        { this.props.repos ?
          (<Container >
              <Segment>
              <Table celled padded>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell singleLine width={2}>Name</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Created</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Starred</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Forks</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                { this.props.repos && this.props.repos.map(repo => {
                  return (
                    <Table.Row key={repo.name}>
                      <Table.Cell>
                        <strong><p><a href={repo.htmlURL}>{repo.name}</a></p></strong>
                      </Table.Cell>
                      <Table.Cell singleLine>{repo.repoStarted}</Table.Cell>
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
          ) : (
            <div>
              <Container>
                <Dimmer active>
                  <Loader indeterminate>Preparing Files</Loader>
                </Dimmer>
              </Container>
            </div>
            )
          }
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
