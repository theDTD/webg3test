import React, { Component } from 'react';
import Search from "../textbooks/search";
import HeaderLogo from  '../../images/header/logo.svg';

interface PageHeaderProps {
    domain: string;
    showSearch: boolean;
    handleNoResults(query: string): void;
}

interface PageHeaderState {
    showMobileMenu: boolean;
    showSearchBar: boolean;
}

export default class PageHeader extends Component<PageHeaderProps, PageHeaderState> {

    public static defaultProps = {
        domain: "https://www.valorebooks.com",
        showSearch: true
    };

    constructor(props: PageHeaderProps) {
        super(props);
        this.state = {
            showMobileMenu: false,
            showSearchBar: false
        };
        this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
        this.toggleSearchBar = this.toggleSearchBar.bind(this);
    }

    toggleMobileMenu() {
        this.setState({
            showMobileMenu: !this.state.showMobileMenu,
            showSearchBar: false
        });
    }

    toggleSearchBar() {
        this.setState({
            showMobileMenu: false,
            showSearchBar: !this.state.showSearchBar
        });
    }

    render(): JSX.Element {
        return (
            <header className="buyTextBookHeader container-fluid m-0 p-0">
                <div className="container d-none d-md-block">
                    <nav className="nav d-flex justify-content-end align-items-center top-links">
                        <a className="nav-link" href="https://help.valorebooks.com/">Support</a> <span>|</span>
                        <a className="nav-link" href={this.props.domain + "/YourAccount.do"}>Order Lookup</a><span>|</span>
                        <a className="nav-link" href={this.props.domain + "/SellBack.SellCart.do"}>Sellback List</a> <span>|</span>
                        <a className="nav-link" href={this.props.domain + "/Checkout.ViewCart.do"}>
                            <i className="fas fa-shopping-cart text-primary px-1"/>Cart
                        </a>
                    </nav>
                </div>
                <div className="container-fluid bg-brand-primary p-0">
                    <div className="container d-flex justify-content-between align-items-center logo-icon-container">
                        <a href={this.props.domain} className="logo-link" aria-label="logo">
                            <img data-focusable="false" src={HeaderLogo} alt="Logo" className="logo-main" aria-label="logo" />
                        </a>
                        { this.props.showSearch &&
                        <div id="searchContainer-desktop" className="search-bar-container d-none d-md-block">
                            <Search handleNoResults={this.props.handleNoResults} toggleErrorMessage={undefined} placeholder={"Search millions of products!"} />
                        </div>
                        }

                        <div className="icon-nav d-block d-sm-block d-md-none d-flex justify-content-between">
                            <a className="btn" href={this.props.domain + "/Checkout.ViewCart.do"}>
                                <i className="fas fa-shopping-cart text-white"/>
                            </a>
                            { this.props.showSearch &&
                            <a id="showSearch-btn" className="btn showSearchBtn" onClick={this.toggleSearchBar}><i className="fas fa-search text-white"/></a>
                            }
                            <a id="showMenu-btn" className="btn showMenuBtn" onClick={this.toggleMobileMenu}><i className="fas fa-bars text-white"/></a>
                        </div>
                    </div>
                    <div className="container-fluid border-top m-0 p-0 d-none d-md-block"/>
                    <nav className="container nav sub-links d-none d-md-flex">
                        <a className="nav-link" href={this.props.domain + "/rent-textbooks"}>Rent Textbooks</a>
                        <a className="nav-link" href={this.props.domain + "/buy-textbooks"}>Buy Textbooks</a>
                        <a className="nav-link" href={this.props.domain + "/sell-textbooks"}>Sell Textbooks</a>
                        <a className="nav-link" href="https://marketplace.valorebooks.com/">Merchant Solutions</a>
                        <a className="nav-link ms-auto" href={this.props.domain + "/YourAccount.do"}>Return rental
                            <i className="fas fa-chevron-right right-arrow"/>
                        </a>
                    </nav>

                </div>
                { this.state.showSearchBar &&
                <div id="toggledSearchBar" className="container-fluid bg-white d-block d-sm-block d-md-none mobile-search-bar p-2">
                    <Search handleNoResults={this.props.handleNoResults}  toggleErrorMessage={undefined} placeholder={"Search millions of products!"} />
                </div>}

                {this.state.showMobileMenu &&
                <div id="toggledMobileMenu" className="d-sm-block d-md-none mobile-links">
                    <nav className="nav d-flex justify-content-between bg-white">
                        <a className="nav-link"  href={this.props.domain + "/SellBack.SellCart.do"}>Sellback List </a>
                        <a className="nav-link"  href={this.props.domain + "/YourAccount.do"}>Rental return</a>
                        <a className="nav-link"  href={this.props.domain + "/YourAccount.do"}>Order Lookup</a>
                    </nav>
                    <div className="container-fluid border-top m-0 p-0 bg-secondary"/>
                    <nav className="nav d-block">
                        <a className="nav-link"  href={this.props.domain + "/rent-textbooks"}>Rent Textbooks</a>
                        <a className="nav-link"  href={this.props.domain + "/buy-textbooks"}>Buy Textbooks</a>
                        <a className="nav-link"  href={this.props.domain + "/sell-textbooks"}>Sell Textbooks</a>
                        <a className="nav-link" href="https://marketplace.valorebooks.com/">Merchant Solutions</a>
                    </nav>
                </div>}
            </header>
        );
    }
}