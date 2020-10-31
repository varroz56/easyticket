// import Fragment to be able to render multiple components
import React, { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
// import our alert container
import Alert from './Alert';
import { logout } from '../actions/accounts/accounts';

const Nav = ({ logout, isAuthenticated }) => {

    const authLinks = (
        <Fragment>
            <li className="nav-item navbar__nav__item">
                <Link className="nav-link navbar__nav__link" to="/select-event">
                    Create New
                <br />
                    <i class="fas fa-plus-circle"></i>
                </Link>
            </li>
            <li className="nav-item navbar__nav__item">
                <Link className="nav-link navbar__nav__link" to="/events">
                    My Events
            <br />
                    <i class="fas fa-folder-open"></i>
                </Link>
            </li>
            <li className="nav-item navbar__nav__item">
                <a className='nav-link navbar__nav__link' onClick={logout} href='#!'>Logout</a>
                <br />
                <i class="fas fa-sign-out-alt"></i>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li className="nav-item navbar__nav__item">
                <Link className="nav-link navbar__nav__link" exact to='/login'>Login
                <br />
                    <i className="fas fa-sign-in-alt fa__signin"></i>
                </Link>
            </li>
            <li className="nav-item navbar__nav__item">
                <Link className="nav-link navbar__nav__link" exact to='/signup'>Sign Up
                <br />
                    <i className="fas fa-user-plus fa__signup"></i>
                </Link>
            </li>
        </Fragment>
    );
    return (
        <Fragment>
            <header className="mb-5">
                <nav className="navbar navbar-expand-md fixed-top navbar__nav mb-2">
                    <a
                        className="navbar-brand navbar__nav__link navbar__nav__logo"
                        href="/"
                    >
                        Easy Ticket
                    </a>
                    <button
                        className="navbar-toggler navbar__nav__toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarCollapse"
                        aria-controls="navbarCollapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon">
                            <i className="fas fa-caret-square-down fa-2x fa__menu"></i>
                        </span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarCollapse"
                    >
                        <ul className="navbar-nav mr-auto navbar__nav__ul">
                            <li className="nav-item navbar__nav__item">
                                <Link
                                    className="nav-link navbar__nav__link"
                                    to="/"
                                >
                                    Home
                                    <br />
                                    <i className="fas fa-home fa__home"></i>
                                </Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav navbar__nav__ul">
                            {<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
                        </ul>
                    </div>
                </nav>
            </header>
            <div className="pushdown-content"></div>
            <Alert />
        </Fragment>
    )
}

// check if user is authenticated decie which links to show on navbar
const mapStateToProps = (state) => ({
    isAuthenticated: state.accounts.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Nav);




