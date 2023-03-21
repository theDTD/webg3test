import React from 'react'
import TestRenderer from "react-test-renderer";
import FormInput from "../../../../main/react/components/account/formInput";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const testInputFields = (data) => {

    const component = <FormInput type={data.type} />;
    const renderedComponent = TestRenderer.create(component);
    const root = renderedComponent.root;

    const container = root.findByType("div").props;
    expect(container.className).toEqual("form-group container");
    const componentChildren = container.children;
    expect(componentChildren.length).toEqual(2);

    const inputField = componentChildren[0];
    expect(inputField.type).toEqual("input");

    const showHideBtn = componentChildren[1]
    expect(showHideBtn.type).toEqual(data.type ==="email" ? undefined : "span")

}

describe('FormInput', function () {

    it("formInput type email", ()=>{
        testInputFields({type: "email", placeholder: "Email address (required)"})
    });

    it("formInput type text", ()=>{
        testInputFields({type: "text", placeholder: "Create a password (required)"})
    });

    it("formInput type password ", ()=>{
        testInputFields({type: "password", placeholder: "Confirm password (required)"})
    })

});