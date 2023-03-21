import React, { Component } from 'react';
import ReactDOM from "react-dom";
import SeoEditContent from "../components/seoTest/editContent";

const contentElement: HTMLElement = document.getElementById('seoEditContent')!;
const initialData = contentElement?.getAttribute("initialData") || "{}";

export default class SeoTestEdit extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div id="container">
                <h1>Edit</h1>
                <SeoEditContent initialData={JSON.parse(initialData)} />
            </div>
        )
    }

}

ReactDOM.render(<SeoTestEdit />, contentElement)