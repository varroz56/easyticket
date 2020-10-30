import React, { Component } from 'react'
// import helmet to have custom page title
import { Helmet } from 'react-helmet';

export class ContactUs extends Component {
    render() {
        return (
            <div className="container container__contactus pt-5">
                <Helmet>
                    <title>Easy Ticket Contact Us</title>
                    <meta name="description" content="Contact Us" />
                </Helmet>
                ContactUs
            </div>
        )
    }
}

export default ContactUs;
