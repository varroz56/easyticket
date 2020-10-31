import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const SelectEvent = () => {
    return (
        <div className="container selectevent__container">
            <Helmet>
                <title>Easy Ticket Select Event</title>
                <meta name='description' content='Select new Event' />
            </Helmet>
            <div className="row howto__section__head">
                <div className="col-12 navbar">
                    <p className="navbar-brand">Browse or search in our categories</p>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2 block" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    <Link exact to="/submit-event" className="btn btn-outline-success my-2 my-sm-0">Can't find or not sure? Click here!</Link>

                </div>
            </div>
            <div className="row howto__section_row">
                <div className="col-12 howto__section__content">

                    <button className="btn btn-outline-success btn-block" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        Button with data-target
                    </button>
                    <div className="collapse howto__collapse" id="collapseExample">
                        <div className="card card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectEvent;