import React from "react";
import TestRenderer from 'react-test-renderer';
import ExtraMileGuarantee from '../../../main/react/containers/extraMileGuarantee';
import ExtraMileBody from "../../../main/react/components/extraMileGuarantee/extraMileBody";
import PageHeader from "../../../main/react/components/header/pageHeader";
import Footer from "../../../main/react/components/textbooks/footer";


describe('ExtraMileGuarantee', ()  =>{
    it("renders correctly", () => {
        const component = <ExtraMileGuarantee/>;
        const renderedComponent = TestRenderer.create(component);
        const root = renderedComponent.root;

        const extraMileContainer = root.findByType("div");
        expect(extraMileContainer.props.className).toEqual("bg-white extra-mile-guarantee");

        const extraMileContainerContents = extraMileContainer.props.children;
        expect(extraMileContainerContents.length).toEqual(3);

        expect(extraMileContainerContents[0].type).toEqual(PageHeader);
        expect(extraMileContainerContents[1].type).toEqual(ExtraMileBody);
        expect(extraMileContainerContents[2].type).toEqual(Footer);
    });
});