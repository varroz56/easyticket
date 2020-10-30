import React, { Component } from 'react'
// import helmet to have custom page title
import { Helmet } from 'react-helmet';

export class SignUp extends Component {
    render() {
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

            </div>
        )
    }
}

export default SignUp
