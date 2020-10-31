import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';



const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        //login func
        //login(email, password)
    }

    // if user authenticated, redirect to home
    //if(isAuthenticated)
    //<Redirect

    return (
        <div className='conatiner mt-5 pt-5'>
            <h1>Sign In</h1>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email'
                        name='emial'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password'
                        name='Password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='8'
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Login</button>
                <p className='mt-3'>
                    Don't have an account? <Link to='/signup'>Sign Up</Link>
                </p>
                <p className='mt-3'>
                    Forgot your password? <Link to='/reset-password'>Reset Password</Link>

                </p>
            </form>
        </div>
    )

};

const mapStateToProps = state => ({
    //isAuthenticated
})

export default connect(null)(Login);