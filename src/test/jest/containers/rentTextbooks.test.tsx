import React from "react";
import TestRenderer, {ReactTestInstance, ReactTestRenderer} from "react-test-renderer";
import PageHeader from "../../../main/react/components/header/pageHeader";
import MainSearchBar from "../../../main/react/components/textbooks/mainSearchBar";
import Body from "../../../main/react/components/textbooks/body";
import Faq from "../../../main/react/components/textbooks/faq";
import Footer from "../../../main/react/components/textbooks/footer";
import RentTextbooks from "../../../main/react/containers/rentTextbooks";

describe('render', () => {
    it("should render properly", ()=>{
        const component: JSX.Element = <RentTextbooks
            bodyHeader={{text: "The best place to rent college textbooks & an easy way to save", color: "color2"}}
            bodyQuestionList={[
                {text: "Read our ", linkText: "rental return instructions", link: "https://help.valorebooks.com/article/323-rental-returns"},
                {text: "Explore our ", linkText: "rental FAQs", link: "https://help.valorebooks.com/collection/320-rental"},
                {text: "Check out our ", linkText: "top textbook rentals", link: "http://localhost/top-textbook-rentals"},
                {text: "Still need help? Feel free to ", linkText: "contact us", link: "https://help.valorebooks.com"},
            ]}
            bodyStepList={[
                {text: "Receive quickly in the mail", class: "step4"},
                {text: "Return them for free", class: "step2"},
                {text: "Save up to $500 a year", class: "step1"}
            ]}
        />;
        const renderedComponent: ReactTestRenderer = TestRenderer.create(component);
        const root: ReactTestInstance = renderedComponent.root;

        const mainDiv: ReactTestInstance = root.findByType('div');
        expect(mainDiv.props.className).toEqual("bg-white");

        const mainDivContents: ReactTestInstance[] = mainDiv.children;
        expect(mainDivContents.length).toEqual(5);

        const header: ReactTestInstance = mainDivContents[0];
        expect(header.type).toEqual(PageHeader);

        const mainSearchBar: ReactTestInstance = mainDivContents[1];
        expect(mainSearchBar.type).toEqual(MainSearchBar);

        const bodyComponent: ReactTestInstance = mainDivContents[2];
        expect(bodyComponent.type).toEqual(Body);

        const faqComponent: ReactTestInstance = mainDivContents[3];
        expect(faqComponent.type).toEqual(Faq);

        const footer: ReactTestInstance = mainDivContents[4];
        expect(footer.type).toEqual(Footer);
    })
})