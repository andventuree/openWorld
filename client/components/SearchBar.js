import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAccountDetails } from '../store'
import { Input } from 'semantic-ui-react'

class SearchBar extends Component {
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
    this.setState({[e.target.name]: santizedSearch})
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.getDetailsFrom(this.state.accountName)
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          fluid
          icon="github"
          iconPosition="left"
          size="big"
          name="accountName"
          onChange={this.handleChange}
          placeholder="Search organizations..."
          value={this.state.accountName}
        />
      </form>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    getDetailsFrom: function(accountName){
      dispatch(getAccountDetails(accountName))
    }
  }
}

export default connect(null, mapDispatch)(SearchBar);

