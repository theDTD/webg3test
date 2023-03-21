import React from 'react';
import SwitchForm from "../../../../main/react/components/account/switchForm";
import TestRenderer from "react-test-renderer";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const renderBaseTest = (data) => {

    const toSignInMsg = "Already have a ValoreBooks account?";
    const toSignUpMsg = "Don't have a ValoreBooks account?";
    const toSignInButton = "Sign in";
    const toSignUpButton = "Create account";

    const component = <SwitchForm toSignIn={data.toSignIn} link={data.link} />;
    const renderedComponent = TestRenderer.create(component);
    const root = renderedComponent.root;

    const container = root.findByType("div").props;
    expect(container.className).toEqual("auth-switchform");
    const componentChildren = container.children;
    expect(componentChildren.length).toEqual(2);

    const p = componentChildren[0];
    expect(p.type).toEqual("p");
    expect(p.props.children).toEqual(data.toSignIn? toSignInMsg : toSignUpMsg);

    const a = componentChildren[1];
    expect(a.type).toEqual("a");
    const button = a.props.children;
    expect(button.type).toEqual("button");
    expect(button.props.children).toEqual(data.toSignIn? toSignInButton : toSignUpButton);
};

describe("SwitchForm",()=>{

   it("switchForm test switchForm toSignIn=true", ()=>{
       renderBaseTest({toSignIn: true, link: '#'});
   });

   it("switchForm test signUp toSignIn=false", ()=>{
       renderBaseTest({toSignIn: false, link: '#'});
   });

});