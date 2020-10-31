// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Helmet } from 'react-helmet';
// import { Link } from 'react-router-dom';

// const EventDetails = (props) => {
//     const [myevent, setMyEvent] = useState({});
//     const [myupdates, setMyUpdates] = useState({});


//     useEffect(() => {

//         const reference = props.match.params.id;


//         axios.get(`${process.env.REACT_APP_API_URL}/api/listings/event-details/${reference}`)
//             .then(res => {
//                 setMyEvent(res.data);
//                 console.log(myevent)

//             })
//             .catch(err => {

//             });
//     }, [props.match.params.id]);

//     useEffect(() => {
//         axios.get(`${process.env.REACT_APP_API_URL}/api/events/event-details/${myevent.id}`)
//             .then(res => {
//                 setMyUpdates(res.data);
//                 console.log(myupdates)
//             })
//             .catch(err => {

//             });
//     }, []);


//     const displayMyUpdates = () => {
//         let updateList = [];
//         myupdates.map(myupdate => {
//             updateList.push(
//                 <div className="row">
//                     <div className="col">
//                         <table class="table table-striped table-sm table-dark">
//                             <thead>
//                                 <tr>
//                                     <th scope="col">Update Message</th>
//                                     <th scope="col">Updated on: </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                     <th colspan="2" scope="row">{myupdate.update_message}</th>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             );
//         });
//     };

//     return (
//         <div className="container-fluid eventdetails__container mt-4 bt-4" >
//             <Helmet>
//                 <title>Easy Ticket Event Detail</title>
//                 <meta name='description' content='Events Details' />
//             </Helmet>
//             <div className="row mb-0 pb-0">
//                 <div className="col-12 col-md-6 col-lg-3 noside">
//                     <table class="table table-striped table-sm table-dark noside mb-0 pb-0">
//                         <thead>
//                             <tr>
//                                 <th scope="col">Reference</th>
//                                 <th scope="col">Status</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <th scope="row">{myevent.reference}</th>
//                                 <td >{myevent.status}</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//                 <div className="col-12 col-md-6 col-lg-3 noside">
//                     <table class="table table-striped table-sm table-dark noside mb-0 pb-0">
//                         <thead>
//                             <tr>
//                                 <th scope="col">Category</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <th scope="row">{myevent.sub_category}</th>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//                 <div className="col-12 col-md-6 col-lg-3 noside">
//                     <table class="table table-striped table-sm table-dark noside">
//                         <thead>
//                             <tr>
//                                 <th scope="col">Created On</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <th scope="row">{myevent.creted_on}</th>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//                 <div className="col-12 col-md-6 col-lg-3 noside">
//                     <table class="table table-striped table-sm table-dark noside">
//                         <thead>
//                             <tr>
//                                 <th scope="col">Created for</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <th scope="row">{myevent.created_for}</th>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//             <div className="row pt-0 mt-0">
//                 <div className="col noside pt-0 mt-0">
//                     <table class="table table-striped table-sm table-dark noside pt-0 mt-0">
//                         <thead>
//                             <tr>
//                                 <th scope="col">Opening Notes</th>

//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <th scope="row">{myevent.open_notes}</th>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//             {displayMyUpdates()}
//             <div className="jumbotron jumbotron fixed-bottom eventdetails__jumbotron">
//                 <form className="inline-form ">
//                     <div className="row form-row justify-content-end">
//                         <div class="form-group col-12 col-md-6 col-lg-9">
//                             <label for="exampleFormControlTextarea1">Update Notes</label>
//                             <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" required />
//                         </div>
//                         <div className="form-group  col-12 col-md-6 col-lg-3">
//                             <div className="form-group">
//                                 <label for="inputState">Status</label>
//                                 <select id="inputState" className="form-control" required>
//                                     <option selected>STATUS</option>
//                                     <option>...</option>
//                                 </select>
//                                 <button type="submit" className="btn btn-outline-success pt-2 mt-2 pb-2 mb-0 btn-lg">Update</button>
//                             </div>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div >
//     );
// };

// export default EventDetails;