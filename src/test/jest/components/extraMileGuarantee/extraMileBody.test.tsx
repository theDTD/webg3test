import React from "react";
import TestRenderer from "react-test-renderer";
import {configure, shallow} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

import ExtraMileBody from "../../../../main/react/components/extraMileGuarantee/extraMileBody";

configure({adapter: new Adapter()});

describe('ExtraMileBody', ()  =>{
    it("renders correctly", () => {
        const component = shallow(<ExtraMileBody/>);
        const renderedComponent = TestRenderer.create(component);
        const root = renderedComponent.root;

        const extraMileContainer = root.findByType("div");
        expect(extraMileContainer.props.className).toContain("container");

        const mainDivContents = extraMileContainer.props.children;
        expect(mainDivContents.length).toEqual(3);

        const imageContainer = mainDivContents[0];
        expect(imageContainer.type).toBe('div');
        expect(imageContainer.props.className).toContain('guarantee-image-container');
        expect(imageContainer.props.children.type).toBe('img');
        expect(imageContainer.props.children.props.src).toBe('https://images.valorebooks.com/images/vb/web/guarantee/Valore_guarantee.jpg');

        const textContainer = mainDivContents[1];
        expect(textContainer.type).toBe('div');
        expect(textContainer.props.className).toContain('guarantee-text');
        const textContainerChildren = textContainer.props.children;

        const headerText = textContainerChildren[0];
        expect(headerText.type).toBe('h1');
        expect(shallow(headerText).text()).toBe('At ValoreBooks, we promise the following:');

        const p1 = textContainerChildren[1];
        expect(p1.type).toBe('p');
        expect(shallow(p1).text()).toBe('To refund your money if there\'s any problem. If your order arrives in poor condition or you received a different item, you can return it within 30 days for a full refund.   Learn more');
        expect(p1.props.children[2].props.href).toBe('https://help.valorebooks.com/article/324-return-policies');

        const p2 = textContainerChildren[2];
        expect(p2.type).toBe('p');
        expect(shallow(p2).text()).toBe('To offer textbook rentals at unbeatable prices. If you rent a book from us and find a lower price within 7 days, we\'ll refund the difference. Simply contact us with the details.');
        expect(p2.props.children[2].props.href).toBe('https://help.valorebooks.com/');

        const p3 = textContainerChildren[3];
        expect(p3.type).toBe('p');
        expect(shallow(p3).text()).toBe('To pay you the most money for your used books. Whenever you have used textbooks to sell, you can rest easy knowing we always pay more through our Sellback program. Learn more');
        expect(p3.props.children[2].props.href).toBe('https://help.valorebooks.com/article/260-about-sellback');

        const p4 = textContainerChildren[4];
        expect(p4.type).toBe('p');
        expect(shallow(p4).text()).toBe('To provide dedicated customer service. Our team of professional problem solvers is trained to fix things quickly. That way you can shop and rent with confidence. Contact the ValoreBooks customer service team.');
        expect(p4.props.children[2].props.href).toBe('https://help.valorebooks.com/');
    });

});
