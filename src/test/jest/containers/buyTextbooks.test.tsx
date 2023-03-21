import React from "react";
import TestRenderer from "react-test-renderer";
import {configure, shallow} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import BuyTextbooks from "../../../main/react/containers/buyTextbooks";
import PageHeader from "../../../main/react/components/header/pageHeader";
import MainSearchBar from "../../../main/react/components/textbooks/mainSearchBar";
import Body from "../../../main/react/components/textbooks/body";
import Faq from "../../../main/react/components/textbooks/faq";
import Footer from "../../../main/react/components/textbooks/footer";


configure({adapter: new Adapter()});
describe('render', () => {
    it("should render properly", ()=>{
        const component: JSX.Element = <BuyTextbooks
            bodyHeader={{text: "Your source for buying cheap college textbooks online. Up to 90% off!", color: "color1"}}
            bodyQuestionList={[
                {text: "Explore our ", linkText: "FAQs", link: "https://help.valorebooks.com/collection/302-purchase"},
                {text: "Check out our ", linkText: "top textbooks for college", link: "http://localhost/top-textbooks-for-college"},
                {text: "Still need help? Feel free to ", linkText: "contact us", link: "https://help.valorebooks.com"},
            ]}
            bodyStepList={[
                {text: "Save up to 90% on everything", class: "step1"},
                {text: "Get them in time for class", class: "step2"},
                {text: "Hassle-free return policy", class: "step3"}
            ]}
        />;
        const renderedComponent: TestRenderer.ReactTestRenderer = TestRenderer.create(component);
        const root: TestRenderer.ReactTestInstance = renderedComponent.root;

        const mainDiv: TestRenderer.ReactTestInstance = root.findByType('div');
        expect(mainDiv.props.className).toEqual("bg-white");

        const mainDivContents: TestRenderer.ReactTestInstance[] = mainDiv.children;
        expect(mainDivContents.length).toEqual(5);

        const header: TestRenderer.ReactTestInstance = mainDivContents[0];
        expect(header.type).toEqual(PageHeader);

        const mainSearchBar: TestRenderer.ReactTestInstance = mainDivContents[1];
        expect(mainSearchBar.type).toEqual(MainSearchBar);

        const bodyComponent: TestRenderer.ReactTestInstance = mainDivContents[2];
        expect(bodyComponent.type).toEqual(Body);

        const faqComponent: TestRenderer.ReactTestInstance = mainDivContents[3];
        expect(faqComponent.type).toEqual(Faq);

        const footer: TestRenderer.ReactTestInstance = mainDivContents[4];
        expect(footer.type).toEqual(Footer);
    })
})