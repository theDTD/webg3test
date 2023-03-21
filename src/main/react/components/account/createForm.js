import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Container} from "@follett/common-ui";

import FormInput from './formInput';
import CheckBox from './checkBox';
import FormBtn from './formBtn';

const CreateForm = () => {

    return (
        <Container className="auth-form">

            <h1>Create your ValoreBooks account</h1>
            <small>This is not your account for Walmart.com</small>
            <FormInput type="email" className="form-control" placeholder="Email address (required)"/>
            <FormInput type="password" className="form-control" placeholder="Create a password (required)"/>
            <FormInput type="password" className="form-control" placeholder="Confirm password (required)"/>
            <CheckBox />

            <div className="form-group">
                <small>By clicking Create Account, you acknowledge you have read and agreed to our <a>Terms of Use</a> and <a>Privacy Policy.</a></small>
            </div>

            <FormBtn type="btn-primary">Create account</FormBtn>

        </Container>
    );
}

PropTypes.CreateForm = {
};

export default CreateForm;