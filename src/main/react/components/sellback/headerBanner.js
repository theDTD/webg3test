import React from 'react';
import PropTypes from 'prop-types';

const HeaderBanner = (props) => {
    return (
        <div className="header-banner">
            <span className="header-banner-retsym">&lt;</span>
            <span className="header-banner-text"><a href={props.url}>{props.banner}</a></span>
        </div>
    )
};

PropTypes.HeaderBanner = {
    banner: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
};

export default HeaderBanner;