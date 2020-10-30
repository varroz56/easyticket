import React, { Component } from 'react'
// import helmet to have custom page title
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export class Premium extends Component {
    render() {
        return (
            <div className="container premium__container pt-5">
                <Helmet>
                    <title>Easy Ticket Premium</title>
                    <meta name="description" content="Premium page" />
                </Helmet>
                <div className="display-4 premium__section__title">Great savings on our multi-month packages!</div>
                <div className="premium__section__subtitle">We have created different packages to fit for your needs</div>
                <div className="row premium__section_row">
                    <div className="col-12 col-md-6 col-lg-4 premium__section__col">
                        <Link to="checkout" className="footer__link">
                            <div className="card premium__section__card">
                                <div className="card-body premium__section__card__body">
                                    <h5 className="card-title premium__section__card__title display-4">Card title</h5>
                                    <h6 className="card-subtitle mb-2 text-muted premium__section__card__subtitle">Card subtitle</h6>
                                    <p className="card-text premium__section__card__text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </Link>

                    </div>
                </div>
            </div >
        )
    }
}

export default Premium
