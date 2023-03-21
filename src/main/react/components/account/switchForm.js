import React from 'react';
import PropTypes from 'prop-types';

const SwitchForm = (props) => {
    const msg = props.toSignIn? "Already have a ValoreBooks account?" : "Don't have a ValoreBooks account?";
    const btnText = props.toSignIn? "Sign in" : "Create account";
    let link = props.toSignIn? "/vb/sellback/signIn" : "/vb/sellback/createAccount";
    link += window.location.search

    return (
        <div className="auth-switchform">
            <p>{msg}</p>
            <a href={link}><button className="form-control btn btn-secondary">{btnText}</button></a>
        </div>
    );
}

PropTypes.SwitchForm = {
    toSignIn: PropTypes.bool.isRequired
};

export default SwitchForm;