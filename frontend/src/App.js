import './sass/main.scss';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './hocs/Layout';

import About from './components/homePages/About';
import HowTo from './components/howtos/HowTo';
import Premium from './components/premium/Premium';
import ContactUs from './components/marketing/ContactUs';

import Home from './components/homePages/Home';
import Login from './components/accounts/Login';
import SignUp from './components/accounts/SignUp';
import Activate from './components/accounts/Activate';
import ResetPassword from './components/accounts/PasswordReset';
import ConfirmResetPassword from './components/accounts/PasswordReset';

import CheckoutForm from './components/payments/Checkout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);




const App = () => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/about" component={About} />
        <Route exact path="/howto" component={HowTo} />
        <Route exact path="/premium" component={Premium} />
        <Route exact path="/contactus" component={ContactUs} />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route
          exact
          path="/reset_password"
          component={ResetPassword}
        />
        <Route
          exact
          path="/password/reset/confirm/:uid/:token"
          component={ConfirmResetPassword}
        />
        <Route
          exact
          path="/activate/:uid/:token"
          component={Activate}
        />
        <Elements stripe={stripePromise}>
          <Route exact path="/checkout" component={CheckoutForm} />
        </Elements>
      </Switch>
    </Layout>
  </Router>
);

export default App;