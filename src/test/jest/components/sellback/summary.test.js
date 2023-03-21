import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Summary from '../../../../main/react/components/sellback/summary';

configure({ adapter: new Adapter() });

describe('Summary', () => {
    it('should render properly', () => {
        const component = <Summary hideDisclaimerTextAndButton={false} itemCount={2} itemTotal={"72.95"}/>;
        const renderedComponent = renderer.create(component);
        const root = renderedComponent.root;

        const summary = root.findByType(Summary).type;
        expect(summary).toEqual(Summary);

        const summaryProps = root.findByType(Summary).props;
        expect(summaryProps.itemCount).toEqual(2);
        expect(summaryProps.hideDisclaimerTextAndButton).toEqual(false);
        expect(summaryProps.itemTotal).toEqual("72.95");

        const summaryDiv = root._fiber.child.stateNode;
        expect(summaryDiv.type).toEqual("div");
        expect(summaryDiv.props.className).toEqual("summary");
        expect(summaryDiv.props.children.length).toEqual(3);

        const summaryFirstDiv = summaryDiv.props.children[0];
        expect(summaryFirstDiv.type).toEqual("div");
        expect(summaryFirstDiv.props.className).toEqual("summary-title");
        expect(summaryFirstDiv.props.children.type).toEqual("span");
        expect(summaryFirstDiv.props.children.props.children).toEqual("Sellback summary");

        const summarySecondDiv = summaryDiv.props.children[1];
        expect(summarySecondDiv.type).toEqual("div");
        expect(summarySecondDiv.props.children[0].type).toEqual("p");
        expect(summarySecondDiv.props.children[0].props.className).toEqual("summary-item");

        const summarySecondDivInner = summarySecondDiv.props.children[0].props.children;
        expect(summarySecondDivInner.length).toEqual(2);

        const summarySecondDivInnerFirst = summarySecondDivInner[0];
        expect(summarySecondDivInnerFirst.type).toEqual("div");
        expect(summarySecondDivInnerFirst.props.className).toEqual("summary-item-left");
        expect(summarySecondDivInnerFirst.props.children.type).toEqual("span");
        expect(summarySecondDivInnerFirst.props.children.props.className).toEqual("summary-item-left-text");
        expect(summarySecondDivInnerFirst.props.children.props.children).toEqual(["Total (", 2, " ", "items", ")"]);

        const summarySecondDivInnerSecond = summarySecondDivInner[1];
        expect(summarySecondDivInnerSecond.type).toEqual("span");
        expect(summarySecondDivInnerSecond.props.className).toEqual("summary-item-right");
        expect(summarySecondDivInnerSecond.props.children).toEqual(["$", "72.95"]);

        const disclaimerDiv = summaryDiv.props.children[2];
        expect(disclaimerDiv.type).toEqual("div");
        expect(disclaimerDiv.props.className).toEqual("summary-disclaimer");
        expect(disclaimerDiv.props.children.length).toEqual(4);

        const disclaimerDivChildren = disclaimerDiv.props.children;
        expect(disclaimerDiv.props.children[0].type).toEqual("p");
        expect(disclaimerDiv.props.children[0].props.children).toEqual("Please note that we do not buy back books with broken covers, water damage, or excessive highlighting.");
        expect(disclaimerDiv.props.children[1].type).toEqual("p");
        expect(disclaimerDiv.props.children[1].props.children).toEqual("Do not sell back any books that you have rented. If you are unsure if you have a rental book, contact your bookstore for assistance before selling. Any rental or library books you sell will not be returned and you may incur additional fees from your institution.");
        expect(disclaimerDiv.props.children[2].type).toEqual("p");
        expect(disclaimerDiv.props.children[2].props.children).toEqual("The minimum sellback order is $15. You may only sell one copy of the same ISBN.");
        expect(disclaimerDiv.props.children[3].type).toEqual("div");
        expect(disclaimerDiv.props.children[3].props.className).toEqual("summary-button-container");

        const summaryButton = disclaimerDiv.props.children[3].props.children;
        expect(summaryButton.type).toEqual("button");
        expect(summaryButton.props.className).toEqual("summary-button");
        expect(summaryButton.props.children.type).toEqual("span");
        expect(summaryButton.props.children.props.className).toEqual("summary-button-text");
        expect(summaryButton.props.children.props.children).toEqual("Sell these books");
    });
    it('should not render disclaimer', () => {
        const component = <Summary hideDisclaimerTextAndButton={true} itemCount={2} itemTotal={"72.95"}/>;
        const renderedComponent = renderer.create(component);
        const root = renderedComponent.root;

        const summary = root.findByType(Summary).type;
        expect(summary).toEqual(Summary);

        const summaryProps = root.findByType(Summary).props;
        expect(summaryProps.itemCount).toEqual(2);
        expect(summaryProps.hideDisclaimerTextAndButton).toEqual(true);
        expect(summaryProps.itemTotal).toEqual("72.95");

        const summaryDiv = root._fiber.child.stateNode;
        expect(summaryDiv.type).toEqual("div");
        expect(summaryDiv.props.className).toEqual("summary");
        expect(summaryDiv.props.children.length).toEqual(3);

        const summaryFirstDiv = summaryDiv.props.children[0];
        expect(summaryFirstDiv.type).toEqual("div");
        expect(summaryFirstDiv.props.className).toEqual("summary-title");
        expect(summaryFirstDiv.props.children.type).toEqual("span");
        expect(summaryFirstDiv.props.children.props.children).toEqual("Sellback summary");

        const summarySecondDiv = summaryDiv.props.children[1];
        expect(summarySecondDiv.type).toEqual("div");
        expect(summarySecondDiv.props.children[0].type).toEqual("p");
        expect(summarySecondDiv.props.children[0].props.className).toEqual("summary-item");

        const summarySecondDivInner = summarySecondDiv.props.children[0].props.children;
        expect(summarySecondDivInner.length).toEqual(2);

        const summarySecondDivInnerFirst = summarySecondDivInner[0];
        expect(summarySecondDivInnerFirst.type).toEqual("div");
        expect(summarySecondDivInnerFirst.props.className).toEqual("summary-item-left");
        expect(summarySecondDivInnerFirst.props.children.type).toEqual("span");
        expect(summarySecondDivInnerFirst.props.children.props.className).toEqual("summary-item-left-text");
        expect(summarySecondDivInnerFirst.props.children.props.children).toEqual(["Total (", 2, " ", "items", ")"]);

        const summarySecondDivInnerSecond = summarySecondDivInner[1];
        expect(summarySecondDivInnerSecond.type).toEqual("span");
        expect(summarySecondDivInnerSecond.props.className).toEqual("summary-item-right");
        expect(summarySecondDivInnerSecond.props.children).toEqual(["$", "72.95"]);
    });
    it('should render with item text', () => {
        const component = <Summary hideDisclaimerTextAndButton={true} itemCount={1} itemTotal={"72.95"}/>;
        const renderedComponent = renderer.create(component);
        const root = renderedComponent.root;

        const summary = root.findByType(Summary).type;
        expect(summary).toEqual(Summary);

        const summaryProps = root.findByType(Summary).props;
        expect(summaryProps.itemCount).toEqual(1);
        expect(summaryProps.hideDisclaimerTextAndButton).toEqual(true);
        expect(summaryProps.itemTotal).toEqual("72.95");

        const summaryDiv = root._fiber.child.stateNode;
        expect(summaryDiv.type).toEqual("div");
        expect(summaryDiv.props.className).toEqual("summary");
        expect(summaryDiv.props.children.length).toEqual(3);

        const summaryFirstDiv = summaryDiv.props.children[0];
        expect(summaryFirstDiv.type).toEqual("div");
        expect(summaryFirstDiv.props.className).toEqual("summary-title");
        expect(summaryFirstDiv.props.children.type).toEqual("span");
        expect(summaryFirstDiv.props.children.props.children).toEqual("Sellback summary");

        const summarySecondDiv = summaryDiv.props.children[1];
        expect(summarySecondDiv.type).toEqual("div");
        expect(summarySecondDiv.props.children[0].type).toEqual("p");
        expect(summarySecondDiv.props.children[0].props.className).toEqual("summary-item");

        const summarySecondDivInner = summarySecondDiv.props.children[0].props.children;
        expect(summarySecondDivInner.length).toEqual(2);

        const summarySecondDivInnerFirst = summarySecondDivInner[0];
        expect(summarySecondDivInnerFirst.type).toEqual("div");
        expect(summarySecondDivInnerFirst.props.className).toEqual("summary-item-left");
        expect(summarySecondDivInnerFirst.props.children.type).toEqual("span");
        expect(summarySecondDivInnerFirst.props.children.props.className).toEqual("summary-item-left-text");
        expect(summarySecondDivInnerFirst.props.children.props.children).toEqual(["Total (", 1, " ", "item", ")"]);

        const summarySecondDivInnerSecond = summarySecondDivInner[1];
        expect(summarySecondDivInnerSecond.type).toEqual("span");
        expect(summarySecondDivInnerSecond.props.className).toEqual("summary-item-right");
        expect(summarySecondDivInnerSecond.props.children).toEqual(["$", "72.95"]);
    });

    it('should render with sell back price label', () => {
        const component = <Summary hideDisclaimerTextAndButton={true} itemCount={2} itemTotal={"72.95"} showPriceLabel={true} />;
        const renderedComponent = renderer.create(component);
        const root = renderedComponent.root;

        const summary = root.findByType(Summary).type;
        expect(summary).toEqual(Summary);

        const summaryProps = root.findByType(Summary).props;
        expect(summaryProps.itemCount).toEqual(2);
        expect(summaryProps.hideDisclaimerTextAndButton).toEqual(true);
        expect(summaryProps.itemTotal).toEqual("72.95");

        const summaryDiv = root._fiber.child.stateNode;
        expect(summaryDiv.type).toEqual("div");
        expect(summaryDiv.props.className).toEqual("summary");
        expect(summaryDiv.props.children.length).toEqual(3);

        const summaryFirstDiv = summaryDiv.props.children[0];
        expect(summaryFirstDiv.type).toEqual("div");
        expect(summaryFirstDiv.props.className).toEqual("summary-title");
        expect(summaryFirstDiv.props.children.type).toEqual("span");
        expect(summaryFirstDiv.props.children.props.children).toEqual("Sellback summary");

        const summarySecondDiv = summaryDiv.props.children[1];
        expect(summarySecondDiv.type).toEqual("div");
        expect(summarySecondDiv.props.children[0].type).toEqual("p");
        expect(summarySecondDiv.props.children[0].props.className).toEqual("summary-item");

        const summarySecondDivInner = summarySecondDiv.props.children[0].props.children;
        expect(summarySecondDivInner.length).toEqual(2);

        const summarySecondDivInnerFirst = summarySecondDivInner[0];
        expect(summarySecondDivInnerFirst.type).toEqual("div");
        expect(summarySecondDivInnerFirst.props.className).toEqual("summary-item-left");
        expect(summarySecondDivInnerFirst.props.children.type).toEqual("span");
        expect(summarySecondDivInnerFirst.props.children.props.className).toEqual("summary-item-left-text");
        expect(summarySecondDivInnerFirst.props.children.props.children).toEqual(["Total (", 2, " ", "items", ")"]);

        const summarySecondDivInnerSecond = summarySecondDivInner[1];
        expect(summarySecondDivInnerSecond.type).toEqual("span");
        expect(summarySecondDivInnerSecond.props.className).toEqual("summary-item-right");
        expect(summarySecondDivInnerSecond.props.children).toEqual(["$", "72.95"]);

        const sellbackDiv = summarySecondDiv.props.children[1];
        expect(sellbackDiv.type).toEqual("span");
        expect(sellbackDiv.props.className).toEqual("sell-back-price");
    });

    it('should render with shipping details', () => {
        const component = <Summary hideDisclaimerTextAndButton={true} itemCount={2} itemTotal={"72.95"} showShipping={true} />;
        const renderedComponent = renderer.create(component);
        const root = renderedComponent.root;

        const summary = root.findByType(Summary).type;
        expect(summary).toEqual(Summary);

        const summaryProps = root.findByType(Summary).props;
        expect(summaryProps.itemCount).toEqual(2);
        expect(summaryProps.hideDisclaimerTextAndButton).toEqual(true);
        expect(summaryProps.itemTotal).toEqual("72.95");

        const summaryDiv = root._fiber.child.stateNode;
        expect(summaryDiv.type).toEqual("div");
        expect(summaryDiv.props.className).toEqual("summary");
        expect(summaryDiv.props.children.length).toEqual(3);

        const summaryFirstDiv = summaryDiv.props.children[0];
        expect(summaryFirstDiv.type).toEqual("div");
        expect(summaryFirstDiv.props.className).toEqual("summary-title");
        expect(summaryFirstDiv.props.children.type).toEqual("span");
        expect(summaryFirstDiv.props.children.props.children).toEqual("Sellback summary");

        const summarySecondDiv = summaryDiv.props.children[1];
        expect(summarySecondDiv.type).toEqual("div");
        expect(summarySecondDiv.props.children[0].type).toEqual("p");
        expect(summarySecondDiv.props.children[0].props.className).toEqual("summary-item");

        const summarySecondDivInner = summarySecondDiv.props.children[0].props.children;
        expect(summarySecondDivInner.length).toEqual(2);

        const summarySecondDivInnerFirst = summarySecondDivInner[0];
        expect(summarySecondDivInnerFirst.type).toEqual("div");
        expect(summarySecondDivInnerFirst.props.className).toEqual("summary-item-left");
        expect(summarySecondDivInnerFirst.props.children.type).toEqual("span");
        expect(summarySecondDivInnerFirst.props.children.props.className).toEqual("summary-item-left-text");
        expect(summarySecondDivInnerFirst.props.children.props.children).toEqual(["Total (", 2, " ", "items", ")"]);

        const summarySecondDivInnerSecond = summarySecondDivInner[1];
        expect(summarySecondDivInnerSecond.type).toEqual("span");
        expect(summarySecondDivInnerSecond.props.className).toEqual("summary-item-right");
        expect(summarySecondDivInnerSecond.props.children).toEqual(["$", "72.95"]);

        const shippingDiv = summarySecondDiv.props.children[2];
        expect(shippingDiv.type).toEqual("p");
        expect(shippingDiv.props.className).toEqual("shipping-details");
        expect(shippingDiv.props.children[0].type).toEqual("span");
        expect(shallow(shippingDiv.props.children[0]).text()).toContain('Shipping');
        expect(shippingDiv.props.children[1].type).toEqual("span");
        expect(shallow(shippingDiv.props.children[1]).text()).toContain('Free');
    });
});