import TestRenderer from "react-test-renderer";
import PageHeader from "../../../main/react/components/header/pageHeader";
import Footer from "../../../main/react/components/textbooks/footer";
import React from "react";
import MarketingPageContent from "../../../main/react/components/marketingPage/marketingPageContent";
import MarketingPage from "../../../main/react/containers/marketingPage";

describe('MarketingPage', ()  =>{
    it("renders correctly", () => {
        const component = <MarketingPage />;
        const renderedComponent = TestRenderer.create(component);
        const root = renderedComponent.root;

        const container = root.findByType("div");

        const contents = container.props.children;
        expect(contents.length).toEqual(3);

        expect(contents[0].type).toEqual(PageHeader);
        expect(contents[1].type).toEqual(MarketingPageContent);
        expect(contents[2].type).toEqual(Footer);
    });
});