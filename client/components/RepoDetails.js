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

export default connect()(RepoDetails)
