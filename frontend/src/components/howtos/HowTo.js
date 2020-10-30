import React from 'react'
// import helmet to have custom page title
import { Helmet } from 'react-helmet';

const HowTo = () => {

    return (
        <div className="container howto__container pt-5">
            <Helmet>
                <title>Easy Ticket How-Tos</title>
                <meta name="description" content="How-To page" />
            </Helmet>
            <div className="row howto__section__head">
                <div className="col-12 navbar">
                    <p className="navbar-brand">Browse or search in our how-tos</p>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2 block" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>

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

export default HowTo;
