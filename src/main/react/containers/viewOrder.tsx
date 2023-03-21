import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Footer from "../components/textbooks/footer";
import PageHeader from "../components/header/pageHeader";
import ViewOrderContent from "../components/viewOrder/viewOrderContent";
import ViewOrderDialog from "../components/viewOrder/viewOrderDialog";

const contentElement: HTMLElement = document.getElementById('content')!;
const urlOrigin = contentElement.getAttribute("urlOrigin");
const paramsAttr = contentElement?.getAttribute("params") || "";
const params = paramsAttr ? JSON.parse(paramsAttr) : "";

interface ViewOrderProps {}
interface ViewOrderState {
    searchValue: string,
    handleNoResults: boolean,
    openDialog: boolean
}

export default class ViewOrder extends Component<ViewOrderProps, ViewOrderState> {

    constructor(props: ViewOrderProps) {
        super(props)
        this.state = {
            searchValue: params.search || "",
            hasNoResults: !!params.error,
            openDialog: false
        };

        this.state = {
            searchValue: params.search || "",
            hasNoResults: !!params.error,
            openDialog: false
        };

        this.handleNoResults = this.handleNoResults.bind(this);
        this.handleDialog = this.handleDialog.bind(this);
    }

    handleNoResults(query: string) {
        this.setState({
            searchValue: query,
            hasNoResults: true
        });
    }
    handleDialog = (value: boolean) => {
        this.setState({
            openDialog: value
        })
    }

    render() {
        return (
            <div className="bg-white view-order">
                { this.state.openDialog &&
                <ViewOrderDialog isOpen={this.handleDialog} />
                }
                <PageHeader domain={urlOrigin} showSearch={true} handleNoResults={this.handleNoResults}/>
                <ViewOrderContent toggleDialog={this.handleDialog}/>
                <Footer domain={urlOrigin}/>
            </div>
        );
    }
}

ReactDOM.render(<ViewOrder />, contentElement);
