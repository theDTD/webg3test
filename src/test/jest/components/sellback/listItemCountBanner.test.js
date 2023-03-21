import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import ListItemCountBanner from '../../../../main/react/components/sellback/listItemCountBanner';

configure({ adapter: new Adapter() });

describe('ListItemCountBanner', () => {
    it('should render properly', () => {
        const component = <ListItemCountBanner listItemCount={2} />;
        const renderedComponent = renderer.create(component);
        const root = renderedComponent.root;

        const listItemCountBanner = root.findByType(ListItemCountBanner).type;
        expect(listItemCountBanner).toEqual(ListItemCountBanner);

        const listItemCountBannerProps = root.findByType(ListItemCountBanner).props;
        expect(listItemCountBannerProps.listItemCount).toEqual(2);

        const section = root._fiber.child.stateNode;
        expect(section.type).toEqual("section");

        const sectionDiv = section.props.children;
        expect(sectionDiv.type).toEqual("div");
        expect(sectionDiv.props.className).toEqual("list-item-count-banner");

        const span = sectionDiv.props.children;
        expect(span.length).toEqual(2);
        expect(span[0].type).toEqual("span");
        expect(span[0].props.className).toEqual("list-item-count-banner-text");
        expect(span[0].props.children).toEqual(["Your sellback list: ", 2]);
        expect(span[1].type).toEqual("span");
        expect(span[1].props.className).toEqual("list-item-count-banner-text2");

    });
   it('should not render', () => {
        const wrapper = shallow(<ListItemCountBanner listItemCount={0} />);
        expect(wrapper.text()).toBe("");
   });
});