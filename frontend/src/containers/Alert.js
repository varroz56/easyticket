//https://react-redux.js.org/using-react-redux/connect-mapstate
// using mapstate to return a plain object from a state and component what is needed by another components
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
    // if alert exists and it is not empty then show the alert
    //and apply the style
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
        <div key={alert.id} className={`alert alert-${alert.alertType} mt-3 mb-0 pt-3 pb-0 text-center`}>
            {alert.msg}
        </div>
    ));
// checking the types with proptypes
//https://reactjs.org/docs/typechecking-with-proptypes.html
Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);