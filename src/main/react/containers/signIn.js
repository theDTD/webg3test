
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import {Container} from "@follett/common-ui";

const contentElement = document.getElementById('content');

const staticData = JSON.parse(contentElement.getAttribute('staticData'));
const images = staticData.images;

import Header from "../components/sellback/header";
import HeaderBanner from '../components/sellback/headerBanner';
import Footer from "../components/sellback/footer";
import SignInForm from "../components/account/signInForm";

export default class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let displaySpinner = this.state.displaySpinner;

        return (
            <Container>
                <HeaderBanner banner="Return to Walmart.com" url="#"/>
                { displaySpinner ? <div className="spinner"/> : null }
                <Container>
                    <Header brandLogo={images['headerLogo']} isDisplayed="true" hideAccountLink="true" />
                        <section className="form-section" >
                            <SignInForm className="sign-in-form"></SignInForm>
                        </section>
                    <Footer footerBannerText="© 2021 Walmart Stores, Inc. in partnership with © ValoreBooks"
                            footerBannerContactText="Contact Support"
                            footerBannerContactDetail="support@valorebooks.com" />
                </Container>
            </Container>
        )
    }
}

ReactDOM.render(<SignIn />, contentElement);