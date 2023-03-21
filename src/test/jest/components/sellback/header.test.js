import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import renderer from 'react-test-renderer';
import Header from '../../../../main/react/components/sellback/header';

configure({ adapter: new Adapter() });

const renderBaseTest = (props) => {

    const component = <Header brandLogo={props.brandLogo} isDisplayed={props.isDisplayed} />;
    const renderedComponent = renderer.create(component);
    const root = renderedComponent.root;

    const headerProps = root.findByType(Header).props;
    expect(headerProps.brandLogo).toEqual(props.brandLogo);
    expect(headerProps.isDisplayed).toEqual(props.isDisplayed);

    const header = root.findByType("header");
    expect(header.props.className).toEqual("main-header");

    const headerChildren = header.props.children;
    expect(headerChildren.length).toEqual(3);

    const headerLogo = headerChildren[0];
    expect(headerLogo.props.className).toEqual("logo");
    expect(headerLogo.type).toEqual("img");

    const headerAccountContainer = headerChildren[1];
    expect(headerAccountContainer.type).toEqual("span");
    expect(headerAccountContainer.props.className).toEqual("header-account-container");

    const headerAccountContainerChildren = headerAccountContainer.props.children;
    expect(headerAccountContainerChildren.length).toEqual(2);

    const headerAccountIcon = headerAccountContainerChildren[0].props;
    expect(headerAccountIcon.className).toEqual("header-image");
    expect(headerAccountIcon.children.type).toEqual("img");

    const headerAccountText = headerAccountContainerChildren[1];
    expect(headerAccountText.type).toEqual("span");
    expect(headerAccountText.props.className).toEqual('header-text');
    expect(headerAccountText.props.children.type).toEqual("span");
    expect(headerAccountText.props.children.props.className).toEqual("hide-desktop");
    expect(headerAccountText.props.children.props.children).toEqual("Account");


    const clearfixDiv = headerChildren[2];
    expect(clearfixDiv.type).toEqual("div");
    expect(clearfixDiv.props.className).toEqual("clearfix");
};

describe('changeAuthenticationStatus', () => {
    const wrapper = shallow(<Header brandLogo="test" isDisplayed="true"/>);
    const componentInstance = wrapper.instance();

    it('should set authenticated to true', () => {
        expect(wrapper.state('authenticated')).toBe(false);
        componentInstance.changeAuthenticationStatus();
        expect(wrapper.state('authenticated')).toBe(true);
    });
});

describe('Header', () => {
    it('test brandLogo is empty and isDisplayed=true', () => {
        renderBaseTest({
            brandLogo: "",
            isDisplayed: true
        });
    });
    it('test brandLogo is empty and isDisplayed=false', () => {
        renderBaseTest({
            brandLogo: "",
            isDisplayed: false
        });
    });
    it('test brandLogo is not empty and isDisplayed=true', () => {
        renderBaseTest({
            brandLogo: "abc",
            isDisplayed: true
        });
    });
    it('test brandLogo is not empty and isDisplayed=false', () => {
        renderBaseTest({
            brandLogo: "def",
            isDisplayed: false
        });
    });
});