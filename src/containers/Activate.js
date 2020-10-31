import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verifyUser } from '../actions/auth';



const Activate = (props) => {
    const [verified, setVerified] = useState(false);

    const verify_account = e => {
        const uid = props.match.params.uid;
        const token = props.match.params.token;

        props.verifyUser(uid, token);
        setVerified(true);
    };

    if (verified)
        return <Redirect to='/' />

    return (
        <div className='container mt-5 auth__container'>
            <Helmet>
                <title>Easy Ticket Account Activation</title>
                <meta name='description' content='Please Activate your account' />
            </Helmet>
            <div >
                <h1>Verify your Account:</h1>
                <button
                    onClick={verify_account}
                    type="button"
                    className='btn-outline-success waves-effect btn btn-sm'
                >
                    Verify
                </button>
            </div>
        </div >
    );
};
export default connect(null, { verifyUser })(Activate);