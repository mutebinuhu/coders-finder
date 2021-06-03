import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const {email, password} = formData;
    const handleChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleSubmit = async e =>{
        e.preventDefault()
        console.log(formData)
        try {
            const loginData = {
                email,
                password
            }
            const config = {
                headers:{
                    'Content-Type': 'Application/json'
                }
            }
            const body = JSON.stringify(loginData)
            const res = await axios.post('/api/auth', body, config)
            console.log(res.data)
        } catch (err) {
            console.error(err.response)
        }
    }
    return (
        <Fragment> 
            <section className="container">
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
                <form className="form" onSubmit={e=>handleSubmit(e)}>
                    <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        required
                        value = {email}
                        onChange={e=>handleChange(e)}
                    />
                    </div>
                    <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e=>handleChange(e)}
                    />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
                <p className="my-1">
                    Don't have an account? <Link to='/register'>Sign Up</Link>
                </p>
                </section>
        </Fragment>
    )
}

export default Login
