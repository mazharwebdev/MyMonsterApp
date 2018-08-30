import React, { Component } from 'react';

import Auth from '../modules/Auth';

import AddMonsterForm from './AddMonsterForm';

class AdminDashboard extends Component{

  constructor(){
    super();
    this.state ={
      auth: Auth.isUserAuthenticated(),
      allUsers: null,
      usersLoaded: false,
    }
  }

  componentDidMount(){
    this.getUsers();
  }

    getUsers(){
    fetch('/getAllUsers', {
      method: 'GET',
      headers: {
         token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`, 
      }
    }).then(res => res.json())
        .then(res => {
          this.setState({
            allUsers: res.users,
            usersLoaded: true,
          })
        }).catch(err => {
        console.log(err);
        })
  }

 

 
  render(){
    return (
      <div className="dash">

        <ul>
          {(this.state.usersLoaded)
           ? this.state.allUsers.map(user =>{
            return <li key={user.id}>{user.name} -- {user.email} 
            </li>
           })
           : <p> Loading..... </p>
         }
        </ul> 
      </div>
    )
  }


}

export default AdminDashboard;