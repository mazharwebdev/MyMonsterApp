import React, { Component } from 'react';


class LoginForm extends Component{

  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
    }

    this.handleChange = this.handleChange.bind(this);
  }

  
  handleChange(e){
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
      [name]: val,
    });
  }

  render(){
    return(
      <div className="form">
        <br />
        <h3> Login </h3>
        <form onSubmit={(e) => this.props.handleLoginSubmit(e,this.state)} >
          <input type="text" name="username" class="form-control" placeholder="username" value={this.state.username} 
          onChange={this.handleChange} />
          <br />
          <br />
          <input type="password" name="password" class="form-control" placeholder="password" value={this.state.password} 
          onChange={this.handleChange} />
          <br />
          <br />
          <input type="submit" class="btn btn-default" value="Login!"  />
        </form>
      </div> 

    )
  }

}

export default LoginForm;