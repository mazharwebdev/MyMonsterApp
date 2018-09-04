import React, { Component } from 'react';
import './App.css';

import {BrowserRouter as Router, Link, Redirect, Route} from 'react-router-dom';

import Auth from './modules/Auth';

import MonsterList from './components/MonsterList';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Home from './components/Home';

class App extends Component {
  constructor(){
    super();
    this.state = {
      auth: Auth.isUserAuthenticated(),
      //shouldGoToDash: false,
    };
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }  

  handleRegisterSubmit(e, data){
    e.preventDefault();
    fetch('/users',{
      method: 'POST',
      body: JSON.stringify({
        user: data,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
      .then(res => {
        Auth.authenticateToken(res.token);
        this.setState({
          auth: Auth.isUserAuthenticated(),
          //shouldGoToDash: true,
        });
      }).catch(err => {
        console.log(err);
      })
  }

  handleLoginSubmit(e, data){
    e.preventDefault();
    fetch('/login',{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
        .then(res => {
          console.log(res.token);
          if(res.token !== undefined)
          {
          Auth.authenticateToken(res.token);
          this.setState({
            auth: Auth.isUserAuthenticated(),
            //shouldGoToDash: true,
          });
          }else{
            this.setState({
            auth: false,
            //shouldGoToDash: true,
          });
          }
          console.log(Auth.isUserAuthenticated());
        }).catch(err => {
          console.log(err);
        })

  }


  handleLogout(){
    fetch('/logout', {
      method: 'DELETE',
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`, 
      }
    }).then(res => {
    
      Auth.deauthenticateToken();
      this.setState({
        auth: Auth.isUserAuthenticated(),
      })
    }).catch(err => {
        console.log(err);
      })  
  }


  render() {
    return (
      <Router>
        <div className="App"> 
          <h3> React Rails App </h3>
          <div className="nav">
            <Link to="/login"> Login </Link>
            <Link to="/register"> Register </Link>
            {this.state.auth?

              (<button onClick= {this.handleLogout} class="button btn btn-default"> Log out </button>
              )
              :
              (
                <h6> </h6>
              )
            }
          </div>


          <Route exact path="/register" 
          render= {() => (this.state.auth) 
            ? <Redirect to="/home" /> 
            : <RegisterForm 
            handleRegisterSubmit =
            {this.handleRegisterSubmit} />} />

          <Route exact path="/login" 
          render= {() => (this.state.auth) 
            ? <Redirect to="/home" /> 
            : <LoginForm 
            handleLoginSubmit =
            {this.handleLoginSubmit} />} /> 

          <Route 
            exact path="/home"
            render={() => <Home /> } />      
        
        </div>

        


      </Router>
    );
  }
}

export default App;
