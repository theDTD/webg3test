import React from 'react';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CreateAccount from "../../../main/react/containers/createAccount";
import TestRenderer from "react-test-renderer";
import {Container} from "@follett/common-ui";
import CreateForm from "../../../main/react/components/account/createForm";
import SwitchForm from "../../../main/react/components/account/switchForm";
import Footer from "../../../main/react/components/sellback/footer";
import Header from "../../../main/react/components/sellback/header";
import HeaderBanner from '../../../main/react/components/sellback/headerBanner';

configure({ adapter: new Adapter() });

describe('render', () => {
    it("createAccount should render properly", ()=>{
        const component = <CreateAccount />;
        const renderedComponent = TestRenderer.create(component);
        const root = renderedComponent.root;

        const mainContainer = root.findByType(Container);
        const mainContainerContents = mainContainer.props.children;
        expect(mainContainerContents.length).toEqual(3);

        const createAccountLandingContainer = mainContainerContents[2];
        expect(createAccountLandingContainer.type).toEqual(Container);

        const headerBannerContainer = mainContainerContents[1];
        expect(headerBannerContainer.type).toEqual(HeaderBanner);

            const landingContainerContents = createAccountLandingContainer.props.children;
            expect(landingContainerContents.length).toEqual(3);

            const header = landingContainerContents[0];
            expect(header.type).toEqual(Header);
            expect(header.props.isDisplayed).toEqual('true');

            const mainSection = landingContainerContents[1];
            expect(mainSection.type).toEqual("section")
            const mainSectionContents = mainSection.props.children;
            expect(mainSectionContents.length).toEqual(2);

                const createForm = mainSectionContents[0];
                expect(createForm.type).toEqual(CreateForm);

                const switchForm = mainSectionContents[1];
                expect(switchForm.type).toEqual(SwitchForm);

            const footer = landingContainerContents[2];
            expect(footer.type).toEqual(Footer);

    })
})