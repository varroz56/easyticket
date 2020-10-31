import React, { useState } from 'react'
// import helmet to have custom page title
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../actions/accounts/accounts';


const SignUp = ({ signup, isAuthenticated }) => {
    // signup form to have empty in this state
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        re_password: ''
    });

    const [accountCreated, setAccountCreated] = useState(false);
    const { email, first_name, last_name, password, re_password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();

        if (password === re_password) {
            signup(formData);
            setAccountCreated(true);
        }
    };
    // if user authenticated send back to the home page
    if (isAuthenticated) return <Redirect to="/" />;

    if (accountCreated) return <Redirect to="login" />;

    return (
        <div className="container auth__container">
            <Helmet>
                <title>Easy Ticket Sign Up</title>
                <meta
                    name="description"
                    content="Please Sign Up to use our services"
                />
            </Helmet>
            <h1>Sign Up</h1>
            <form className="auth__form" onSubmit={(e) => onSubmit(e)}>
                <div className="auth__form__input form-group">
                    <label>First Name</label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="First name"
                        name="first_name"
                        value={first_name}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className="auth__form__input form-group">
                    <label>Last Name</label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Last name"
                        name="last_name"
                        value={last_name}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>

                <div className="auth__form__input form-group">
                    <label>Email Address</label>
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
                    <label>Password</label>
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
                <div className="auth__form__input form-group">
                    <label>Confirm Password</label>
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Confirm Password"
                        name="re_password"
                        value={re_password}
                        onChange={(e) => onChange(e)}
                        minLength="6"
                        required
                    />
                </div>
                <button className="auth__form__button__submit btn-outline-success waves-effect btn btn-sm" type="submit">
                    <i className="fas fa-user-plus fa__signup"></i>{'   '}Register
                </button>
            </form>
            <p className="mt-3">
                Already have an account? <Link className="auth__form__link" to="/login"><i className="fas fa-sign-in-alt fa__signin"></i>   Log In</Link>
            </p>
        </div>
    )
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(SignUp);
