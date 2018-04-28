import React from 'react'
import { connect } from 'react-redux'
import { Card, Icon } from 'semantic-ui-react'

function AccountDetails(props){
  console.log(props.acctDetails)
  const acct = props.acctDetails
  return (
    <div>
      <Card>
        <Card.Content header={acct.login} />
        <Card.Content description={acct.description || 'No company description :('} />
        <Card.Content extra>
          <Icon name="user" />
            {acct.public_repos} Open Source Repos
        </Card.Content>
      </Card>
    </div>
  )
}

const mapState = (state) => {
  return {
    acctDetails: state.SearchBar.acctDetails,
    repoDetails: state.SearchBar.repoDetails
  }
}

export default connect(mapState)(AccountDetails)
