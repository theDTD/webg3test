import React from 'react';
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TestRenderer from "react-test-renderer";
import {Container} from "@follett/common-ui";
import Payment from "../../../main/react/containers/payment";
import HeaderBanner from "../../../main/react/components/sellback/headerBanner";
import CheckPaymentForm from "../../../main/react/components/payment/checkPaymentForm";

configure({adapter: new Adapter()});

describe('render', () => {
    it("Payment should render properly", () => {
        const component = <Payment/>;
        const renderedComponent = TestRenderer.create(component);
        const root = renderedComponent.root;

        const mainContainer = root.findByType(Container);
        const mainContainerContents = mainContainer.props.children;
        expect(mainContainerContents.length).toEqual(3);

        const headerBanner = mainContainerContents[1];
        expect(headerBanner.type).toEqual(HeaderBanner);
        expect(headerBanner.props.banner).toEqual('headerBannerText');
        expect(headerBanner.props.url).toEqual('headerBannerUrl');

        const checkPaymentForm = mainContainerContents[2];
        expect(checkPaymentForm.type).toEqual(CheckPaymentForm);
    })
})

describe('removeItem', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    const flushAllPromises = () => new Promise((resolve) => setImmediate(resolve));

    it('should remove an item from the list successfully', async () => {
        const wrapper = shallow(<Payment/>);
        const componentInstance = wrapper.instance();
        const item = {
            productDetails: {productCode: '9780000000019'},
            addedItem: {id: 123, cartId: 12}
        };
        componentInstance.setState({
            itemList: [item],
            hasRemovedItem: false,
            displaySpinner: true
        });

        fetch.mockResponseOnce(JSON.stringify({}), {status: 200});

        componentInstance.removeItem(item);

        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual('/vb/sellback/removeItem?id=123');

        await flushAllPromises();

        expect(wrapper.state('itemList').length).toEqual(0);
        expect(wrapper.state('hasRemovedItem')).toEqual(true);
        expect(wrapper.state('removedItem').addedItem.id).toEqual(123);
        expect(wrapper.state('removedItemIndex')).toEqual(0);
        expect(wrapper.state('itemTotal')).toEqual('0.00');
        expect(wrapper.state('errorText')).toEqual('');
        expect(wrapper.state('displaySpinner')).toEqual(false);
    });

    it('should not remove an item from the list when the status is not 200', async () => {
        const wrapper = shallow(<Payment/>);
        const componentInstance = wrapper.instance();
        const item = {
            productDetails: {productCode: '9780000000019'},
            addedItem: {id: 123, cartId: 12}
        };
        componentInstance.setState({
            itemList: [item],
            hasRemovedItem: false,
            displaySpinner: true
        });

        fetch.mockResponseOnce(JSON.stringify({}), {status: 400});

        componentInstance.removeItem(item);

        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual('/vb/sellback/removeItem?id=123');

        await flushAllPromises();

        expect(wrapper.state('itemList').length).toEqual(1);
        expect(wrapper.state('hasRemovedItem')).toEqual(false);
        expect(wrapper.state('removedItem')).toEqual(null);
        expect(wrapper.state('removedItemIndex')).toEqual(null);
        expect(wrapper.state('errorText')).toEqual('An error occurred. Please try again later.');
        expect(wrapper.state('displaySpinner')).toEqual(false);
    });

    it('should not remove an item from the list when exception occurs', async () => {
        const wrapper = shallow(<Payment/>);
        const componentInstance = wrapper.instance();
        const item = {
            productDetails: {productCode: '9780000000019'},
            addedItem: {id: 123, cartId: 12}
        };
        componentInstance.setState({
            itemList: [item],
            hasRemovedItem: false,
            displaySpinner: true,
        });

        fetch.mockRejectOnce('Rejected');

        componentInstance.removeItem(item);

        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual('/vb/sellback/removeItem?id=123');

        await flushAllPromises();

        expect(wrapper.state('itemList').length).toEqual(1);
        expect(wrapper.state('hasRemovedItem')).toEqual(false);
        expect(wrapper.state('removedItem')).toEqual(null);
        expect(wrapper.state('removedItemIndex')).toEqual(null);
        expect(wrapper.state('errorText')).toEqual('An error occurred. Please try again later.');
        expect(wrapper.state('displaySpinner')).toEqual(false);
    });
});