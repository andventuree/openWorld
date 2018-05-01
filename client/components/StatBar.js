import React from 'react'
import { Container, Statistic, Image, Divider } from 'semantic-ui-react'

function StatBar({account}){
  let memberSignUpDate = account.membershipStart.slice(0, 4)
  return (
    <div>
      <Container>
        <Image src={account.avatarURL} size='small' centered />
      </Container>
      <Divider hidden />
      <Container>
        <Statistic.Group widths='three'>
            <Statistic>
              <Statistic.Value>{account.publicRepos}</Statistic.Value>
              <Statistic.Label>Public Repositories</Statistic.Label>
            </Statistic>

            <Statistic>
              <Statistic.Value>{account.publicGists}</Statistic.Value>
              <Statistic.Label>Public Gists</Statistic.Label>
            </Statistic>

            <Statistic>
              <Statistic.Value>{memberSignUpDate}</Statistic.Value>
              <Statistic.Label>GitHub Member Since</Statistic.Label>
            </Statistic>
        </Statistic.Group>
      </Container>
      <Divider hidden />
    </div>
  )
}

export default StatBar
