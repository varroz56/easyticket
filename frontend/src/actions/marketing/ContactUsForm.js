// import axios to handle http requests
import axios from 'axios';
// import our alert
import { showAlert } from '../Alert';

const submitContactEmailForm = (
    first_name,
    last_name,
    email,
    subject,
    message,
    subscribe_me
) => async dispatch => {
    // set the header
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // to be able valid format before post request
    const contactbody = JSON.stringify({ first_name, last_name, email, subscribe_me });
    const messagebody = JSON.stringify({ email, subject, message });

    // send axios post first to find or create new contact
    axios.post(`${process.env.REACT_APP_API_URL}/api/info/create-contact/`,
        contactbody,
        config).then(res1 => {
            // then to create and send message
            axios.post(`${process.env.REACT_APP_API_URL}/api/info/create-message/`,
                messagebody,
                config).then(res2 => {
                    // Show success alert if everything went well
                    dispatch(showAlert('Message sent successfully, subscribe preference has been updated', 'success'));
                }).catch(err => {
                    // If message failed to send
                    dispatch(showAlert('Failed to send message, please try again', 'error'));
                })
        }).catch(err => {
            // If failed to find or create contact
            dispatch(showAlert('Failed to create or find contact and send message, please try again', 'error'));
        })
};


export default submitContactEmailForm;