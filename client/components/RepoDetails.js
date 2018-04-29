import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRepoDetails } from '../store'

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
    console.log('Loading the RepoDetails Component');
    console.log('this.props: ', this.props);
  }

  handleClick(){
    this.setState({showRepos: true, repos: this.props.Booger.SearchBar.repoDetails})
    console.log(this.state);
  }

  shouldComponentUpdate(){
    if (this.state.showRepos) return true
    else return false
  }

  render(){
    return (
      <div>
      <div>Show some dummy div for now, repos should load below</div>
      <button onClick={this.handleClick}>click me for repos</button>
      { this.state.showRepos &&
            <div>{this.props.Booger.SearchBar.repoDetails[1].name}</div>
      }
      </div>
    )
  }
}

const mapState = state => {
  return {
    Booger: state
  }
}

const mapDispatch = dispatch => {
  return {
    loadRepoDetails: function(accountName, numOfRepos){
      dispatch(getRepoDetails(accountName, numOfRepos))
    }
  }
}

export default connect(mapState, mapDispatch)(RepoDetails)

// { this.state.showRepos && this.props.repos.map(repo => {
//   return (
//       <span key={repo.id}>{repo.name}</span>
//     )
//   })
// }

//should have a PropTypes thing to confirm parameters put in are what they are!
