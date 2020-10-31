import React from 'react';
import { Helmet } from 'react-helmet';

const EventDetails = () => {
    return (
        < div className="container-fluid eventdetails__container mt-4 bt-4" >
            <Helmet>
                <title>Easy Ticket Event Detail</title>
                <meta name='description' content='Events Details' />
            </Helmet>
            <div className="row">
                <div className="col-12 col-md-6 col-lg-3">
                    <table class="table table-striped table-sm table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Reference</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td >Mark</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <table class="table table-striped table-sm table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <table class="table table-striped table-sm table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Created On</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <table class="table table-striped table-sm table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Created for</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <table class="table table-striped table-sm table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Opening Notes</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <table class="table table-striped table-sm table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Update Message</th>
                                <th scope="col">Updated on: </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th colspan="2" scope="row">loremfajseb;vo\bv'osibv;oankdiv;zklvn;lkxdnv;lxkn;lkdgn;kgn\b;oin;robin\s;roremfajseb;vo\bv'osibv;oankdiv;zklvn;lkxdnv;lxkn;lkdgn;kgn\b;oin;robin\s;roremfajseb;vo\bv'osibv;oankdiv;zklvn;lkxdnv;lxkn;lkdgn;kgn\b;oin;robin\s;roi</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="jumbotron jumbotron fixed-bottom eventdetails__jumbotron">
                <form className="inline-form ">
                    <div className="row form-row justify-content-end">
                        <div class="form-group col-12 col-md-6 col-lg-9">
                            <label for="exampleFormControlTextarea1">Update Notes</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" required />
                        </div>
                        <div className="form-group  col-12 col-md-6 col-lg-3">
                            <div className="form-group">
                                <label for="inputState">Status</label>
                                <select id="inputState" className="form-control" required>
                                    <option selected>STATUS</option>
                                    <option>...</option>
                                </select>
                                <button type="submit" className="btn btn-outline-success pt-2 mt-2 pb-2 mb-0 btn-lg">Update</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default EventDetails;