import React from 'react'
import { Link } from 'react-router-dom';


const Nav = props => {
    return (
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
                        <li className="nav-item navbar__nav__item">
                            <Link className="nav-link navbar__nav__link" to="/login">
                                Login
                    <br />
                                <i className="fas fa-sign-in-alt fa__signin"></i>
                            </Link>
                        </li>
                        <li className="nav-item navbar__nav__item">
                            <Link
                                className="nav-link navbar__nav__link"
                                to="/signup"
                                tabIndex="-1"
                                aria-disabled="true"
                            >
                                Sign Up
                    <br />
                                <i className="fas fa-user-plus fa__signup"></i>
                            </Link>
                        </li>

                    </ul>
                </div>
            </nav>
        </header>
    )
}



export default Nav;




