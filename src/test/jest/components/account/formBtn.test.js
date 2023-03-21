import React from 'react'
import TestRenderer from "react-test-renderer";
import {Container} from "@follett/common-ui";
import FormBtn from "../../../../main/react/components/account/formBtn";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe('FormBtn', function () {
    it("formBtn should render properly", ()=>{
        const component = <FormBtn />;
        const renderedComponent = TestRenderer.create(component);
        const root = renderedComponent.root;

        const container = root.findByType(Container);
        expect(container.props.className).toEqual("form-group");
        const componentChildren = container.children;
        expect(componentChildren.length).toEqual(1);

        const componentContainer = componentChildren[0]
        expect(componentContainer.type).toEqual("div")

        const button = componentContainer.props.children;
        expect(button.type).toEqual("button")
        expect(button.props.className).toContain("btn")

    })
    
});