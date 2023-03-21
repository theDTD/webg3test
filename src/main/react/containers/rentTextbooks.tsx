
import React, { Component, Fragment } from 'react';
import ReactDOM from "react-dom";
import PageHeader from "../components/header/pageHeader";
import MainSearchBar from "../components/textbooks/mainSearchBar";
import Body from "../components/textbooks/body";
import Faq from "../components/textbooks/faq";
import Footer from "../components/textbooks/footer";

const contentElement: HTMLElement = document.getElementById('content')!;
const urlOrigin = contentElement.getAttribute("urlOrigin");
const popularRentalProducts = JSON.parse(contentElement.getAttribute("popularRentalProducts") || "[]");
const backgroundImage = 'https://images.valorebooks.com/images/vb/web/sellback/RentTextbooks/10093_rent_textbooks_clouds_bg.jpg';

interface RentTextbooksProps {
    bodyHeader: BodyHeaderProps;
    bodyQuestionList: QuestionListProps[];
    bodyStepList: BodyStepListProps[];
}
interface RentTextbooksState {
    searchValue: string;
    hasNoResults: boolean;
}

interface BodyHeaderProps {
    text: string;
    color: string;
}

interface QuestionListProps {
    text: string;
    linkText: string;
    link: string;
}
interface BodyStepListProps {
    text: string;
    class: string;
}

export default class RentTextbooks extends Component<RentTextbooksProps, RentTextbooksState> {
    constructor(props: RentTextbooksProps) {
        super(props);
        this.state = {
            searchValue: "",
            hasNoResults: false
        };
        this.handleNoResults = this.handleNoResults.bind(this);
    }

    handleNoResults(query: string) {
        this.setState({
            searchValue: query,
            hasNoResults: true
        });
    }

    render() {
        return (
            <div className="bg-white">
                <PageHeader domain={urlOrigin!} showSearch={true} handleNoResults={this.handleNoResults}/>
                <MainSearchBar
                    handleNoResults={this.handleNoResults}
                    showError={this.state.hasNoResults}
                    searchValue={this.state.searchValue}
                    backgroundImage={backgroundImage}
                    contentAlignment={"left"}
                    searchStyleClassName={'rent-textbook-search'}
                    isbnLinkClassName={'isbn-dark-blue'}
                    searchErrorClassName={"rb-no-results-error"}
                    mainHeaderText={
                        <Fragment>
                            <span className="rent-textbook-heading">Rent College Textbooks</span>
                        </Fragment>
                    }
                    subHeaderText={
                        <Fragment>
                            <span className="rent-textbook-subheading">Find cheap textbook rentals - guaranteed!</span>
                        </Fragment>}
                    searchSubText={
                        <Fragment>
                            <div className="return-rental-text m-0 p-0">
                                <span className="text-white">or</span> <a className="light-green text-decoration-none h3" href="/YourAccount.do">Return my rental <i className="fas fa-chevron-right"></i></a>
                            </div>
                        </Fragment>
                    }
                />
                <Body
                    domain={urlOrigin!}
                    header={this.props.bodyHeader}
                    header2="How to rent a textbook and save..."
                    cardTitle="Track or return your recent rental order"
                    cardButtonText="Track or return order"
                    questionList={this.props.bodyQuestionList}
                    questionListHeader="Questions about your rental order?"
                    stepList={this.props.bodyStepList}
                />
                <Faq domain={urlOrigin!} page="rent-textbooks" popularRentalProducts={popularRentalProducts}/>
                <Footer domain={urlOrigin!}/>
            </div>
        );
    }
}

ReactDOM.render(<RentTextbooks
        bodyHeader={{text: "The best place to rent college textbooks & an easy way to save", color: "color2"}}
        bodyQuestionList={[
            {text: "Read our ", linkText: "rental return instructions", link: "https://help.valorebooks.com/article/323-rental-returns"},
            {text: "Explore our ", linkText: "rental FAQs", link: "https://help.valorebooks.com/collection/320-rental"},
            {text: "Check out our ", linkText: "top textbook rentals", link: urlOrigin+"/top-textbook-rentals"},
            {text: "Still need help? Feel free to ", linkText: "contact us", link: "https://help.valorebooks.com"},
        ]}
        bodyStepList={[
            {text: "Receive quickly in the mail", class: "step4"},
            {text: "Return them for free", class: "step2"},
            {text: "Save up to $500 a year", class: "step1"}
        ]}
    />, contentElement);
