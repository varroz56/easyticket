import React from 'react';
import { Helmet } from 'react-helmet';

const SubmitEvent = () => {
    return (
        <div className="container submitevent__container">
            <Helmet>
                <title>Easy Ticket Submit Event</title>
                <meta name='description' content='Submit new Event' />
            </Helmet>
            <form>
                <div className="form-group">
                    <label for="open_notes">Example textarea</label>
                    <textarea className="form-control" id="open_notes" rows="3"></textarea>
                </div>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SubmitEvent;