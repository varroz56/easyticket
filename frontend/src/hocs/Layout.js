import React from 'react'
import Footer from '../containers/Footer'
import Nav from '../containers/Nav'
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/accounts/accounts';

const Layout = props => {
    return (
        <div>
            <Nav />
            <div className="pushdown-content"></div>
            {props.children}
            <Footer />
        </div>
    )
}



export default connect(null, { checkAuthenticated, load_user })(Layout);