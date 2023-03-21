import React, { useState } from 'react';
import {Container} from "@follett/common-ui";
import FormInput from "./formInput";
import CheckBox from "./checkBox";
import FormBtn from "./formBtn";
import SwitchForm from "./switchForm";

const SignInForm = () => {
    return (
        <Container className="auth-form">
            <h1>Sign in to your ValoreBooks account</h1>
            <small>This is not your account for Walmart.com</small>
            <FormInput type="email" className="form-control" placeholder="Email address (required)"/>
            <FormInput type="password" className="form-control" placeholder="Password (required)"/>
            <a href="#" className="form-group forgot-password-link">Forgot password?</a>
            <CheckBox />
            <FormBtn type="btn-primary">Sign in</FormBtn>
            <SwitchForm className="auth-switchform" />
        </Container>
    );
}

export default SignInForm;