import React from "react";
import TestRenderer from "react-test-renderer";
import RadioGroup from "../../../../main/react/components/payment/radioGroup";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe('RadioGroup', function () {
    it("radioGroup should render properly", ()=>{
        const component = <RadioGroup
            name="test-group"
            options={[
                { value: "test-option1", label: "Test Option 1", defaultChecked: true },
                { value: "test-option2", label: "Test Option 2" }
            ]} />
        const renderedComponent = TestRenderer.create(component);
        const root = renderedComponent.root;

        const container = root.findByType("form");
        expect(container.type).toEqual("form");

        const componentChildren = container.children;
        expect(componentChildren.length).toEqual(2);

        const firstOptionDiv = container.children[0];
        expect(firstOptionDiv.type).toEqual("div")
        const firstOptionChildren = firstOptionDiv.children;
        expect(firstOptionChildren.length).toEqual(2);

        const firstOptionInput = firstOptionChildren[0];
        expect(firstOptionInput.type).toEqual("input");
        expect(firstOptionInput.props.type).toEqual("radio");
        expect(firstOptionInput.props.id).toEqual("test-option1");
        expect(firstOptionInput.props.value).toEqual("test-option1");
        expect(firstOptionInput.props.name).toEqual("test-group");

        const firstOptionLabel = firstOptionChildren[1];
        expect(firstOptionLabel.type).toEqual("label");
        expect(firstOptionLabel.props.htmlFor).toEqual("test-option1")
        expect(firstOptionLabel.children.length).toEqual(1);
        expect(firstOptionLabel.children[0]).toEqual("Test Option 1");

        const secondOptionDiv = container.children[1];
        expect(secondOptionDiv.type).toEqual("div");
        const secondOptionChildren = secondOptionDiv.children;
        expect(secondOptionChildren.length).toEqual(2);

        const secondOptionInput = secondOptionChildren[0];
        expect(secondOptionInput.type).toEqual("input");
        expect(secondOptionInput.props.type).toEqual("radio");
        expect(secondOptionInput.props.id).toEqual("test-option2");
        expect(secondOptionInput.props.value).toEqual("test-option2");
        expect(secondOptionInput.props.name).toEqual("test-group");

        const secondOptionLabel = secondOptionChildren[1];
        expect(secondOptionLabel.type).toEqual("label");
        expect(secondOptionLabel.props.htmlFor).toEqual("test-option2")
        expect(secondOptionLabel.children.length).toEqual(1);
        expect(secondOptionLabel.children[0]).toEqual("Test Option 2");

    })
});