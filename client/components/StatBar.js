import React from 'react'
import { Statistic } from 'semantic-ui-react'

function StatBar({acctDetails}){
  let memberSignUpDate = acctDetails.created_at.slice(0, 4)
  return (
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
  )
}

export default StatBar

// <a href={acctDetails.html_url} />
// <Statistic>
// <Statistic.Value>
// <img className='organization-logo'
//   src={acctDetails.avatar_url}
//   placeholder='Missing avatar!' />
// </Statistic.Value>
// <Statistic.Label>Logo</Statistic.Label>
// </Statistic>
