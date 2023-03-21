import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Footer from "../components/textbooks/footer";
import PageHeader from "../components/header/pageHeader";
import ExtraMileBody from "../components/extraMileGuarantee/extraMileBody";

const contentElement: HTMLElement = document.getElementById('content')!;
const urlOrigin = contentElement.getAttribute("urlOrigin");
const paramsAttr = contentElement?.getAttribute("params") || "";
const params = paramsAttr ? JSON.parse(paramsAttr) : "";

interface ExtraMileGuaranteeProps {}

export default class ExtraMileGuarantee extends Component {

    constructor(props: ExtraMileGuaranteeProps) {
        super(props)
        this.state = {
            searchValue: params.search || "",
            hasNoResults: !!params.error
        };

        this.state = {
            searchValue: params.search || "",
            hasNoResults: !!params.error
        };

        this.handleNoResults = this.handleNoResults.bind(this);
    }

    handleNoResults(query: string) {
        this.setState({
            searchValue: query,
            hasNoResults: true
        });
    }

    render() {
        return (
            <div className="bg-white extra-mile-guarantee">
                <PageHeader domain={urlOrigin} showSearch={true} handleNoResults={this.handleNoResults}/>
                <ExtraMileBody/>
                <Footer domain={urlOrigin}/>
            </div>
        );
    }
}

ReactDOM.render(<ExtraMileGuarantee />, contentElement);
