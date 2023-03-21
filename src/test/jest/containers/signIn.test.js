import React from 'react';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SignIn from "../../../main/react/containers/signIn";
import TestRenderer from "react-test-renderer";
import {Container} from "@follett/common-ui";
import SignInForm from "../../../main/react/components/account/signInForm";
import Footer from "../../../main/react/components/sellback/footer";
import Header from "../../../main/react/components/sellback/header";
import HeaderBanner from '../../../main/react/components/sellback/headerBanner';

configure({ adapter: new Adapter() });

describe('render', () => {
    it("signIn should render properly", ()=>{
        const component = <SignIn />;
        const renderedComponent = TestRenderer.create(component);
        const root = renderedComponent.root;

        const mainContainer = root.findByType(Container);
        const mainContainerContents = mainContainer.props.children;
        expect(mainContainerContents.length).toEqual(3);

        const signInLandingContainer = mainContainerContents[2];
        expect(signInLandingContainer.type).toEqual(Container);

        const headerBannerContainer = mainContainerContents[0];
        expect(headerBannerContainer.type).toEqual(HeaderBanner);

        const landingContainerContents = signInLandingContainer.props.children;
        expect(landingContainerContents.length).toEqual(3);

        const header = landingContainerContents[0];
        expect(header.type).toEqual(Header);
        expect(header.props.isDisplayed).toEqual('true');

        const mainSection = landingContainerContents[1];
        expect(mainSection.type).toEqual("section");

        const signInForm = mainSection.props.children;
        expect(signInForm.type).toEqual(SignInForm);

        const footer = landingContainerContents[2];
        expect(footer.type).toEqual(Footer);
    })
})