import React from 'react';

import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CheckPaymentForm from "../../../../main/react/components/payment/checkPaymentForm";
import renderer from "react-test-renderer";
import {Container} from "@follett/common-ui";
import Header from "../../../../main/react/components/sellback/header";
import Footer from "../../../../main/react/components/sellback/footer";
import ListItemCountBanner from "../../../../main/react/components/sellback/listItemCountBanner";
import Summary from "../../../../main/react/components/sellback/summary";
import SellbackListContainer from "../../../../main/react/components/sellback/sellbackListContainer";
import RadioGroup from "../../../../main/react/components/payment/radioGroup";

configure({adapter: new Adapter()});

describe('CheckPaymentForm', () => {
    it('CheckPaymentForm should render properly', () => {
        const images = {
            "headerLogo": "test.png",
            "upperSearch": "test.png",
            "lowerSearch": "test.png"
        };

        const data = [{
            "addedItem": {"id": 1, "price": 123, "state": "LOCKED"},
            "productDetails": {
                "image": "test image",
                "name": "test title",
                "isbn10": "1111111111",
                "productCode": "2222222222222"
            }
        }];
        const component = <CheckPaymentForm
            itemList={data}
            removeItem={() => {
            }}
            itemTotal={150}
            images={images}
            errorText={''}
        />;

        const renderedComponent = renderer.create(component);
        const root = renderedComponent.root;

        const checkPaymentForm = root.findByType(CheckPaymentForm);
        expect(checkPaymentForm.type).toEqual(CheckPaymentForm);

        const props = root.findByType(CheckPaymentForm).props;
        expect(props.itemTotal).toEqual(150);
        expect(props.itemList).toEqual(data);
        expect(props.images).toEqual(images);
        expect(props.removeItem).toBeDefined();

        const mainContainer = root.findByType(Container);
        const mainContainerContents = mainContainer.props.children;
        expect(mainContainerContents.length).toEqual(4);

        const header = mainContainerContents[0];
        expect(header.type).toEqual(Header);

        const paymentDiv = mainContainerContents[1];
        const paymentDivChildren = paymentDiv.props.children;
        const paymentDeliveryHeading = paymentDivChildren[0].props.children;
        expect(paymentDiv.type).toEqual("div");
        expect(shallow(paymentDeliveryHeading[0]).text()).toContain('Payment delivery');
        expect(shallow(paymentDeliveryHeading[2]).text()).toContain('Choose how to get paid:');

        const paymentOption = paymentDeliveryHeading[3];
        expect(paymentOption.type).toEqual("div");
        const radioGroup = paymentOption.props.children;
        expect(radioGroup.type).toEqual(RadioGroup);
        expect(radioGroup.props.options[0].label).toEqual('PayPal');
        expect(radioGroup.props.options[1].label).toEqual('Check');

        expect(shallow(paymentDeliveryHeading[6]).text()).toContain('Payment address');
        expect(paymentDeliveryHeading[8].type).toBe('form');

        const form = paymentDeliveryHeading[8].props.children;
        const formFirstRow = form[0].props.children;
        const firstNameInput = formFirstRow[0].props.children[1];
        const lastNameInput = formFirstRow[1].props.children[1];
        expect(firstNameInput.type).toBe('input');
        expect(firstNameInput.props.id).toBe('firstName');
        expect(lastNameInput.type).toBe('input');
        expect(lastNameInput.props.id).toBe('lastName');

        const formSecondRow = form[1].props.children;
        const address1 = formSecondRow[0].props.children[1];
        const address2 = formSecondRow[1].props.children[1];
        expect(address1.type).toBe('input');
        expect(address1.props.id).toBe('streetAddress1');
        expect(address2.type).toBe('input');
        expect(address2.props.id).toBe('streetAddress2');

        const formthirdRow = form[2].props.children;
        const city = formthirdRow[0].props.children[1];
        const state = formthirdRow[1].props.children[0].props.children[1];
        const zip = formthirdRow[1].props.children[1].props.children[1];
        expect(city.type).toBe('input');
        expect(city.props.id).toBe('city');
        expect(state.type).toBe('input');
        expect(state.props.id).toBe('state');
        expect(zip.type).toBe('input');
        expect(zip.props.id).toBe('zip');

        const formfourthRow = form[3].props.children;
        const email = formfourthRow[0].props.children[1];
        const mobile = formfourthRow[1].props.children[1];
        expect(email.type).toBe('input');
        expect(email.props.id).toBe('email');
        expect(mobile.type).toBe('input');
        expect(mobile.props.id).toBe('mobile');

        const formFooter = paymentDeliveryHeading[9];
        expect(formFooter.type).toEqual("div");
        expect(formFooter.props.className).toEqual("check-payment-form-footer");

        const formCheck1 = formFooter.props.children[0];
        expect(formCheck1.type).toEqual("div");
        expect(formCheck1.props.className).toEqual("form-check");
        const formCheck1Label = formCheck1.props.children;
        expect(formCheck1Label.type).toEqual("label");
        expect(formCheck1Label.props.className).toEqual("custom-checkbox");
        const formCheck1Input = formCheck1Label.props.children[0];
        expect(formCheck1Input.type).toEqual("input");
        expect(formCheck1Input.props.type).toEqual("checkbox");
        const formCheck1Span = formCheck1Label.props.children[1];
        expect(formCheck1Span.type).toEqual("span");
        expect(formCheck1Span.props.children).toEqual("Send me special offers from Walmart.");
        const formCheck2 = formFooter.props.children[1];
        expect(formCheck2.type).toEqual("div");
        expect(formCheck2.props.className).toEqual("form-check");
        const formCheck2Label = formCheck2.props.children;
        expect(formCheck2Label.type).toEqual("label");
        expect(formCheck2Label.props.className).toEqual("custom-checkbox");
        const formCheck2Input = formCheck2Label.props.children[0];
        expect(formCheck2Input.type).toEqual("input");
        expect(formCheck2Input.props.type).toEqual("checkbox");
        const formCheck2Span = formCheck2Label.props.children[1];
        expect(formCheck2Span.type).toEqual("span");
        expect(formCheck2Span.props.children[0]).toEqual("I confirm that the textbooks that I am selling are authentic, authorized, and lawfully acquired.");
        expect(shallow(formCheck2Span.props.children[1])).toEqual(shallow(<br />));
        const formCheck2SpanSmall = formCheck2Span.props.children[2];
        expect(formCheck2SpanSmall.type).toEqual("small");
        expect(shallow(formCheck2SpanSmall).text()).toEqual("Walmart has partnered with ValoreBooks to provide this online buyback service. Please do not sell back any books that you have rented. If you are unsure if you have a rental book, contact your bookstore for assistance before selling. Any rental or library books you sell will not be returned and you may incur additional fees from your institution.");
        const textRight = formFooter.props.children[2];
        expect(textRight.type).toEqual("div");
        expect(textRight.props.className).toEqual("text-right");
        const submitBtn = textRight.props.children;
        expect(submitBtn.type).toEqual("button");
        expect(submitBtn.props.type).toEqual("submit");
        expect(submitBtn.props.children).toEqual("Complete sellback");

        const summaryDiv = mainContainerContents[1].props.children[1].props.children;
        const errorDiv = summaryDiv[0];
        const listItemCountBanner = summaryDiv[1];
        const summary = summaryDiv[2];
        const sellbackListContainer = summaryDiv[3];
        expect(errorDiv.type).not.toBeDefined();
        expect(listItemCountBanner.type).toBe(ListItemCountBanner);
        expect(summary.type).toBe(Summary);
        expect(sellbackListContainer.type).toBe(SellbackListContainer);

        const formFooterSm = mainContainerContents[2];
        expect(formFooterSm.type).toEqual("div");
        expect(formFooterSm.props.className).toEqual("check-payment-form-footer-sm");

        const formFooterSmFormCheck1 = formFooterSm.props.children[0];
        expect(formFooterSmFormCheck1.type).toEqual("div");
        expect(formFooterSmFormCheck1.props.className).toEqual("form-check");
        expect(formFooterSmFormCheck1.props.children.type).toEqual("label");
        expect(formFooterSmFormCheck1.props.children.props.className).toEqual("custom-checkbox");
        expect(formFooterSmFormCheck1.props.children.props.children[0].type).toEqual("input");
        expect(formFooterSmFormCheck1.props.children.props.children[0].props.type).toEqual("checkbox");
        expect(formFooterSmFormCheck1.props.children.props.children[1].type).toEqual("span");
        expect(formFooterSmFormCheck1.props.children.props.children[1].props.children).toEqual("Send me special offers from Walmart.");

        const formFooterSmFormCheck2 = formFooterSm.props.children[1];
        expect(formFooterSmFormCheck2.type).toEqual("div");
        expect(formFooterSmFormCheck2.props.className).toEqual("form-check");
        expect(formFooterSmFormCheck2.props.children.type).toEqual("label");
        expect(formFooterSmFormCheck2.props.children.props.className).toEqual("custom-checkbox");
        expect(formFooterSmFormCheck2.props.children.props.children[0].type).toEqual("input");
        expect(formFooterSmFormCheck2.props.children.props.children[0].props.type).toEqual("checkbox");
        expect(formFooterSmFormCheck2.props.children.props.children[1].type).toEqual("span");
        expect(formFooterSmFormCheck2.props.children.props.children[1].props.children[0]).toEqual("I confirm that the textbooks that I am selling are authentic, authorized, and lawfully acquired.");
        expect(shallow(formFooterSmFormCheck2.props.children.props.children[1].props.children[1])).toEqual(shallow(<br />));
        expect(formFooterSmFormCheck2.props.children.props.children[1].props.children[2].type).toEqual("small");
        expect(shallow(formFooterSmFormCheck2.props.children.props.children[1].props.children[2]).text()).toEqual("Walmart has partnered with ValoreBooks to provide this online buyback service. Please do not sell back any books that you have rented. If you are unsure if you have a rental book, contact your bookstore for assistance before selling. Any rental or library books you sell will not be returned and you may incur additional fees from your institution.");

        const formFooterSmTextCenter = formFooterSm.props.children[2];
        expect(formFooterSmTextCenter.type).toEqual("div");
        expect(formFooterSmTextCenter.props.className).toEqual("text-center");
        expect(formFooterSmTextCenter.props.children.type).toEqual("button");
        expect(formFooterSmTextCenter.props.children.props.type).toEqual("submit");
        expect(formFooterSmTextCenter.props.children.props.children).toEqual("Complete sellback");

        const footer = mainContainerContents[3];
        expect(footer.type).toEqual(Footer);
    });
});

