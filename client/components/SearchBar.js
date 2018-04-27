import React, { Component } from 'react'

class SearchBar extends Component{
  constructor(props){
    super(props)
    this.state = {
      findAccount: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    let santizedSearch = e.target.value.toLowerCase();
    console.log(`${e.target.name} = ${santizedSearch}`)
    this.setState({[e.target.name]: santizedSearch})
  }

  render(){
    return (
      <input
      name="findAccount"
      onChange={this.handleChange}
      placeholder="Type in a GitHub Account"
      value={this.state.findAccount}
    />
    )
  }
}

export default SearchBar;
