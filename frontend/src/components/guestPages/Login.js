import React, { Component } from 'react'
// import helmet to have custom page title
import { Helmet } from 'react-helmet';


export class Login extends Component {
    render() {
        return (
            <div className="auth__container container">
                <Helmet>
                    <title>Easy Ticket Login</title>
                    <meta name="description" content="Please login" />
                </Helmet>
                <h1>Sign In</h1>

            </div>
        )
    }
}

export default Login
