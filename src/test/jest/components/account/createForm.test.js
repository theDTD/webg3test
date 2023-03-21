import React from 'react';
import TestRenderer from "react-test-renderer";
import {Container} from "@follett/common-ui";
import CreateForm from "../../../../main/react/components/account/createForm";
import FormInput from "../../../../main/react/components/account/formInput";
import CheckBox from "../../../../main/react/components/account/checkBox";
import FormBtn from "../../../../main/react/components/account/formBtn";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("CreateForm",()=>{
    it("createForm should render properly",()=>{
        const component = <CreateForm />;
        const renderedComponent = TestRenderer.create(component);
        const root = renderedComponent.root;

        const container = root.findByType(Container);
        expect(container.props.className).toEqual("auth-form");
        const componentChildren = container.props.children;
        expect(componentChildren.length).toEqual(8);


        const h1 = componentChildren[0];
        expect(h1.type).toEqual("h1");

        const small = componentChildren[1];
        expect(small.type).toEqual("small");

        const emailInput = componentChildren[2];
        expect(emailInput.type).toEqual(FormInput);
        expect(emailInput.props.type).toEqual("email");

        const passwordInput = componentChildren[3];
        expect(passwordInput.type).toEqual(FormInput);
        expect(passwordInput.props.type).toEqual("password");
        expect(passwordInput.props.className).toEqual("form-control");

        const confirmPasswordInput = componentChildren[4];
        expect(confirmPasswordInput.type).toEqual(FormInput);
        expect(confirmPasswordInput.props.type).toEqual("password");

        const keepSignedIn = componentChildren[5];
        expect(keepSignedIn.type).toEqual(CheckBox);

        const disclaimerDiv = componentChildren[6];
        expect(disclaimerDiv.type).toEqual("div");
        expect(disclaimerDiv.props.className).toEqual("form-group")

        const disclaimerSmall = disclaimerDiv.props.children;
        expect(disclaimerSmall.type).toEqual("small");


        const disclaimerText = disclaimerSmall.props.children[0];
        expect(disclaimerText).toEqual("By clicking Create Account, you acknowledge you have read and agreed to our ");

        const disclaimerTerms = disclaimerSmall.props.children[1];
        expect(disclaimerTerms.type).toEqual("a");

        const disclaimerTermText = disclaimerTerms.props.children;
        expect(disclaimerTermText).toEqual("Terms of Use");

        const disclaimerAnd = disclaimerSmall.props.children[2];
        expect(disclaimerAnd).toEqual(" and ");

        const privacyLink = disclaimerSmall.props.children[3];
        expect(privacyLink.type).toEqual("a");

        const privacyText = privacyLink.props.children;
        expect(privacyText).toEqual("Privacy Policy.")


        const submitDiv = componentChildren[7];
        expect(submitDiv.type).toEqual(FormBtn);


    });
});