import TestRenderer from "react-test-renderer";
import React from "react";
import MarketingPageContent from "../../../../main/react/components/marketingPage/marketingPageContent";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe('MarketingPageContent', ()  =>{
    const path:string = "localhost";

    global.fetch = jest.fn(() =>
        Promise.resolve({
            text: () => Promise.resolve("ok")
        })
    );

    beforeEach(() => {
        fetch.mockClear();
    });

    it("renders correctly", () => {
        const component: JSX.Element = <MarketingPageContent path={path} />;
        const renderer: TestRenderer.ReactTestRenderer = TestRenderer.create(component);
        const root: TestRenderer.ReactTestInstance = renderer.root;
        const rootDiv: TestRenderer.ReactTestInstance = root.findByType("div");

        expect(rootDiv.children.length).toEqual(1);
        expect(rootDiv.props.children.type).toEqual("div");
        expect(rootDiv.props.children.props.id).toEqual("marketingPage");
    });

    it('componentWillMount', ()=> {
        const props = { path: path };
        const wrapper = mount(<MarketingPageContent {...props} />);
        expect(fetch).toHaveBeenCalledWith(path);
        wrapper.setState({content: "ok"});
        expect(wrapper.find("#marketingPage").text()).toEqual("ok");

    });
});