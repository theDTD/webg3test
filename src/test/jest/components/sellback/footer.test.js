import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import Footer from '../../../../main/react/components/sellback/footer';

configure({ adapter: new Adapter() });

describe('Footer',() => {
   it('should render Footer correctly', () => {
        const footerBannerText = "&copy; &currentYear; footerBannerContactText";
        const footerBannerContactText = "footerBannerContactText";
        const footerBannerContactDetail = "footerBannerContactDetail";

        const component = <Footer footerBannerText={footerBannerText}
                                  footerBannerContactText={footerBannerContactText}
                                  footerBannerContactDetail={footerBannerContactDetail}/>;
        const renderedComponent = TestRenderer.create(component);
        const root = renderedComponent.root;

        const footer = root._fiber.child.stateNode;
        expect(footer.type).toEqual("footer");

        const outerDiv = footer.props.children;
        expect(outerDiv.type).toEqual("div");
        expect(outerDiv.props.className).toEqual("footer");

        const innerDiv = outerDiv.props.children;
        expect(innerDiv.type).toEqual("div");
        expect(innerDiv.props.className).toEqual("footer-inner-container");

        const spans = innerDiv.props.children;
        expect(spans.length).toEqual(2);

        expect(spans[0].type).toEqual("span");
        expect(spans[0].props.className).toEqual("footer-text-float-right");

        expect(spans[1].type).toEqual("span");
        expect(spans[1].props.className).toEqual("footer-text-float-left");

        const contactSpans = spans[0].props.children;
        expect(contactSpans.length).toEqual(3);

        expect(contactSpans[0].type).toEqual("span");
        expect(contactSpans[0].props.className).toEqual("footer-contact-text");
        expect(contactSpans[0].props.children).toEqual(footerBannerContactText);

        expect(contactSpans[1]).toEqual(" ");

        expect(contactSpans[2].type).toEqual("span");
        expect(contactSpans[2].props.children).toEqual(footerBannerContactDetail);
     });
});