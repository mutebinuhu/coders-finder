import React, {Fragment, useState} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux'
import  setAlert  from '../../actions/alerts';
import register from '../../actions/auth';

const Register = ({setAlert, register}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('');
  
  const handleSubmit = async(e) =>{
    e.preventDefault();
  
    if(!password){
      console.log("password is required")
    }else if(password.length < 7){
      setAlert("password too short", "danger")
    }else if(password !== confirm){
      console.log("passwords dont much")
      setAlert("passwords dont much", "danger")

    }else{
      const newUser = {name, email, password};
        register(newUser)
       
    }
  }


  

    return (
        <Fragment>
           <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}  />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
        
            value={password} onChange={e=>setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
        
            value={confirm} onChange={e=>setConfirm(e.target.value)}

          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to ='/login'>Sign In</Link>
      </p>
    </section>
        </Fragment>
    )
}

export default connect(null, {setAlert, register})(Register);
