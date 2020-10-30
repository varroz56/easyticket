import React, { useState } from 'react';
import { Helmet } from 'react-helmet';



const ResetPassword = (props) => {
    // declair formdata to be the an empty email for this state 
    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;
    // add form data
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

    };

    return (
        <div className='container mt-5 auth__container'>
            <Helmet>
                <title>Request Password Reset</title>
                <meta name="description" content="Please provide username" />
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

export default ResetPassword;