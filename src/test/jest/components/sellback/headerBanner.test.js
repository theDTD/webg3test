import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import HeaderBanner from '../../../../main/react/components/sellback/headerBanner';

configure({ adapter: new Adapter() });

describe('HeaderBanner',() => {
   it('should render HeaderBanner correctly', () => {
        const headerBannerText = "headerBannerText";
        const component =
          <HeaderBanner banner={headerBannerText}/>;
        const renderedComponent = TestRenderer.create(component);
        const root = renderedComponent.root;

        const div = root._fiber.child.stateNode;
        expect(div.type).toEqual("div");
        expect(div.props.className).toEqual("header-banner");

        const spans = div.props.children;
        expect(spans.length).toEqual(2);

        expect(spans[0].type).toEqual("span");
        expect(spans[0].props.className).toEqual("header-banner-retsym");
        expect(spans[0].props.children).toEqual("<");

        expect(spans[1].type).toEqual("span");
        expect(spans[1].props.className).toEqual("header-banner-text");

        const anchor = spans[1].props.children;
        expect(anchor.type).toEqual("a");
        expect(anchor.props.children).toEqual(headerBannerText);
   });
});