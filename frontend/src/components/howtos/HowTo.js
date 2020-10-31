import React from 'react'
import axios from 'axios';
// import helmet to have custom page title
import { Helmet } from 'react-helmet';


export default class HowTo extends React.Component {
    state = {
        howtos: []
    };


    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/api/howtos/get-howtos/`)
            .then(res => {
                const howtos = res.data;
                //const searchResult = howtos;
                this.setState({ howtos });

            })
    }

    render() {
        return (
            < div className="container howto__container pt-5" >
                <Helmet>
                    <title>Easy Ticket How-Tos</title>
                    <meta name="description" content="How-To page" />
                </Helmet>
                <div className="howto__section__head">
                    How-To Section
                </div>
                {this.state.howtos.map(howto =>
                    <div className="row howto__section_row">
                        <div className="col-12 howto__section__content">

                            <button className="btn btn-outline-success btn-block" type="button" data-toggle="collapse" data-target={"#" + howto.reference} aria-expanded="false" aria-controls={howto.reference}>
                                {howto.question}
                            </button>
                            <div className="collapse howto__collapse" id={howto.reference}>
                                <div className="card card-body">
                                    {howto.answer}
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
            </div >
        )
    }
}

