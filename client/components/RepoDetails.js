import React, { Component } from 'react'
import { connect } from 'react-redux'

function RepoDetails(){
  const { repoDetails } = this.props
  console.log('In side Repo details Component');
  console.log('repoDetails: ', repoDetails);
  return (
    <div>
      <div>Show some dummy div for now, repos should load below</div>
      { repoDetails && repoDetails.map(repo => {
        return (
          <span>{repo.name}</span>
        )
      })
      }
    </div>
  )
}

const mapState = state => {
  return {
    repoDetails: state.repoDetails
  }
}

export default connect(mapState)(RepoDetails)
