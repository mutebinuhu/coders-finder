import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'


const Alert = ({alerts}) => {
    return (
        <div>
            {alerts !== null && alerts.length > 0 && alerts.map(alert =>(
                <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                    {alert.msg}
                </div>
            ))}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        alerts: state.alert
    }
}
export default connect(mapStateToProps) (Alert);
