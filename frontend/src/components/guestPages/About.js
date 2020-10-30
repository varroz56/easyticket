import React, { Component } from 'react'
import { Helmet } from 'react-helmet';

export class About extends Component {
    render() {
        return (
            <div className="container about__container pt-5">
                <Helmet>
                    <title>About Easy Ticket </title>
                    <meta name="description" content="About Easy Ticket" />
                </Helmet>
                <div className="row about__section_row">
                    <div className="about__section__content">About</div>
                </div>
            </div>
        )
    }
}

export default About
