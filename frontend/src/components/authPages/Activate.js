import React from 'react';
import { Helmet } from 'react-helmet';


const Activate = (props) => {

    return (
        <div className='container mt-5 auth__container'>
            <Helmet>
                <title>Easy Ticket Account Activation</title>
                <meta name='description' content='Please Activate your account' />
            </Helmet>
            <div >
                <h1>Verify your Account:</h1>
                <button
                    type="button"
                    className='btn-outline-success waves-effect btn btn-sm'
                >
                    Verify
                </button>
            </div>
        </div >
    );
};

export default Activate;