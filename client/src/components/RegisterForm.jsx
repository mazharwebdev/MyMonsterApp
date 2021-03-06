import React, { Component } from 'react';

class RegisterFrom extends Component{
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
      email: '',
      name: '',
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
        <h3> Registeration </h3>
        <form onSubmit={(e) => this.props.handleRegisterSubmit(e,this.state)} >
          <input type="text" name="username" class="form-control" placeholder="username" value={this.state.username} 
          onChange={this.handleChange} />
          <br />
          <br />
          <input type="password" name="password" class="form-control" placeholder="password" value={this.state.password} 
          onChange={this.handleChange} />
          <br />
          <br />
          <input type="email" name="email" class="form-control" placeholder="email" value={this.state.email} 
          onChange={this.handleChange} />
          <br />
          <br />
          <input type="text" name="name" class="form-control" placeholder="name" value={this.state.name} 
          onChange={this.handleChange} />
          <br />
          <br />
          <input type="submit" class="btn btn-default" value="Register!" />
        </form>
      </div> 

    )
  }



}

export default RegisterFrom;