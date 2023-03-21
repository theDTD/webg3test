import React, {Component} from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow, ShallowWrapper} from 'enzyme';
import TestRenderer, {ReactTestInstance, ReactTestRenderer} from 'react-test-renderer';
import PageHeader from "../../../../main/react/components/header/pageHeader";
import Search from "../../../../main/react/components/textbooks/search";

configure({ adapter: new Adapter() });

describe('PageHeader',() => {
    it('should render PageHeader correctly', () => {
        const component: JSX.Element = <PageHeader domain="https://www.valorebooks.com"/>;
        const renderedComponent: ReactTestRenderer = TestRenderer.create(component);
        const root: ReactTestInstance = renderedComponent.root;

        const header: ReactTestInstance = root.findByType("header");

        const headerChildren: ReactTestInstance = header.props.children;
        const headerTopContainer: ReactTestInstance = headerChildren[0];
        expect(headerTopContainer.props.className).toContain("container");

        const headerTopNavContainer: ReactTestInstance = headerTopContainer.props.children;
        const topLink1: ReactTestInstance = headerTopNavContainer.props.children[0];
        const topLink2: ReactTestInstance = headerTopNavContainer.props.children[3];
        const topLink3: ReactTestInstance = headerTopNavContainer.props.children[5];
        const topLink4: ReactTestInstance = headerTopNavContainer.props.children[8];

        expect(topLink1.type).toBe("a");
        expect(topLink1.props.href).toBe( 'https://help.valorebooks.com/');
        expect(topLink1.props.children).toBe( 'Support');

        expect(topLink2.type).toBe("a");
        expect(topLink2.props.href).toBe('https://www.valorebooks.com/YourAccount.do');
        expect(topLink2.props.children).toBe( 'Order Lookup');

        expect(topLink3.type).toBe("a");
        expect(topLink3.props.href).toBe('https://www.valorebooks.com/SellBack.SellCart.do');
        expect(topLink3.props.children).toBe( 'Sellback List');

        expect(topLink4.type).toBe("a");
        expect(topLink4.props.href).toBe('https://www.valorebooks.com/Checkout.ViewCart.do');
        expect(topLink4.props.children[1]).toEqual( 'Cart');

        const logoContainer: ReactTestInstance = headerChildren[1];
        expect(logoContainer.props.className).toContain("container-fluid");

        const logoDiv: ReactTestInstance = logoContainer.props.children[0];
        expect(logoDiv.type).toBe("div");

        const logoLink: ReactTestInstance = logoDiv.props.children[0];
        expect(logoLink.type).toBe("a");
        expect(logoLink.props.children.type).toBe("img");
        expect(logoLink.props.children.props.className).toContain("logo-main");

        const searchBarDiv: ReactTestInstance = logoDiv.props.children[1];
        expect(searchBarDiv.type).toBe("div");
        expect(searchBarDiv.props.className).toContain("search-bar-container");

        const searchContent: ReactTestInstance = searchBarDiv.props.children;
        expect(searchContent.type).toBe(Search);

        const iconDiv: ReactTestInstance = logoDiv.props.children[2]
        expect(iconDiv.type).toBe("div");
        expect(iconDiv.props.className).toContain("icon-nav");

        const cartIconLink: ReactTestInstance = iconDiv.props.children[0];
        expect(cartIconLink.type).toBe("a");
        expect(cartIconLink.props.href).toBe('https://www.valorebooks.com/Checkout.ViewCart.do');
        expect(cartIconLink.props.children.type).toBe("i");
        expect(cartIconLink.props.children.props.className).toContain("fa-shopping-cart");

        const searchIconLink: ReactTestInstance = iconDiv.props.children[1];
        expect(searchIconLink.type).toBe("a");
        expect(searchIconLink.props.children.type).toBe("i");
        expect(searchIconLink.props.children.props.className).toContain("fa-search");
        expect(searchIconLink.props.onClick).toBe(root.instance.toggleSearchBar);

        const menuIconLink: ReactTestInstance = iconDiv.props.children[2];
        expect(menuIconLink.type).toBe("a");
        expect(menuIconLink.props.children.type).toBe("i");
        expect(menuIconLink.props.children.props.className).toContain("fa-bars");
        expect(menuIconLink.props.onClick).toBe(root.instance.toggleMobileMenu);

        const subLinksDiv: ReactTestInstance = logoContainer.props.children[2];
        expect(subLinksDiv.type).toBe("nav");
        expect(subLinksDiv.props.className).toContain("sub-links");

        const sublink1: ReactTestInstance = subLinksDiv.props.children[0];
        const sublink2: ReactTestInstance = subLinksDiv.props.children[1];
        const sublink3: ReactTestInstance = subLinksDiv.props.children[2];
        const sublink4: ReactTestInstance = subLinksDiv.props.children[3];
        const sublink5: ReactTestInstance = subLinksDiv.props.children[4];

        expect(sublink1.type).toBe("a");
        expect(sublink1.props.href).toBe('https://www.valorebooks.com/rent-textbooks');
        expect(sublink1.props.children).toBe( 'Rent Textbooks');

        expect(sublink2.type).toBe("a");
        expect(sublink2.props.href).toBe('https://www.valorebooks.com/buy-textbooks');
        expect(sublink2.props.children).toBe( 'Buy Textbooks');

        expect(sublink3.type).toBe("a");
        expect(sublink3.props.href).toBe('https://www.valorebooks.com/sell-textbooks');
        expect(sublink3.props.children).toBe( 'Sell Textbooks');

        expect(sublink4.type).toBe("a");
        expect(sublink4.props.href).toBe('https://marketplace.valorebooks.com/');
        expect(sublink4.props.children).toBe( 'Merchant Solutions');

        expect(sublink5.type).toBe("a");
        expect(sublink5.props.href).toBe('https://www.valorebooks.com/YourAccount.do');
        expect(sublink5.props.children[0]).toBe( 'Return rental');
        expect(sublink5.props.children[1].type).toBe( 'i');
        expect(sublink5.props.children[1].props.className).toBe( 'fas fa-chevron-right right-arrow');
    });

    it('should use default values when nothing is passed', () => {
        let wrapper: ShallowWrapper = shallow(<PageHeader/>);
        expect(wrapper.instance().props.domain).toBe('https://www.valorebooks.com');
        expect(wrapper.instance().props.showSearch).toBe(true);
    });

    it('should use passed props', () => {
        let wrapper: ShallowWrapper = shallow(<PageHeader domain="uat.valorebooks.com" showSearch="false"/>)
        expect(wrapper.instance().props.domain).toBe('uat.valorebooks.com');
        expect(wrapper.instance().props.showSearch).toBe("false");
    });

});

describe("test toggle functions", () => {
        let wrapper: ShallowWrapper;
        let componentInstance: { toggleMobileMenu: () => void; toggleSearchBar: () => void; }
        beforeEach(() => {
            wrapper = shallow(<PageHeader domain='https://www.valorebooks.com' showSearch="true"/>)
            componentInstance = wrapper.instance();
        });

    it("test btn click is handled", () => {

       const showSearchBtn = wrapper.find('#showSearch-btn');
       const showMenuBtn = wrapper.find('#showMenu-btn');

       expect(showSearchBtn.props().onClick).toBe(wrapper.instance().toggleSearchBar);
       expect(showMenuBtn.props().onClick).toBe(wrapper.instance().toggleMobileMenu);
    });


    it('test toggleMobileMenu',  () => {
        componentInstance.toggleMobileMenu();
        expect(wrapper.state('showMobileMenu')).toBe(true);
        expect(wrapper.state('showSearchBar')).toBe(false);
        expect(wrapper.find('#toggledSearchBar').length).toBe(0);
        expect(wrapper.find('#toggledMobileMenu').length).toBe(1);

        componentInstance.toggleMobileMenu();
        expect(wrapper.state('showMobileMenu')).toBe(false);
        expect(wrapper.state('showSearchBar')).toBe(false);
        expect(wrapper.find('#toggledSearchBar').length).toBe(0);
        expect(wrapper.find('#toggledMobileMenu').length).toBe(0);
        expect(wrapper.find(Search).length).toBe(1);
    });

    it('test toggleSearchBar',  () => {
        expect(wrapper.find(Search).length).toBe(1);
        componentInstance.toggleSearchBar();
        expect(wrapper.state('showSearchBar')).toBe(true);
        expect(wrapper.state('showMobileMenu')).toBe(false);
        expect(wrapper.find('#toggledSearchBar').length).toBe(1);
        expect(wrapper.find('#toggledMobileMenu').length).toBe(0);
        expect(wrapper.find(Search).length).toBe(2);

        componentInstance.toggleSearchBar();
        expect(wrapper.state('showSearchBar')).toBe(false);
        expect(wrapper.state('showMobileMenu')).toBe(false);
        expect(wrapper.find('#toggledSearchBar').length).toBe(0);
        expect(wrapper.find('#toggledMobileMenu').length).toBe(0);
        expect(wrapper.find(Search).length).toBe(1);
    });

});
