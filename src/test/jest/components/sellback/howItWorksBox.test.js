import React from 'react';
import renderer from 'react-test-renderer';
import HowItWorksBox from '../../../../main/react/components/sellback/howItWorksBox';

const renderBaseTest = (props) => {

    const component = <HowItWorksBox icon={props.icon} header={props.header}
                        body={props.body}
                        style={props.style}/>;
    const renderedComponent = renderer.create(component);
    const root = renderedComponent.root;

    const howItWorksBox = root.findByType(HowItWorksBox).type;
    expect(howItWorksBox).toEqual(HowItWorksBox);

    const howItWorksBoxProps = root.findByType(HowItWorksBox).props;
    expect(howItWorksBoxProps.icon).toEqual(props.icon);
    expect(howItWorksBoxProps.header).toEqual(props.header);
    expect(howItWorksBoxProps.body).toEqual(props.body);
    expect(howItWorksBoxProps.style).toEqual(props.style);
};

describe('HowItWorksBox', () => {
    it('test sellYourBooks', () => {
        renderBaseTest({
            icon: "",
            header: "Sell your books",
            body: "Get an instant quote from ValoreBooks, sell only the textbooks you want to.",
            style: "how-it-works-box how-it-works-box-1"
        });
    });
    it('test shipForFree', () => {
        renderBaseTest({
            icon: "",
            header: "Ship for free",
            body: "Print your free shipping label and drop your books off at your nearest USPS.",
            style: "how-it-works-box how-it-works-box-2"
        });
    });
    it('test getPaid', () => {
        renderBaseTest({
            icon: "",
            header: "Get paid",
            body: "Select either PayPal or check to get paid for your textbooks.",
            style: "how-it-works-box how-it-works-box-3"
        });
    });
});