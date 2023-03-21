import React, { Component } from 'react';
import UserImg from '../../images/sellback/user-img.svg';

export default class Header extends Component {

	constructor(props) {
		super(props);
		this.state = {
		    authenticated: false
		};
		this.changeAuthenticationStatus = this.changeAuthenticationStatus.bind(this);
	}

    changeAuthenticationStatus() {
        this.setState({authenticated: !this.state.authenticated});
    }

    render() {
        const headerImage = <span className="header-image">{ !this.state.authenticated ? <img alt="" src={ UserImg }/> : null }</span>;
        const headerText = <span className="header-text">{ !this.state.authenticated ? <span className="hide-desktop">Account</span> : "Log out" }</span>;

        const accountLink = this.props.hideAccountLink? "":<span className="header-account-container" onClick={ this.changeAuthenticationStatus }>{headerImage}{headerText}</span>;

        return (
                <header className="main-header">
                    <img alt="" src={ this.props.brandLogo } className="logo"/>
                    { accountLink }
                    <div className="clearfix"></div>
                </header>
        );
    }
}