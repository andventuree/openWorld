import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAccountDetails } from '../store'
import { Input } from 'semantic-ui-react'

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
    const acct = this.props.acctDetails;
    return (
        <form onSubmit={this.handleSubmit}>
          <Input
            icon="users"
            iconPosition="left"
            size="massive"
            name="accountName"
            onChange={this.handleChange}
            placeholder="Search organizations..."
            value={this.state.accountName}
            style={{width: '30%'}}
          />
        </form>
    )
  }
}

const mapState = state => {
  return {
    acctDetails: state.acctDetails
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
