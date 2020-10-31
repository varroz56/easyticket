import React, { useState } from 'react'
// import helmet to have custom page title
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
// importing login action
import { login } from '../../actions/accounts/accounts';


const Login = (login, isAuthenticated) => {
    // Define form state(empty)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    // get input field data to form
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    // on submit call login func using the form data
    const onSubmit = (e) => {
        e.preventDefault();

        login(email, password);
    };
    // if user is authenticated, redirect to the home page(atm)
    if (isAuthenticated) return <Redirect to="/" />;

    return (
        <div className="auth__container container">
            <Helmet>
                <title>Easy Ticket Login</title>
                <meta name="description" content="Please login" />
            </Helmet>
            <h1>Sign In</h1>
            <form className="auth__form" onSubmit={(e) => onSubmit(e)}>
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
                <button
                    className="auth__form__button__submit btn-outline-success waves-effect btn btn-sm"
                    type="submit"
                >
                    <i className="fas fa-sign-in-alt fa__signin"></i>{'   '}Login

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
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});
// now can use the isAuthenticated
export default connect(mapStateToProps, { login })(Login);
