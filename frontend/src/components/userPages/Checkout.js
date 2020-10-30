// https://stripe.com/docs/stripe-js/react
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';


const CheckoutForm = () => {
    // signup form to have empty in this state
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        address_line_one: '',
        address_line_two: '',
        city: '',
        country: '',
        postcode: ''
    });

    let save_address = false;
    const { full_name, email, address_line_one, address_line_two, city, country, postcode } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleCheckBoxChange = (e) => {
        e.target.checked ? (save_address = true) : (save_address = false);
    };

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
    };

    return (
        <div className="container checkout__container mt-5 pb-5 mb-5">
            <div className="checkout__title">Please fill in the form and click on Pay to complete your purchase.</div>
            <form className="checkout__form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="col-md-6 mb-3 checkout__form__input">
                        <label for="full_name">Full Name</label>
                        <input type="text" onChange={(e) => onChange(e)} className="form-control" id="full_name" placeholder="Full Name" value={full_name} required />
                    </div>
                    <div className="col-md-6 mb-3 checkout__form__input">
                        <div className="form-group">
                            <label for="email">Email address</label>
                            <input type="email" onChange={(e) => onChange(e)} className="form-control" id="email" placeholder="Enter email" value={email} required />
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-6 mb-3  checkout__form__input">
                        <label for="address_line_one">Address Line 1</label>
                        <input type="text" onChange={(e) => onChange(e)} className="form-control" id="address_line_one" placeholder="Address Line 1" value={address_line_one} required />
                    </div>
                    <div className="col-md-6 mb-3 checkout__form__input">
                        <label for="address_line_two">Address Line 2</label>
                        <input type="text" onChange={(e) => onChange(e)} className="form-control" id="address_line_two" placeholder="Address Line 2" value={address_line_two} required />

                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-6 mb-3  checkout__form__input">
                        <label for="city">City</label>
                        <input type="text" onChange={(e) => onChange(e)} className="form-control" id="city" placeholder="City" value={city} required />
                    </div>
                    <div className="col-md-4 mb-3 checkout__form__input">
                        <label for="country">Country</label>
                        <input type="text" onChange={(e) => onChange(e)} className="form-control" id="country" placeholder="Country" value={country} required />

                    </div>
                    <div className="col-md-2 mb-3 checkout__form__input">
                        <label for="postcode">Postcode</label>
                        <input type="text" onChange={(e) => onChange(e)} className="form-control" id="postcode" placeholder="Postcode" value={postcode} required />
                    </div>
                </div>
                <div className="form-group  checkout__form__input">
                    <div className="form-check">
                        <input
                            name="save_address"
                            onChange={handleCheckBoxChange}
                            value={save_address}
                            type="checkbox"
                            className="form-check-input"
                            id="save_address"
                        />
                        <label className="save_address" for="save_address">
                            Save this as your new shipping address? If you have one already, selecting this will update the existing one.
      </label>
                    </div>
                </div>
                <div className="checkout__card">
                    <CardElement
                        options={{
                            hidePostalCode: true,
                            style: {
                                base: {
                                    fontSize: '25px',
                                    color: '#577372',
                                    '::placeholder': {
                                        color: '#577372',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                <button type="submit" className="btn-outline-success waves-effect btn btn-sm" disabled={!stripe}>
                    Pay
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;