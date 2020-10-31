import React from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default class Events extends React.Component {
    state = {
        events: []
    };


    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/api/events/get-events/`)
            .then(res => {
                const events = res.data;
                this.setState({ events });

            })
    }

    render() {

        return (
            <div className="container events__container mt-4 bt-4">
                <Helmet>
                    <title>Easy Ticket Events</title>
                    <meta name='description' content='Events list' />
                </Helmet>
                {this.state.events.map(event =>
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
                                <th scope="row">{event.reference}</th>
                                <td className="d-none d-sm-block d-md-block">{event.sub_category}</td>
                                <td>{event.status}</td>
                                <td><Link exact to={`/event-details/${event.reference}`} className="btn-outline-success waves-effect btn btn-sm mr-auto" >Open</Link></td>
                            </tr>
                        </tbody>
                    </table>
                )
                }
            </div >
        )
    }

}