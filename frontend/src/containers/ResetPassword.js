import React, { useState } from 'react';
import { Helmet } from 'react-helmet'
import { reset_password } from '../actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const PasswordReset = (props) => {
    const [requestSent, setRequestSent] = useState(false);
    // declair formdata to be the an empty email for this state 
    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;
    // add form data
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        reset_password(email);
    };
    if (requestSent)
        return <Redirect to='/' />

    return (
        <div className='container mt-5 auth__container'>
            <Helmet>
                <title>Request Password Reset</title>
                <meta name="description" content="Please provide email address" />
            </Helmet>
            <h1 className="">Request Password Reset</h1>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group auth__form__input'>
                    <label>Your Email Address</label>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Your Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <button className='btn-outline-success waves-effect btn btn-sm' type=' submit'>Reset Password</button>
            </form>
        </div>
    );
};

export default connect(null, { reset_password })(PasswordReset);