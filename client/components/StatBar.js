import React from 'react'
import { Container, Statistic, Segment, Image, Divider } from 'semantic-ui-react'

function StatBar({acctDetails}){
  let memberSignUpDate = acctDetails.created_at.slice(0, 4)
  return (
    <div>
      <Container>
        <Image src={acctDetails.avatar_url} size='small' centered />
      </Container>
      <Divider hidden />
      <Statistic.Group widths='three'>
          <Statistic>
            <Statistic.Value>{acctDetails.public_repos}</Statistic.Value>
            <Statistic.Label>Public Repositories</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>{acctDetails.public_gists}</Statistic.Value>
            <Statistic.Label>Public Gists</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>{memberSignUpDate}</Statistic.Value>
            <Statistic.Label>GitHub Member Since</Statistic.Label>
          </Statistic>
      </Statistic.Group>
      <Divider hidden />
    </div>
  )
}

export default StatBar
