import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRepoDetails, fetchRepoDB } from '../store'

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
    this.props.fetchRepoDB(this.props.acctDetails.name)
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
    },
    loadRepoDB: function(accountName){
      dispatch(fetchRepoDB(accountName))
    }
  }
}

export default connect(mapState, mapDispatch)(RepoDetails)

//should have a PropTypes thing to confirm parameters put in are what they are!
