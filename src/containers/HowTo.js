import React, { useEffect, setState } from 'react'
import axios from 'axios';
// import helmet to have custom page title
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

const HowTo = (props) => {


    if (props.isAuthenticated) {
        return (
            < div className="container howto__container pt-5" >
                <Helmet>
                    <title>Easy Ticket How-Tos</title>
                    <meta name="description" content="How-To page" />
                </Helmet>
                <div className="howto__section__head">
                    How-To Section
                </div>
                {this.state.howtos.map(howto =>
                    <div className="row howto__section_row">
                        <div className="col-12 howto__section__content">

                            <button className="btn btn-outline-success btn-block" type="button" data-toggle="collapse" data-target={"#" + howto.reference} aria-expanded="false" aria-controls={howto.reference}>
                                {howto.question}
                            </button>
                            <div className="collapse howto__collapse" id={howto.reference}>
                                <div className="card card-body">
                                    {howto.answer}
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
            </div >
        )
    } else {
        return (
            <div className="container howto__container pt-5">
                <Helmet>
                    <title>Easy Ticket How-Tos</title>
                    <meta name="description" content="How-To page" />
                </Helmet>
                <div className="display-4 howto__section__head">Sorry, you need to register in order to see the content of this page</div>
            </div >
        )
    }


};

// check if user is authenticated decie which links to show on navbar
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(HowTo);