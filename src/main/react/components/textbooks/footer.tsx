import React from 'react';
import Collapsible from "./collapsible";

interface FooterProps {
    domain: string;
}

const defaultProps = {
    domain: "https://www.valorebooks.com"
}

const Footer = (props: FooterProps & typeof defaultProps) => {
    const separator = () => {
        return (
            <img src="https://images.valorebooks.com/images/vb/web/footer/footer-bottom-vector.svg" alt="Section separator purple"/>
        )
    }

    const dedicatedSeal = () => {
        return (
            <div className="footer-seal">
                <img src="https://images.valorebooks.com/images/vb/web/sellback/10656_home/valore-logo1.svg" alt="ValoreBooks seal"/>
                <p>With our dedicated customer support team, you can rest easy knowing that we're doing everything we can to save you time, money, and stress</p>
            </div>
        )
    }

    const customerService = () => {
        return (
            <ul>
                <li key="cs-1"><a href="https://help.valorebooks.com" title="Support center">Support Center</a></li>
                <li key="cs-2"><a href="https://help.valorebooks.com/article/324-return-policies" title="Return policies">Return Policies</a></li>
                <li key="cs-3"><a href="https://help.valorebooks.com/article/224-shipping"
                       title="Shipping details">Shipping Details</a></li>
                <li key="cs-4"><a href={props.domain + "/the-ultimate-guide-to-sell-textbooks"} title="How to Sell Textbooks - The Ultimate Guide for Selling College Books">How to Sell Textbooks</a></li>
            </ul>
        )
    }

    const siteInformation = () => {
        return (
            <ul>
                <li key="si-1"><a href="https://help.valorebooks.com/article/337-legal-policies" title="Legal policies">Legal Policies</a></li>
                <li key="si-2"><a href={props.domain + "/Sitemap.do"} title="Site map">Site Map</a></li>
                <li key="si-3"><a href={props.domain + "/extra-mile-guarantee"} title="ValoreBooks guarantee">ValoreBooks Guarantee</a></li>
            </ul>
        )
    }

    const valoreAccounts = () => {
        return (
            <ul>
                <li key="va-1"><a href={props.domain + "/YourAccount.do"} title="View order status">View Order Status</a></li>
                <li key="va-2"><a href={props.domain + "/marketplace-sellers"} title="Marketplace sellers">Marketplace Sellers</a></li>
                <li key="va-3"><a href={props.domain + "/rental-marketplace"} title="Rental providers">Rental Providers</a></li>
                <li key="va-4"><a href={props.domain + "/affiliate-program"} title="Affiliates">Affiliates</a></li>
            </ul>
        )
    }

    const browseBooks = () => {
        return (
            <ul>
                <li key="bb-1"><a href={props.domain + "/top-books"} title="Top books">Top Books</a></li>
                <li key="bb-2"><a href={props.domain + "/top-textbooks-for-college"} title="Top textbooks">Top Textbooks</a></li>
                <li key="bb-3"><a href={props.domain + "/rent-textbooks"}
                       title="Rent textbooks">Rent Textbooks</a></li>
                <li key="bb-4"><a href={props.domain + "/textbook-rental-subjects"} title="Textbook rental subjects">Textbook Rental Subjects</a></li>
            </ul>
        )
    }

    const socialMedia = () => {
        return (
            <div className="footer-social-media">
                <ul>
                    <li key="sm-1"><a href="https://www.facebook.com/valorebooks" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                    <li key="sm-2"><a href="https://twitter.com/valorebooks" target="_blank"><i className="fab fa-twitter"></i></a></li>
                    <li key="sm-3"><a href="https://www.instagram.com/valorebooks/?hl=en" target="_blank"><i className="fab fa-instagram"></i></a></li>
                    <li key="sm-4"><a href="https://www.pinterest.com/valorebooks/" target="_blank"><i className="fab fa-pinterest"></i></a></li>
                </ul>
            </div>
        )
    }

    const disclaimerGrp = () => {
        return (
            <>
                <div className="footer-disclaimer-grp">
                <div className="footer-disclaimer">
                    <p>&#169; 2005-{new Date().getFullYear()}, <a href="/">ValoreBooks</a>. All Rights Reserved.</p>
                    <p>Designated trademarks and brands are the property of their respective owners.</p>
                </div>

                <div className="footer-logos">
                    <a href="https://nacs.org/" title="National Association Of College Stores" target="_blank">
                        <img src="https://img.valorebooks.com/images/vb/web/footer/nacs.png"
                             alt="National Association Of College Stores"/>
                    </a>
                    <a id="bbblink" className="ruhzbam"
                       href="https://www.bbb.org/us/ar/little-rock/profile/textbooks/valorebooks-0935-90387842#bbbseal"
                       title="ValoreBooks, Textbooks, Little Rock, AR">
                        <img id="bbblinkimg"
                             src="https://seal-arkansas.bbb.org/logo/ruhzbam/valorebooks-90387842.png" width="300"
                             height="68" alt="ValoreBooks, Textbooks, Little Rock, AR"/>
                    </a>
                </div>
            </div>
            </>
        )
    }

    const textbooksPageFooter = (
        <footer>
            {separator()}
            <div className="footer-content-wrapper">
                <div className="container desktop-only">
                    <div className="footer-grid">
                        {dedicatedSeal()}
                        <div className="links-customer-service">
                            <h6 className="footer-heading">Customer Service</h6>
                            {customerService()}
                        </div>
                        <div className="links-site-information">
                            <h6 className="footer-heading">Site Information</h6>
                            {siteInformation()}
                        </div>
                        <div className="links-valore-accounts">
                            <h6 className="footer-heading">Valore Accounts</h6>
                            {valoreAccounts()}
                        </div>
                        <div className="links-browse-books">
                            <h6 className="footer-heading">Browse Books</h6>
                            {browseBooks()}
                        </div>

                        {socialMedia()}

                        <div className="footer-social-media-col-2"></div>
                        <div className="footer-social-media-col-3"></div>
                        <div className="footer-social-media-col-4"></div>
                        <div className="footer-social-media-col-5"></div>

                    </div>
                </div>

                <div className="container desktop-only">
                    <div className="footer-disclaimer-grid">
                        <div className="footer-disclaimer-col-1"></div>
                        {disclaimerGrp()}
                    </div>
                </div>

                <div className="mobile-only">
                    <div className="container">

                        {dedicatedSeal()}

                        <Collapsible title="Customer Service" content={customerService()} />
                        <Collapsible title="Site Information" content={siteInformation()} />
                        <Collapsible title="Valore Accounts" content={valoreAccounts()} />
                        <Collapsible title="Browse Books" content={browseBooks()} />

                        {socialMedia()}

                        {disclaimerGrp()}

                    </div>
                </div>

            </div>
        </footer>
        );

        return textbooksPageFooter
    };

    export default Footer;