import React from 'react';
import PropTypes from 'prop-types';

const Footer = (props) => {
    const strMssg = props.footerBannerText.replace(/&copy;/g, "\u00A9").replace(/&currentYear;/g, new Date().getFullYear());

    return(
        <footer>
            <div className="footer">
                <div className="footer-inner-container">
                    <span className="footer-text-float-right">
                        <span className="footer-contact-text">{props.footerBannerContactText}</span> <span>{props.footerBannerContactDetail}</span>
                    </span>
                    <span className="footer-text-float-left">{strMssg}</span>
                </div>
            </div>
        </footer>
    )
};

PropTypes.Footer = {
    footerBannerText: PropTypes.string.isRequired,
    footerBannerContactText: PropTypes.string.isRequired,
    footerBannerContactDetail: PropTypes.string.isRequired
};


export default Footer;