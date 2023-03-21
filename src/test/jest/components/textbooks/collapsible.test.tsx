import React from "react";
import TestRenderer, {ReactTestInstance, ReactTestRenderer} from "react-test-renderer";
import Collapsible from "../../../../main/react/components/textbooks/collapsible";

import {configure, mount, ReactWrapper, shallow, ShallowWrapper} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const title: string = "Test Title";
const content: string = "Test content";
const defaultActiveIcon: string = "fa fa-chevron-down"
const defaultClosedIcon: string = "fa fa-chevron-right"
const activeIcon: string = "fa custom-active-icon";
const closedIcon: string = "fa custom-close-icon";

describe("Collapsible", () => {
    it("Collapsible should render properly", () => {
        const component: ShallowWrapper = shallow(<Collapsible
            title={title}
            content={content}
        />);

        const renderedComponent: ReactTestRenderer = TestRenderer.create(component);
        const fragment: ReactTestInstance = renderedComponent.root;

        const button: ReactTestInstance = fragment.findByType("button");
        expect(button.props.children[0]).toEqual("Test Title");

        const icon: ReactTestInstance = button.props.children[1];
        expect(icon.props.className).toEqual(defaultClosedIcon)

    });

    it ("Toggle expand properly", () => {
        handleClick();
    });

    it("Collapsible should render custom icons properly", () => {
        const component: ReactWrapper = mount(<Collapsible
            title={title}
            content={content}
            activeIcon={activeIcon}
            closedIcon={closedIcon}
        />)
        handleClickCustomIcons(component);
    });
});

const handleClick = () => {
    const component: ReactWrapper = mount(<Collapsible
        title={title}
        content={content}
    />);

    const button = component.find("button");
    const icon = component.find("i");

    expect(button.props().children[0]).toEqual(title);
    expect(button.props().className).toContain("accordion");

    button.simulate("click");
    const panel = component.find("div");
    expect(icon.instance().className).toEqual(defaultActiveIcon);

    expect(panel.instance().className).toEqual("panel");
    expect(panel.props("children").children).toEqual(content);

    component.unmount();
}

const handleClickCustomIcons = (wrappedComponent: ReactWrapper) => {
    const component = wrappedComponent;

    const button = component.find("button");
    const icon = component.find("i");

    expect(button.props().children[0]).toEqual(title);
    expect(button.props().className).toContain("accordion");

    button.simulate("click");

    const panel = component.find("div");
    expect(icon.instance().className).toEqual(activeIcon);

    expect(panel.instance().className).toEqual("panel");
    expect(panel.props("children").children).toEqual(content);

    component.unmount();
}