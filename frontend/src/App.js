import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './hocs/Layout';

import { About } from './components/guestPages/About';
import { HowTo } from './components/guestPages/HowTo';
import { Premium } from './components/guestPages/Premium';
import { ContactUs } from './components/guestPages/ContactUs';


import './sass/main.scss';

const App = () => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/about" component={About} />
        <Route exact path="/howto" component={HowTo} />
        <Route exact path="/premium" component={Premium} />
        <Route exact path="/contactus" component={ContactUs} />
      </Switch>
    </Layout>
  </Router>
);

export default App;