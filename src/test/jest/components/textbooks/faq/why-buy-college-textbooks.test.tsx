import React from 'react';
import TestRenderer from 'react-test-renderer';
import {WhyBuyCollegeTextbooks} from "../../../../../main/react/components/textbooks/faq/why-buy-college-textbooks";

describe("FAQ - why buy college textbooks test",()=> {
    it("should render properly", () => {
        const component: JSX.Element = <WhyBuyCollegeTextbooks  domain="http://localhost" />;
        const renderer: TestRenderer.ReactTestRenderer = TestRenderer.create(component);
        const root: TestRenderer.ReactTestInstance = renderer.root;

        const container: TestRenderer.ReactTestInstance = root.findByType("div");
        expect(container.props.id).toEqual("why-buy-college-textbooks");
        expect(container.props.children.length).toEqual(8);
        expect(container.props.children[0].type).toEqual("h2");
        expect(container.props.children[0].props.className).toEqual("text-center text-md-start");
        expect(container.props.children[0].props.children).toEqual("Why buy college textbooks online at ValoreBooks?");

        const pHeads: string[] = [
            "One-stop shopping.",
            "Huge savings.",
            "Extra Mile Guarantee.",
            "Sell your books back when you're done with them.",
            "Options for Buying College Textbooks at ValoreBooks",
            "Start Searching for Your Books Today"
        ];
        const pContents: string[] = [
            "When you're looking for cheap college textbooks online, come to ValoreBooks! ValoreBooks is the best website to save money on college textbooks because we offer great prices, incredible convenience and service to make every customer's shopping experience fast and stress-free. You can count on us for great prices and great service every time. Want to learn more about the benefits of buying from ValoreBooks? Here's how we do it:",
            "We compare millions of low-cost college textbooks from thousands of sellers to find you the best book at the best price. That means no more wasted time and no more comparison-shopping.",
            "Our marketplace model saves the average college student $500 per year on college textbooks. It's our way of helping you manage expenses and get the most out of college. Whether you're looking for new textbooks or cheap used college textbooks, we've got the books - and the savings. So, let us help you lower your textbook costs.",
            "We're so sure you'll be happy with your ValoreBooks purchases, we offer a money-back guarantee on the books you buy. If your order arrives in poor condition or you received a different item, you can return it within 30 days for a full refund. No questions asked. That's why ValoreBooks is the best place to buy discounted textbooks for college.",
            "If you don't want to keep your books, you can sell them back to us. Online quotes are instant, shipping is free, and our sellback prices are the highest in the industry. ",
            "When you want to buy college textbooks online, ValoreBooks offers you options to fit your budget: buy new books, used books, or rent. Click on an individual book listing, to see prices for available options, as well as information on book condition for used or rental copies.",
            "When you're ready to buy college textbooks online, come to ValoreBooks. We're proud to be your top resource for finding affordable textbooks wherever you are, anytime, day or night. Search books by ISBN, browse top textbooks, search by school to find your own textbook directory, and more. It's never been easier to find great prices on the books you need. Start searching today!"
        ];

        const p1: TestRenderer.ReactTestInstance = container.props.children[1];
        expect(p1.type).toEqual("p");
        expect(p1.props.children).toEqual(pContents[0]);

        for(let i=0; i<6; i++) {
            const p: TestRenderer.ReactTestInstance = container.props.children[i+2];
            const pHead: TestRenderer.ReactTestInstance = p.props.children[0];
            const pContent: TestRenderer.ReactTestInstance = p.props.children[1];
            expect(p.type).toEqual("p");
            expect(pHead.type).toEqual("span");
            expect(pHead.props.className).toEqual("p-head");
            expect(pHead.props.children).toEqual(pHeads[i]);

            expect(pContent.type).toEqual("span");
            if (i != 3)
                expect(pContent.props.children).toEqual(pContents[i+1]);
            else {
                expect(pContent.props.children[0]).toEqual(pContents[i+1]);
                expect(pContent.props.children[1].type).toEqual("a");
                expect(pContent.props.children[1].props.href).toEqual("http://localhost/sell-textbooks");
                expect(pContent.props.children[1].props.children).toEqual("Learn more.");
            }

        }
    });
});