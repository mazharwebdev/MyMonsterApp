import React, { Component } from 'react';

import Auth from '../modules/Auth';

function searchingFor(term){
  return function(x){
    return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
  }
}

class AdminDashboard extends Component{

  constructor(){
    super();
    this.state ={
      auth: Auth.isUserAuthenticated(),
      allUsers: null,
      usersLoaded: false,
      isEdit: false,
      editUser: null,
      term: '',
    }
    
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
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

  handleDelete(id){
    fetch(`users/${id}`, 
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
         token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`, 
      }
    }).then((response) => { 
        this.deleteUser(id)
      })
  }

  deleteUser(id){
    let newUser = this.state.allUsers.filter((user) => user.id !== id)
    this.setState({
      allUsers: newUser
    })
  }
 
  handleUpdate(user){
    fetch(`users/${user.id}`, 
    {
      method: 'PUT',
      body: JSON.stringify({user: user}),
      headers: {
        'Content-Type': 'application/json',
         token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`, 
      }
    }).then((response) => { 
        this.updateUser(user)
      })
  }

  updateUser(user){
    let newUser = this.state.allUsers.filter((f) => f.id !== user.id)
    newUser.push(user)
    this.setState({
      allUsers: newUser,
    })
  }

  onEdit(user){
    this.setState({
      isEdit: true,
      editUser: user,
    });

  }

   handleChange(e){
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
      [name]: val,
    });
  }
  
  searchHandler(event){
    this.setState({
      term: event.target.value
    })
  }

  render(){

    return (
      <div className="dash">
        {
          this.state.isEdit
            ?(
              <div>
                <br />
                <h3> Edit User </h3>
                <form onSubmit={(e) => this.handleUpdate(this.state.editUser)}>
                  <input type="text" name="username" placeholder="username" value={this.state.editUser.username} onChange={this.handleChange} />
                  <br />
                  <br />
                  <input type="email" name="email" placeholder="email" value={this.state.editUser.email} 
                  onChange={this.handleChange} />
                  <br />
                  <br />
                  <input type="text" name="name" placeholder="name" value={this.state.editUser.name}
                  onChange={this.handleChange} />
                  <br />
                  <br />
                  <button> Update </button>
                </form>  

              </div>


            )
            :(
              

              <ul>
                <form>
                  <h3> Searching Records: By Name 
                  <input type="text" onChange={this.searchHandler} />
                  </h3>
                </form>
                {(this.state.usersLoaded)
                 ? this.state.allUsers.filter(searchingFor(this.state.term)).map(user =>{
                  return <li key={user.id}>{user.name} -- {user.email} 
                      <a onClick={() => this.handleDelete(user.id)} className="delete" href="#">Delete </a>
                      <a onClick={() => this.onEdit(user)} className="update" href="#">Update </a>
                  </li>
                 })
                 : <p> Loading..... </p>
               }
              </ul> 

              )



        }



        
      </div>
    )
  }


}

export default AdminDashboard;