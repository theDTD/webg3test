import React from 'react'
import TestRenderer from "react-test-renderer";
import {Container} from "@follett/common-ui";
import CheckBox from "../../../../main/react/components/account/checkBox";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe('CheckBox', function () {
    it("checkBox should render properly", ()=>{
        const component = <CheckBox />;
        const renderedComponent = TestRenderer.create(component);
        const root = renderedComponent.root;

        const container = root.findByType(Container);
        expect(container.props.className).toEqual("form-group");
        const componentChildren = container.children;

        const containerDiv = componentChildren[0];
        expect(containerDiv.type).toEqual("div");
        expect(containerDiv.props.className).toEqual("form-group container");
        expect(containerDiv.children.length).toEqual(1);

        const label = containerDiv.children[0];
        expect(label.type).toEqual("label");
        expect(label.props.className).toEqual("custom-checkbox");
        expect(label.children.length).toEqual(2);

        const input = label.children[0];
        expect(input.type).toEqual("input");
        expect(input.props.type).toEqual("checkbox");

        const span = label.children[1];
        expect(span.type).toEqual("span");
        const spanText = span.props.children[0];
        expect(spanText).toEqual("Keep me signed in ");

        const spanBreak = span.props.children[1];
        expect(spanBreak.type).toEqual("br");

        const spanSmall = span.props.children[2];
        expect(spanSmall.type).toEqual("small");

        const spanSmallText = spanSmall.props.children;
        expect(spanSmallText).toEqual("Uncheck if using a public device.")

    })

});