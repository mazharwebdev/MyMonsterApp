
import React, { Component } from 'react';

import Auth from '../modules/Auth';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';


class Home extends React.Component {
  
    constructor(props){
    super(props);
    this.state ={
      profileAdmin: null,
    }
  }

  componentDidMount(){
    this.getUser();
  }

  getUser(){
    fetch('/userprofile', {
      method: 'GET',
      headers: {
         token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`, 
      }
    }).then(res => res.json())
        .then(res => {
          this.setState({
            profileAdmin: res.user.admin,
          })
        }).catch(err => {
        console.log(err);
        })
  }

  
 
render(){
    return (
      <div className="dash">
           
           {this.state.profileAdmin == true ? <AdminDashboard />: <UserDashboard /> }

         
           
      </div>
    )
}


}

export default Home;