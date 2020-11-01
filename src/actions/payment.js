import React, { } from 'react';
import axios from 'axios';
import {
    CUSTOMER_CREATE_OR_FIND_SUCCESS,
    CUSTOMER_CREATE_OR_FIND_FAIL,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    PAYMENT_SUCCESS,
    PAYMENT_FAIL
} from './types';


export const handle_payment = (
    email,
    paymentMethod,
    amount,
    user,
    ppackage,
    address_line_one,
    address_line_two,
    postcode,
    city,
    country,
    price_paid,
    add_update_shippingaddress

) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({
        'email': email,
        'payment_method_id': paymentMethod
    });

    try {
        // try to find or create user upon email and payment method
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/payments/find-or-create-customer/`,
            body,
            config
        );
        // if this works then try to get the payment 
        dispatch({
            type: CUSTOMER_CREATE_OR_FIND_SUCCESS
        });

        // id = res.data.id
        // amount = data['amount'],
        //     currency = 'eur',
        //     payment_method_types = ['card'],
        //     receipt_email = data['email'],
        //     customer = data['customer'],
        //     payment_method = data['payment_method'],
        //     confirm = True
        // // from the response and the held data create payment intent
        // const body = JSON.stringify({
        //     amount,
        //     currency,
        //     payment_method_types,
        //     receipt_email,
        //     customer,
        //     payment_method,
        //     confirm
        // })

        const res1 = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/payments/payment/`,
            body,
            config
        );



        try {
            // if this works, create order and update customer profile
            dispatch({
                type: PAYMENT_SUCCESS
            });

            try {

                const body = JSON.stringify({
                    "user": user,
                    "email": email,
                    "chosen_package": ppackage,
                    "address_line_one": address_line_one,
                    "address_line_two": address_line_two,
                    "postcode": postcode,
                    "city": city,
                    "country": country,
                    "price_paid": price_paid,
                    "days_given": ppackage.days_given,
                    "add_update_shippingaddress": add_update_shippingaddress
                })

                const res2 = await axios.post(
                    `${process.env.REACT_APP_API_URL}/api/payments/create-purchase/`,
                    body,
                    config
                );


                // if order created, then this will close down the transaction, 
                // user profile updated
                dispatch({
                    type: ORDER_CREATE_SUCCESS
                });
                // if the order failed
            } catch (err) {
                dispatch({
                    type: ORDER_CREATE_FAIL
                });
            }

            // if the payment failed
        } catch (err) {
            dispatch({
                type: PAYMENT_FAIL
            });
        }


        // if could not find customer or coulf not create
    } catch (err) {
        dispatch({
            type: CUSTOMER_CREATE_OR_FIND_FAIL
        });
    }
};
