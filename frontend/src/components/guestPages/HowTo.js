import React, { Component } from 'react'
// import helmet to have custom page title
import { Helmet } from 'react-helmet';

export class HowTo extends Component {
    render() {
        return (
            <div className="container howto__container pt-5">
                <Helmet>
                    <title>Easy Ticket How-Tos</title>
                    <meta name="description" content="How-To page" />
                </Helmet>
                <div className="row howto__section_row">
                    <div className="howto__section__content">How to</div>
                </div>
            </div>
        )
    }
}

export default HowTo;
