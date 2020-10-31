import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { login } from '../../actions/accounts/accounts';

const Login = ({ login }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { email, password } = formData;
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };
    return (
        <div className="auth__container container">
            <Helmet>
                <title>Easy Ticket Login</title>
                <meta name="description" content="Please login" />
            </Helmet>
            <h1>Sign In</h1>
            <p>Sign into your Account</p>
            <form className="auth__form" onSubmit={(e) => onSubmit(e)}>
                <div className="auth__form__input form-group">
                    <input
                        className="form-control"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className="auth__form__input form-group">
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => onChange(e)}
                        minLength="6"
                        required
                    />
                </div>
                <button
                    className="auth__form__button__submit btn btn-primary"
                    type="submit"
                >
                    Login
                </button>
            </form>
            <p className="mt-3">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
            <p className="mt-3">
                Forgot your Password?{' '}
                <Link to="/reset_password">Reset Password</Link>
            </p>
        </div>
    );
};

export default connect(login)(Login);