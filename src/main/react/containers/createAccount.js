
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import {Container} from "@follett/common-ui";

const contentElement = document.getElementById('content');

import Header from "../components/sellback/header";
import HeaderBanner from '../components/sellback/headerBanner';
import Footer from "../components/sellback/footer";
import CreateForm from "../components/account/createForm";
import SwitchForm from "../components/account/switchForm";

export default class CreateAccount extends Component {


    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        let displaySpinner = this.state.displaySpinner;

        return (
            <Container>
                { displaySpinner ? <div className="spinner"/> : null }
                <HeaderBanner banner="Return to Walmart.com" url="#"/>
                <Container>
                    <Header brandLogo="https://valore-images-qa.s3.amazonaws.com/sellback/landing/walmart/header-logo.svg" isDisplayed="true" hideAccountLink="true" />

                    <section className="form-section">
                        <CreateForm className="auth-form" />
                        <SwitchForm className="auth-switchform" toSignIn="true" />
                    </section>

                    <Footer footerBannerText="© 2021 Walmart Stores, Inc. in partnership with © ValoreBooks"
                            footerBannerContactText="Contact Support"
                            footerBannerContactDetail="support@valorebooks.com" />
                </Container>

            </Container>
        )
    }
}

ReactDOM.render(<CreateAccount />, contentElement);