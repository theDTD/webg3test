import React from "react";
import TestRenderer from 'react-test-renderer';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SeoTestEdit from "../../../main/react/containers/seoTestEdit";
import SeoEditContent from "../../../main/react/components/seoTest/editContent";

configure({adapter: new Adapter()});

describe("SeoTestEdit", () => {
    it("renders correctly", ()=> {
        // const component = TestRenderer.create(<SeoTestEdit />);
        // const container = component.root.findByType("div");
        //
        // expect(container.props.id).toEqual("container");
        // expect(container.props.children.length).toEqual(2);
        // expect(container.props.children[0].type).toEqual("h1");
        // expect(container.props.children[1].type).toEqual(SeoEditContent);
    });
});