import React from 'react';
import { Link } from 'react-router-dom';

const Footer = props => {
    return (
        <footer className="footer bg-dark fixed-bottom mt-auto py-3 noside">
            <div className="container footer__container">
                <div className="row footer__row">
                    <div className="col-3 footer__col">
                        <Link to="/about" className="footer__link">
                            About
                        <br />
                            <i className="fas fa-info fa-2x fa__about "></i>
                        </Link>
                    </div>
                    <div className="col-3 footer__col">
                        <Link to="/howto" className="footer__link">
                            How-To
                        <br />
                            <i className="fas fa-question fa-2x fa__question"></i>
                        </Link>
                    </div>
                    <div className="col-3 footer__col">
                        <Link to="premium" className="footer__link">
                            Premium
                        <br />
                            <i className="fas fa-crown fa-2x fa__premium"></i>
                        </Link>
                    </div>
                    <div className="col-3 footer__col">
                        <Link to="/contactus" className="footer__link">
                            Contact
                        <br />
                            <i className="far fa-envelope fa-2x fa__envelope"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}



export default Footer;

