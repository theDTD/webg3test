import React from 'react';
import TestRenderer from 'react-test-renderer';
import {WhyRent} from "../../../../../main/react/components/textbooks/faq/why-rent";

describe("FAQ - why rent test",()=> {
    it("should render properly", () => {
        const component = <WhyRent domain="http://localhost"/>;
        const renderer = TestRenderer.create(component);
        const root = renderer.root;

        const container = root.findByType("div");
        expect(container.props.id).toEqual("why-rent");
        expect(container.props.children.length).toEqual(11);
        expect(container.props.children[0].type).toEqual("h2");
        expect(container.props.children[0].props.className).toEqual("text-center text-md-start");
        expect(container.props.children[0].props.children).toEqual("Why rent with ValoreBooks?");

        const pHeads = [
            "Economical rentals. Easy returns.",
            "Low price guarantee.",
            "One-stop shopping.",
            "Flexible rental terms.",
            "Free rental return shipping.",
            "Extra Mile Guarantee.",
            "Convenience"
        ];

        const pContents = [
            "Use a book during the semester, then return it when the term is done. Our customers save on book costs when they choose to rent. Not only are textbook rentals less expensive than list price, our prices are some of the best in the business. That's because when you shop our website, our marketplace model compares books rentals from thousands of providers. In other words, we make it easy for you to find the best price.",
            "We guarantee our unbeatable rental prices. If you rent a book from us and find a lower price within 7 days, we'll refund the difference.",
            "Our marketplace has thousands of rental providers competing to offer you the best rental prices. No more time spent comparison shopping to find the best place to rent college textbooks.",
            "Choose the length of your term – one quarter or one semester. You select what works best for you.",
            "When it's time to send your book back, we'll mail you a free shipping label.",
            "If your order arrives in poor condition or you received a different item, you can return it within 30 days for a full refund. No questions asked.",
            "With a huge selection of books at your fingertips, you don't even have to leave your chair to get the best deals. Shop anywhere, anytime – online.",
            "When it comes to book rentals, there's no reason to hesitate. With low prices, a huge selection and a money-back guarantee, ValoreBooks makes it easy to rent the books you need at an affordable cost.",
            { 0: "Still have questions? Explore our ", 1: "rental FAQs", 2: " to get answers to all your questions, including what's included with your rental and how to return a rental."},
            "Ready to rent? Simply enter a textbook ISBN, title or author in the search box, and find what you need today!"
        ]

        for(let i=0; i<10; i++) {
            const p = container.props.children[i+1];
            expect(p.type).toEqual("p");

            if (i<7) {
                const pHead = p.props.children[0];
                expect(pHead.type).toEqual("span");
                expect(pHead.props.className).toEqual("p-head");
                expect(pHead.props.children).toEqual(pHeads[i]);

                const pContent = p.props.children[1];
                expect(pContent.type).toEqual("span");
                expect(pContent.props.children).toEqual(pContents[i]);
            }
            else if (i == 8) {
                const pContent = p.props.children;
                expect(pContent.type).toEqual("span");
                expect(pContent.props.children[0]).toEqual(pContents[i]["0"]);
                expect(pContent.props.children[1].type).toEqual("a");
                expect(pContent.props.children[1].props.href).toEqual("https://help.valorebooks.com/collection/320-rental");
                expect(pContent.props.children[1].props.children).toEqual(pContents[i]["1"]);
                expect(pContent.props.children[2]).toEqual(pContents[i]["2"]);
            } else {
                const pContent = p.props.children;
                expect(pContent.type).toEqual("span");
                expect(pContent.props.children).toEqual(pContents[i]);
            }

        }
    });
});