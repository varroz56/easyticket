import './sass/main.scss';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';



import Home from './containers/Home';
import About from './containers/About';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Premium from './containers/Premium';
import ContactUs from './containers/ContactUs';
import CheckoutForm from './containers/CheckoutForm';
import Layout from './hocs/Layout';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />
                # added Djoser premade ursl for route
                <Route exact path='/reset-password' component={ResetPassword} />
                    <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
                    <Route exact path='/activate/:uid/:token' component={Activate} />
                    <Route exact path='/premium' component={Premium} />
                    <Elements stripe={stripePromise}>
                        <Route exact path="/checkout" component={CheckoutForm} />
                    </Elements>
                    <Route exact path='/contactus' component={ContactUs} />
                </Switch>
            </Layout>
        </Router>
    </Provider>
);
export default App;