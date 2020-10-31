import React from 'react'
// import helmet to have custom page title
import { Helmet } from 'react-helmet';

const About = () => (
    <div className="container about__container mt-5 pt-5 noside">
        <Helmet>
            <title>About Easy Ticket </title>
            <meta name="description" content="About Easy Ticket" />
        </Helmet>
        <div className="about__section">
            <div class="jumbotron">
                <h1 class="display-4 text-center">Easy Ticket is about the customer. </h1>
                <p class="lead text-center">Customer can be the end-user and the support user too. Our aim is to give as much automation and hand on both sides.
                With our constantly improved and extended knowledge base you will either find the solution to any issues, or we will jump on and work hard to help you out.
                    </p>
                <hr class="my-4" />
                <p className=" text-center">Although, we believe that most of the things can be coded and automated, our number one priority is you!</p>
            </div>
        </div>
    </div>
);

export default About;