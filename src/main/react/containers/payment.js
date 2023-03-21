
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import {Container} from "@follett/common-ui";
import CheckPaymentForm from "../components/payment/checkPaymentForm";
import HeaderBanner from "../components/sellback/headerBanner";
const sellbackPath = "/vb/sellback";

const contentElement = document.getElementById('content');

const staticData = JSON.parse(contentElement.getAttribute('staticData'));
const images = staticData.images;
const headerBannerText = staticData.headerBannerData ? staticData.headerBannerData['text'] : null;
const headerBannerUrl = staticData.headerBannerData ? staticData.headerBannerData['url'] : null;

const initialItemData = JSON.parse(contentElement.getAttribute('initialItemData'));
const errorText = 'An error occurred. Please try again later.';

export default class Payment extends Component {


    constructor() {
        super();
        this.state = {
            itemList: initialItemData,
            hasRemovedItem: false,
            removedItem: null,
            removedItemIndex: null,
            itemTotal: initialItemData ? this.setItemTotal(initialItemData) : 0,
            errorText: '',
            displaySpinner: false
        };
        this.removeItem = this.removeItem.bind(this);
    }

    setItemTotal(itemList) {
        let totalTemp = 0;
        for (let i = 0; i < itemList.length; i++) {
            let price = 0;
            if (itemList[i].addedItem.state != "REMOVED_NOT_AVAILABLE") {
                price = itemList[i].addedItem.price;
            }
            totalTemp += price;
        }
        return parseFloat(totalTemp).toFixed(2);
    }

    removeItem(item) {
        this.setState({ displaySpinner: true });
        fetch(`${sellbackPath}/removeItem?id=${item.addedItem.id}`, {
            method: 'POST',
            body: JSON.stringify({cartId: item.addedItem.cartId})
        })
            .then(res => {
                if (res.status == 200) {

                    const currentData = [...this.state.itemList];

                    const index = currentData.indexOf(item);
                    currentData.splice(index, 1);

                    this.setState({
                        itemList: currentData,
                        hasRemovedItem: true,
                        removedItem: item,
                        removedItemIndex: index,
                        itemTotal: this.setItemTotal(currentData),
                        errorText: '',
                        displaySpinner: false
                    });

                } else {
                    this.setState({
                        errorText: errorText,
                        displaySpinner: false
                    });
                }
            })
            .catch(ex => {
                this.setState({
                    errorText: errorText,
                    displaySpinner: false
                });
            });
    }
    render() {
        let displaySpinner = this.state.displaySpinner;

        return (
            <Container maxWidth="false">
                { displaySpinner ? <div className="spinner"/> : null }
                {headerBannerText && <HeaderBanner banner={headerBannerText} url={headerBannerUrl}/>}
                <CheckPaymentForm itemList={this.state.itemList}  itemTotal={this.state.itemTotal} removeItem={this.removeItem} images={images} errorText={this.state.errorText}></CheckPaymentForm>
            </Container>
        )
    }
}

ReactDOM.render(<Payment />, contentElement);