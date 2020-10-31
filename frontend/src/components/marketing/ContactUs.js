import React, { useState } from 'react'
// import helmet to have custom page title
import { Helmet } from 'react-helmet';
// Import our contactusform to handle submit request
import submitContactEmailForm from '../../actions/marketing/ContactUsForm';
import { connect } from 'react-redux';


const ContactUs = ({ submitContactEmailForm }) => {
    // Define form state(empty)
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        subject: '',
        message: ''
    });
    // Create bool var for subscribe checkbox
    let subscribe_me = false;
    const { first_name, last_name, email, subject, message } = formData;
    // to handle checkbox select/unselect event
    const handleCheckBoxChange = (e) => {
        e.target.checked ? (subscribe_me = true) : (subscribe_me = false);
    };

    // get input form data
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // on submit call login func using the form data
    const onSubmit = (e) => {
        e.preventDefault();
        submitContactEmailForm(first_name, last_name, email, subject, message, subscribe_me);
    };

    return (
        <div className="container container__contactus pt-5">
            <Helmet>
                <title>Easy Ticket Contact Us</title>
                <meta name="description" content="Contact Us" />
            </Helmet>
            <div className="row justify-content-center noside">
                <div className="col-10 col-md-10 col-lg-8 noside">
                    <form
                        className="contactus__form"
                        onSubmit={(e) => onSubmit(e)}
                    >
                        <p className="lead">
                            Please provide your contact details:
                        </p>
                        <div className="row justify-content-center noside">

                            <div className="col noside">
                                <label >First Name</label>
                                <input
                                    name="first_name"
                                    onChange={(e) => onChange(e)}
                                    value={first_name}
                                    required
                                    type="text"
                                    className="form-control"
                                    placeholder="First Name"
                                />
                            </div>
                            <div className="col">
                                <label >Last Name</label>
                                <input
                                    name="last_name"
                                    onChange={(e) => onChange(e)}
                                    value={last_name}
                                    required
                                    type="text"
                                    className="form-control"
                                    placeholder="Last Name"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>
                                Email address
                            </label>
                            <input
                                name="email"
                                onChange={(e) => onChange(e)}
                                value={email}
                                required
                                type="email"
                                className="form-control"
                                placeholder="name@example.com"
                            />
                        </div>
                        <div className="form-group">
                            <label>Subject:</label>
                            <input
                                name="subject"
                                onChange={(e) => onChange(e)}
                                value={subject}
                                required
                                type="text"
                                className="form-control"
                                placeholder="subject"
                            />
                            <label>Your Message:</label>
                            <textarea
                                name="message"
                                onChange={(e) => onChange(e)}
                                value={message}
                                required
                                type="text"
                                className="form-control"
                                placeholder="subject"
                                rows="5"
                            ></textarea>
                        </div>

                        <div className="form-check">
                            <input
                                name="subscribe_me"
                                onChange={handleCheckBoxChange}
                                value={subscribe_me}
                                type="checkbox"
                                className="form-check-input"
                                id="subscribe"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="subscribe"
                            >
                                Please check this box if you would like to
                                subscribe to our monthly Newsletter
                            </label>
                        </div>
                        <div>
                            <button
                                className="button__submit__form__contactus btn btn-outline-success waves-effect px-2"
                                type="submit"
                            >
                                <i className="fas fa-paper-plane" aria-hidden="true">Send</i>
                            </button>
                            <label>
                                By clicking on Send you accept that we can store
                                your contact details to manage emails from you
                                and to use them to contact you.
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default connect(null, { submitContactEmailForm })(ContactUs);
