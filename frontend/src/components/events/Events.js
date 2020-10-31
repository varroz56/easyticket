import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Events = () => {

    return (
        <div className="container events__container mt-4 bt-4">
            <Helmet>
                <title>Easy Ticket Events</title>
                <meta name='description' content='Events list' />
            </Helmet>
            <form className="form-inline">
                <select id="inputState" class="form-control  mr-4 pr-4">
                    <option selected>STATUS</option>
                    <option>...</option>
                </select>
                <div class="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="show_requests" checked="true" value="show_requests" />
                    <label className="form-check-label" for="show_requests">Requests</label>
                </div>
                <div className="form-check form-check-inline mr-4 pr-4">
                    <input className="form-check-input" type="checkbox" id="show_incidents" checked="true" value="show_incidents" />
                    <label className="form-check-label" for="show_incidents">Incidents</label>
                </div>
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            <table class="table table-striped table-sm table-dark">
                <thead>
                    <tr>
                        <th scope="col">Reference</th>
                        <th className="d-none d-sm-block d-md-block" scope="col">Category</th>
                        <th scope="col">Status</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td className="d-none d-sm-block d-md-block">Mark</td>
                        <td>Otto</td>
                        <td><Link exact to="/event-details" className="btn-outline-success waves-effect btn btn-sm mr-auto" >Open</Link></td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}

export default Events;