import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { login } from '../actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        //login func
        login(email, password)
    }

    // if user authenticated, redirect to home
    if (isAuthenticated)
        <Redirect to='/' />

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
                    className="auth__form__button__submit btn-outline-success waves-effect btn btn-sm"
                    type="submit"
                >
                    Login
                </button>
            </form>
            <p className="mt-3">
                Don't have an account? <Link className="auth__form__link" to="/signup"><i className="fas fa-user-plus fa__signup"></i>  Sign Up
                    </Link>

            </p>
            <p className="mt-3">
                Forgot your Password?{' '}
                <Link className="auth__form__link" to="/reset_password"><i class="fas fa-sync"></i>   Reset Password</Link>
            </p>
        </div>
    );

};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);