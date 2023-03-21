import React from "react";
import TestRenderer from "react-test-renderer";
import {configure, mount, shallow} from "enzyme";
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import Adapter from 'enzyme-adapter-react-16';
import ViewOrderDialog from "../../../../main/react/components/viewOrder/viewOrderDialog";
import { act } from "react-dom/test-utils";
import fetchMock from "jest-fetch-mock";

configure({adapter: new Adapter()});

const handleDialog = jest.fn(() => true);

describe('ViewOrderDialog', () => {
    const toggleFn = jest.fn();

    it("renders ViewOrderDialog correctly", () => {
        const component = mount(<ViewOrderDialog isOpen={handleDialog} />);
        const renderedComponent = TestRenderer.create(component);
        const root = renderedComponent.root;

        const componentWrapper = root.findByType("div");
        expect(componentWrapper.props.className).toEqual("viewOrder-dialog-wrapper");
        expect(componentWrapper.props.id).toEqual("#viewOrderDialog");

        const dialogContainer = componentWrapper.props.children;
        expect(dialogContainer.type).toEqual("div");
        expect(dialogContainer.props.className).toEqual("viewOrder-dialog-container");

        const dialog = dialogContainer.props.children;
        expect(dialog.type).toEqual("div")
        expect(dialog.props.className).toEqual("viewOrder-dialog");

        const closeIcon = dialog.props.children[0];
        expect(closeIcon.type).toEqual("i");
        expect(closeIcon.props.className).toEqual("fas fa-times-circle");

        const form = dialog.props.children[1];
        expect(form.type).toEqual("form");
        expect(form.props.id).toEqual("viewOrder-form");
        expect(form.props.className).toEqual("viewOrder-form-wrapper");

        const forgotHeadingFragment = form.props.children;
        const forgotHeading = forgotHeadingFragment.props.children[0];
        expect(forgotHeading.type).toEqual("h3");
        expect(forgotHeading.props.children).toEqual("Forgot your order number?");

        const forgotP = forgotHeadingFragment.props.children[1];
        expect(forgotP.type).toEqual("p");
        expect(forgotP.props.children).toEqual("Enter the email address associated with your order, and we'll send it to you.");

        const formContainer = forgotHeadingFragment.props.children[2];
        expect(formContainer.type).toEqual("div");
        expect(formContainer.props.className).toEqual("viewOrder-formContainer")

        const inputWrap = formContainer.props.children[0];
        expect(inputWrap.type).toEqual("div");
        expect(inputWrap.props.className).toEqual("viewOrder-inputWrap");

        const input = inputWrap.props.children[0];
        expect(input.type).toEqual("input");
        expect(input.props.type).toEqual("text");
        expect(input.props.placeholder).toEqual("Enter email");
        expect(input.props.name).toEqual("email_address");

        const inputBtn = inputWrap.props.children[1];
        expect(inputBtn.type).toEqual("button");
        expect(inputBtn.props.className).toEqual("purple");
        expect(inputBtn.props.type).toEqual("submit");
        expect(inputBtn.props.id).toEqual("ForgotSubmit");
        expect(inputBtn.props.children).toEqual("Submit");
    });

    it("renders empty field error message properly", async () => {
        const mockSubmit = jest.fn();
        const component = mount(<ViewOrderDialog />);

        component.find('form').simulate('submit', { preventDefault: mockSubmit});
        const errorLabel = component.find('label').getElements()
        expect(errorLabel[0].props.children).toEqual("This field is required.");
        expect(errorLabel[0].props.className).toEqual("viewOrder-error");
        expect(errorLabel[0].props.htmlFor).toEqual("email_address");
        expect(errorLabel).toBeTruthy();
    });

    it("renders invalid email error message properly", async () => {
        const mockSubmit = jest.fn();
        const component = mount(<ViewOrderDialog />);

        component.find("input").instance().value = "asdasd";
        component.find("input").simulate("change");

        const button = component.find('form').simulate('submit', { preventDefault: mockSubmit});

        await act(async () => {
            button.simulate('click');
        });

        const errorLabel = component.find('label').getElements();
        expect(errorLabel[0].props.children).toEqual("Please enter a valid email address.");
        expect(errorLabel[0].props.className).toEqual("viewOrder-error");
        expect(errorLabel[0].props.htmlFor).toEqual("email_address");

    });

    it("renders successful submission properly", async () => {
        const mockSubmit = jest.fn();

        const component = render(<ViewOrderDialog />);

        fetchMock.mockResponse("success");

        const form = screen.getByTestId("form");
        form.onsubmit = mockSubmit

        const input = screen.getByTestId("emailInput");
        fireEvent.change(input, { target: { value: "mail@validmail.com" } });

        const submitBtn = screen.getByTestId("submitBtn");
        fireEvent.click(submitBtn);

        await act(async () => {
            fireEvent.submit(form);
        });

        expect(mockSubmit).toHaveBeenCalled();

        expect(screen.getByTestId("submittedHeading")).toBeTruthy();
        expect(screen.getByTestId("submittedP")).toBeTruthy();
        expect(screen.getByTestId("submittedCloseBtn")).toBeTruthy();
    });

    it("should close the component with Escape key", async () => {const wrapper = shallow(<ViewOrderDialog isOpen={toggleFn} />);

        const event = new KeyboardEvent('keydown', {'keyCode': 27});
        document.dispatchEvent(event);
        expect(screen.queryByTestId("viewOrder-dialog-wrapper")).toBeNull();
    });

    it("should close the component with close button", async () => {
        render(<ViewOrderDialog isOpen={toggleFn} />);

        const closeBtn = screen.getByTestId("closeBtn");

        act(() => {
            fireEvent.click(closeBtn);
        });

        expect(toggleFn).toHaveBeenCalled();
    });


    it("should close the component when clicking outside the content", async () => {
        render(<ViewOrderDialog isOpen={toggleFn} />);

        const dialogWrapper = screen.getByTestId("viewOrder-dialog-wrapper");

        act(() => {
            fireEvent.click(dialogWrapper);
        });

        expect(toggleFn).toHaveBeenCalled();
    });

})