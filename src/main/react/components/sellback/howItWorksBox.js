import React from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HowItWorksBox = (props) => (
    <div className={`${props.style}`}>
        <div className="how-it-works-icon how-it-works-box-col-left">
            <FontAwesomeIcon icon={ props.icon } />
        </div>
        <div className="how-it-works-box-col-right">
            <p><span className="how-it-works-text-title">{ props.header }</span></p>
            <p><span className="how-it-works-text-body">{ props.body }</span></p>
        </div>
    </div>
);

PropTypes.HowItWorksBox = {
    icon: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    borderBottomColor: PropTypes.string.isRequired
};

export default HowItWorksBox;