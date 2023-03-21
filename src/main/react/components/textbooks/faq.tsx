
import React, { Component } from 'react';
import {WhyBuyCollegeTextbooks} from "./faq/why-buy-college-textbooks";
import {BuyUsedTextbooksBySubject} from "./faq/buy-used-textbooks-by-subject";
import {WhyRent} from "./faq/why-rent";
import {TextbookRentalSavings} from "./faq/textbook-rental-savings";
import {BrowseBooksForRentByCategory} from "./faq/browse-books-for-rent-by-category";

interface Book {
    title: string;
    product_link: string;
    contributor: string;
    img_link: string;
    list_price: number;
    rent_value: number;
    savings: string;
}

interface FaqProps {
    domain: string;
    page: string;
    popularRentalProducts: Book[] | []
}

interface FaqState {
    toggleTab: boolean;
    currentTab: string;
}

interface MenuList {
    id: string;
    link: string;
    text: string;
    page: string;
}

const defaultProps = {
    domain: "https://www.valorebooks.com"
}

export default class Faq extends Component<FaqProps & typeof defaultProps, FaqState> {

    menuList: MenuList[];

    constructor(props: FaqProps) {
        super(props);
        this.state = {
            toggleTab: false,
            currentTab: this.props.page=="buy-textbooks"? "why-buy-college-textbooks": "why-rent"
        };

        this.menuList = [
            {id: "why-buy-college-textbooks", link: "#why-buy-college-textbooks", text: "Why buy college books at ValoreBooks?", page: "buy-textbooks"},
            {id: "buy-used-textbooks-by-subject", link: "#buy-used-textbooks-by-subject", text: "Buy used textbooks by subject", page: "buy-textbooks"},
            {id: "why-rent", link: "#why-rent", text: "Why rent with Valorebooks?", page: "rent-textbooks"}
        ];

        if (this.props.popularRentalProducts!.length > 0) {
            this.menuList.push({id: "textbook-rental-savings", link: "#textbook-rental-savings", text: "Textbook rental savings", page: "rent-textbooks"});
        }

        this.menuList.push({id: "browse-books-for-rent-by-category", link: "#browse-books-for-rent-by-category", text: "Browse books for rent by category", page: "rent-textbooks"});

        this.switchTab = this.switchTab.bind(this);
        this.setDefaultTab = this.setDefaultTab.bind(this);
        this.setDefaultTab();
    }

    setDefaultTab() {
        const self = this;
        this.menuList.forEach(li => {
            if (window.location.href.indexOf(li.id) > -1) {
                self.setState({currentTab: li.id});
            }
        });
    }

    switchTab(id: string) {
        this.setState({currentTab: id});
    }

    render() {
        const menu: JSX.Element[] = [];
        this.menuList.forEach((li, index) => {
            if (li.page == this.props.page) {
                menu.push(
                    <li key={index}><a id={`link-${li.id}`} data-tab={li.id} className={this.state.currentTab==li.id?'active':''} onClick={()=>this.switchTab(li.id)} href={li.link}>{li.text}</a></li>
                );
            }
        });

        return (
            <div className="textbook-faq">
                <div className="container">
                    <div className="d-flex flex-column flex-md-row">
                        <div className="col-md-3">
                            <ul className="faq-list-menu text-center text-md-start">
                                {menu}
                                <hr className="hr d-md-none" />
                            </ul>
                        </div>
                        { this.state.currentTab == "why-buy-college-textbooks" &&
                        <WhyBuyCollegeTextbooks domain={this.props.domain} />
                        }
                        { this.state.currentTab == "buy-used-textbooks-by-subject" &&
                        <BuyUsedTextbooksBySubject domain={this.props.domain} />
                        }
                        { this.state.currentTab == "why-rent" &&
                        <WhyRent />
                    }
                    { this.state.currentTab == "textbook-rental-savings" && this.props.popularRentalProducts!.length > 0 &&
                        <TextbookRentalSavings domain={this.props.domain} popularRentalProducts={this.props.popularRentalProducts!} />
                        }
                        { this.state.currentTab == "browse-books-for-rent-by-category" &&
                        <BrowseBooksForRentByCategory domain={this.props.domain}  />
                        }
                    </div>
                </div>
            </div>
        )
    }
}