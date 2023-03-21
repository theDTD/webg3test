import React from 'react';
import TestRenderer from "react-test-renderer";
import {Container} from "@follett/common-ui";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SignInForm from "../../../../main/react/components/account/signInForm";
import FormInput from "../../../../main/react/components/account/formInput";
import CheckBox from "../../../../main/react/components/account/checkBox";
import FormBtn from "../../../../main/react/components/account/formBtn";
import SwitchForm from "../../../../main/react/components/account/switchForm";

configure({adapter: new Adapter()});

describe("SignInForm", () => {
    it("signInForm should render properly", () => {
        const component = <SignInForm/>;
        const renderedComponent = TestRenderer.create(component);
        const root = renderedComponent.root;

        const container = root.findByType(Container);
        expect(container.props.className).toEqual("auth-form");
        const componentChildren = container.props.children;
        expect(componentChildren.length).toEqual(8);


        const h1 = componentChildren[0];
        expect(h1.type).toEqual("h1");
        expect(shallow(h1).text()).toContain('Sign in to your ValoreBooks account');

        const small = componentChildren[1];
        expect(small.type).toEqual("small");

        const email = componentChildren[2];
        expect(email.type).toEqual(FormInput);

        const password = componentChildren[3];
        expect(password.type).toEqual(FormInput);

        const forgotPasswordLink = componentChildren[4];
        expect(forgotPasswordLink.type).toEqual("a");
        expect(shallow(forgotPasswordLink).text()).toContain('Forgot password?');

        const checkbox = componentChildren[5];
        expect(checkbox.type).toEqual(CheckBox);


        const signIn = componentChildren[6];
        expect(signIn.type).toEqual(FormBtn);
        expect(signIn.props.children).toBe('Sign in');

        const createAccountDiv = componentChildren[7];
        expect(createAccountDiv.type).toEqual(SwitchForm);
    });
});