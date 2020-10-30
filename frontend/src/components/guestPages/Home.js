import React, { Component } from 'react'
// import helmet to have custom page title
import { Helmet } from 'react-helmet';


export class Home extends Component {
    render() {
        return (
            <div className="container home__container pt-5">
                <Helmet>
                    <title>Easy Ticket Home</title>
                    <meta name="description" content="Welcome page" />
                </Helmet>
                <div className="row home__section_row">
                    <div className="home__section__content">Home</div>
                </div>
            </div>
        )
    }
}

export default Home
