import React, { Component } from 'react'
// import helmet to have custom page title
import { Helmet } from 'react-helmet';

export class Premium extends Component {
    render() {
        return (
            <div className="container premium__container pt-5">
                <Helmet>
                    <title>Easy Ticket Premium</title>
                    <meta name="description" content="Premium page" />
                </Helmet>
                <div className="row premium__section_row">
                    <div className="premium__section__content">Premium</div>
                </div>
            </div>
        )
    }
}

export default Premium
