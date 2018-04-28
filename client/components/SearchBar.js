import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAccountDetails } from '../store'

class SearchBar extends Component{
  constructor(props){
    super(props)
    this.state = {
      accountName: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    let santizedSearch = e.target.value.toLowerCase();
    // console.log(`${e.target.name} = ${santizedSearch}`)
    this.setState({[e.target.name]: santizedSearch})
  }

  handleSubmit(e){
    e.preventDefault();
    console.log('Show me data for: ', this.state.accountName)
    this.props.getDetailsFrom(this.state.accountName)
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="accountName"
          onChange={this.handleChange}
          placeholder="GitHub Account"
          value={this.state.accountName}
          style={{width: '80%'}}
        />
        <button type="submit">Show me free stuff!</button>
      </form>
    )
  }
}

const mapState = state => {
  return {
    accountDetails: state.acctDetails
  }
}

const mapDispatch = dispatch => {
  return {
    getDetailsFrom: function(accountName){
      console.log('Fetching data for ', accountName);
      dispatch(getAccountDetails(accountName))
    }
  }
}

export default connect(mapState, mapDispatch)(SearchBar);
