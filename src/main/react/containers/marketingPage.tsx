import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Footer from "../components/textbooks/footer";
import PageHeader from "../components/header/pageHeader";
import MarketingPageContent from "../components/marketingPage/marketingPageContent";

const contentElement: HTMLElement = document.getElementById('content')!;
const urlOrigin = contentElement.getAttribute("urlOrigin");
const path = contentElement.getAttribute("path")||'';


export default class MarketingPage extends Component {

    constructor(props: {}) {
        super(props)
        this.state = {};
    }

    render() {
        return (
            <div>
                <PageHeader domain={urlOrigin} showSearch={true} handleNoResults={this.handleNoResults}/>
                <MarketingPageContent path={path} />
                <Footer domain={urlOrigin}/>
            </div>
        );
    }
}

ReactDOM.render(<MarketingPage />, contentElement);
