import React from "react";
import TestRenderer from 'react-test-renderer';
import ViewOrder from "../../../main/react/containers/viewOrder";
import PageHeader from "../../../main/react/components/header/pageHeader";
import Footer from "../../../main/react/components/textbooks/footer";
import ViewOrderContent from "../../../main/react/components/viewOrder/viewOrderContent";
import {configure, mount} from "enzyme";
import ViewOrderDialog from "../../../main/react/components/viewOrder/viewOrderDialog";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

describe('ViewOrder', ()  =>{
    it("renders correctly", () => {
        const component = <ViewOrder/>;
        const renderedComponent = TestRenderer.create(component);
        const root = renderedComponent.root;
        const viewOrderContainer = root.findByType("div");
        expect(viewOrderContainer.props.className).toEqual("bg-white view-order");

        const viewOrderContainerContents = viewOrderContainer.props.children;
        expect(viewOrderContainerContents[0].type).toEqual(undefined);
        expect(viewOrderContainerContents[1].type).toEqual(PageHeader);
        expect(viewOrderContainerContents[2].type).toEqual(ViewOrderContent);
        expect(viewOrderContainerContents[3].type).toEqual(Footer);
    });
    it("should render with the dialog open", () => {
        const wrapper = mount(<ViewOrder />);
        const mockHandleDialog = jest.fn(value => wrapper.setState({
            openDialog: value
        }));
        mockHandleDialog(true);
        expect(wrapper.state("openDialog")).toEqual(true);
        expect(wrapper.find(ViewOrderDialog)).toBeTruthy();

        mockHandleDialog(false);
        expect(wrapper.state("openDialog")).toEqual(false);
        expect(wrapper.find(ViewOrderDialog)).toEqual({});
    });
});