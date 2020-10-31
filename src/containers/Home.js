import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


const Home = () => (
    <div className="container home__container pt-5 noside">
        <Helmet>
            <title>Easy Ticket Home</title>
            <meta name="description" content="Welcome page" />
        </Helmet>
        <div className="home__section mt-5">
            <div class="jumbotron">
                <h1 class="display-4 text-center">We are Easy Ticket</h1>
                <p class="lead text-center">Get Support for your IT issues or have your own IT department using our app to deliver their services</p>
                <hr class="my-4" />
                <p className="text-center">We offer end-user and corporate solutions to enchance and speed up the process of any event like Requests or Incidents.
                If you have an issue, just need to register and then submit a request or incident and we will get back tou with the solution.
                Our free version offers one event creation at a time until it is closed, but with our premium services you can create as many events as you need.
                        For more information on how to use the app, please check out our extensive How-To page</p>
                <hr />
                <div className="row">
                    <div className="col-6 d-flex justify-content-center">
                        <Link className="home__link" to="/login">
                            <i className="fas fa-sign-in-alt fa__signin"></i>  Login
                                </Link></div>
                    <div className="col-6  d-flex justify-content-center"><Link
                        className="home__link"
                        to="/signup"
                        tabIndex="-1"
                        aria-disabled="true"
                    >
                        <i className="fas fa-user-plus fa__signup"></i>  Sign Up
                            </Link></div>
                </div>
            </div>
        </div>
    </div>

);

export default Home;