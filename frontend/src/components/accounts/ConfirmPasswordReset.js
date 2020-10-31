import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { confirm_reset_password } from '../../actions/accounts/accounts';

const ConfirmPasswordReset = (props) => {

    // this is quite similar to password reset
    // but here the form data is the new password
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });
    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        const uid = props.match.params.uid;
        const token = props.match.params.token;

        props.confirm_reset_password(uid, token, new_password, re_new_password);
        setRequestSent(true);
    };
    return (
        <div className='container mt-5 auth__container'>
            <Helmet>
                <title>Easy Ticket Password Reset</title>
                <meta name="description" content="Please provide a new password" />
            </Helmet>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group auth__form__input'>
                    <label>Your New Password</label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='New Password'
                        name='new_password'
                        value={new_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <div className='form-group auth__form__input'>
                    <label>Please Confirm Your New Password</label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm New Password'
                        name='re_new_password'
                        value={re_new_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <button className='btn-outline-success waves-effect btn btn-sm' type='submit'>Reset Password</button>
            </form>
        </div>
    );
};

export default connect(null, { confirm_reset_password })(ConfirmPasswordReset);
