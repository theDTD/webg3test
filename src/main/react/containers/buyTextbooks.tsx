
import React, {Component} from 'react';
import ReactDOM from "react-dom";
import PageHeader from "../components/header/pageHeader";
import MainSearchBar from "../components/textbooks/mainSearchBar";
import Body from "../components/textbooks/body";
import Faq from "../components/textbooks/faq";
import Footer from "../components/textbooks/footer";

const contentElement = document.getElementById('content');
const urlOrigin = contentElement?.getAttribute("urlOrigin") || '';
const sideImage = 'https://img.valorebooks.com/images/vb/web/10094buytextbooks/buy-textbooks-shelf.jpg';
const contentElementParams = contentElement?.getAttribute("params");
const params = contentElementParams? JSON.parse(contentElementParams) : "";

export interface BuyTextbooksProps {
    bodyHeader: BodyHeaderProps;
    bodyQuestionList: BodyQuestionListProps[];
    bodyStepList: BodyStepListProps[];
}

export interface BuyTextbooksState {
    searchValue: string;
    hasNoResults: boolean;
}

export interface BodyHeaderProps {
    text: string;
    color: string;
}

export interface BodyStepListProps {
    text: string;
    class: string;
}

export interface BodyQuestionListProps {
    text: string;
    linkText: string;
    link: string;
}

export default class BuyTextbooks extends Component<BuyTextbooksProps, BuyTextbooksState> {
    constructor(props: BuyTextbooksProps) {
        super(props);
        this.state = {
            searchValue: params.search || "",
            hasNoResults: !!params.error
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
                <PageHeader domain={urlOrigin} showSearch={true} handleNoResults={this.handleNoResults}/>
                <MainSearchBar
                    handleNoResults={this.handleNoResults}
                    showError={this.state.hasNoResults}
                    searchValue={this.state.searchValue}
                    sideImage={sideImage}
                    subHeaderText={'Save up to $500 per year on millions of book titles!'}
                    mainHeaderText={'Buy College Textbooks'}
                    searchErrorClassName={"no-results-error"}
                />
                <Body
                    domain={urlOrigin}
                    header={this.props.bodyHeader}
                    header2=""
                    cardTitle="Track your recent order"
                    cardButtonText="Track order"
                    questionList={this.props.bodyQuestionList}
                    stepList={this.props.bodyStepList}
                    questionListHeader="Questions?"
                />
                <Faq domain={urlOrigin} page="buy-textbooks" popularRentalProducts={[]}/>
                <Footer domain={urlOrigin}/>
            </div>
        );
    }
}

ReactDOM.render(<BuyTextbooks
        bodyHeader={{text: "Your source for buying cheap college textbooks online. Up to 90% off!", color: "color1"}}
        bodyQuestionList={[
            {text: "Explore our ", linkText: "FAQs", link: "https://help.valorebooks.com/collection/302-purchase"},
            {text: "Check out our ", linkText: "top textbooks for college", link: urlOrigin+"/top-textbooks-for-college"},
            {text: "Still need help? Feel free to ", linkText: "contact us", link: "https://help.valorebooks.com"},
        ]}
        bodyStepList={[
            {text: "Save up to 90% on everything", class: "step1"},
            {text: "Get them in time for class", class: "step2"},
            {text: "Hassle-free return policy", class: "step3"}
        ]}
/>, contentElement);
