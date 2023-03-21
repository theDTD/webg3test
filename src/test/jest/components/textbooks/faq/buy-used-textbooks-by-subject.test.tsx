import React from 'react';
import TestRenderer, {ReactTestInstance, ReactTestRenderer} from 'react-test-renderer';
import {BuyUsedTextbooksBySubject} from "../../../../../main/react/components/textbooks/faq/buy-used-textbooks-by-subject";

describe("FAQ - buy used textbooks by subject test",()=>{
    it("should render properly",()=> {
        const component: JSX.Element = <BuyUsedTextbooksBySubject domain="http://localhost" />;
        const renderer: ReactTestRenderer = TestRenderer.create(component);
        const root: ReactTestInstance = renderer.root;

        const container: ReactTestInstance = root.findByType("div");
        expect(container.props.id).toEqual("buy-used-textbooks-by-subject");
        expect(container.props.children.length).toEqual(2);
        expect(container.props.children[0].type).toEqual("h2");
        expect(container.props.children[0].props.className).toEqual("text-center text-md-start");
        expect(container.props.children[0].props.children).toEqual("Used textbooks by subject");

        expect(container.props.children[1].type).toEqual("div");
        expect(container.props.children[1].props.className).toEqual("d-flex flex-column flex-md-row text-center text-md-start");
        expect(container.props.children[1].props.children.length).toEqual(3);

        const ul1: ReactTestInstance = container.props.children[1].props.children[0];
        const ul2: ReactTestInstance = container.props.children[1].props.children[1];
        const ul3: ReactTestInstance = container.props.children[1].props.children[2];

        expect(ul1.type).toEqual("ul");
        expect(ul2.type).toEqual("ul");
        expect(ul3.type).toEqual("ul");

        expect(ul1.props.children.length).toEqual(17);
        expect(ul2.props.children.length).toEqual(17);
        expect(ul3.props.children.length).toEqual(17);

        const ul1List: {content:string, number:string, href:string}[] = [
            {content:"Antiques & Collectibles", number: " (362)", href:"http://localhost/new-used-textbooks/antiques-collectibles"},
            {content:"Architecture", number: " (2,387)", href:"http://localhost/new-used-textbooks/architecture"},
            {content:"Art", number: " (5,930)", href:"http://localhost/new-used-textbooks/art"},
            {content:"Bibles", number: " (159)", href:"http://localhost/new-used-textbooks/bibles"},
            {content:"Biography & Autobiography", number: " (7,196)", href:"http://localhost/new-used-textbooks/biography-autobiography"},
            {content:"Body, Mind & Spirit", number: " (1,505)", href:"http://localhost/new-used-textbooks/body-mind-spirit"},
            {content:"Business & Economics", number: " (55,818)", href:"http://localhost/new-used-textbooks/business-economics"},
            {content:"Comics & Graphic Novels", number: " (416)", href:"http://localhost/new-used-textbooks/comics-graphic-novels"},
            {content:"Computers", number: " (24,450)", href:"http://localhost/new-used-textbooks/computers"},
            {content:"Cooking", number: " (846)", href:"http://localhost/new-used-textbooks/cooking"},
            {content:"Crafts & Hobbies", number: " (760)", href:"http://localhost/new-used-textbooks/crafts-hobbies"},
            {content:"Design", number: " (1,109)", href:"http://localhost/new-used-textbooks/design"},
            {content:"Drama", number: " (2,468)", href:"http://localhost/new-used-textbooks/drama"},
            {content:"Education", number: " (31,777)", href:"http://localhost/new-used-textbooks/education"},
            {content:"Family & Relationships", number: " (4,353)", href:"http://localhost/new-used-textbooks/family-relationships"},
            {content:"Fiction", number: " (8,441)", href:"http://localhost/new-used-textbooks/fiction"},
            {content:"Foreign Language Study", number: " (21,648)", href:"http://localhost/new-used-textbooks/foreign-language-study"}
        ];

        const ul2List: {content:string, number:string, href:string}[] = [
            {content:"Games", number: " (701)",href:"http://localhost/new-used-textbooks/games"},
            {content:"Gardening", number: " (378)",href:"http://localhost/new-used-textbooks/gardening"},
            {content:"Health & Fitness", number: " (4,595)",href:"http://localhost/new-used-textbooks/health-fitness"},
            {content:"History", number: " (33,583)",href:"http://localhost/new-used-textbooks/history"},
            {content:"House & Home", number: " (382)",href:"http://localhost/new-used-textbooks/house-home"},
            {content:"Humor", number: " (320)",href:"http://localhost/new-used-textbooks/humor"},
            {content:"Juvenile Fiction", number: " (9,226)",href:"http://localhost/new-used-textbooks/juvenile-fiction"},
            {content:"Juvenile Nonfiction", number: " (65,557)",href:"http://localhost/new-used-textbooks/juvenile-nonfiction"},
            {content:"Language Arts & Disciplines", number: " (28,556)",href:"http://localhost/new-used-textbooks/language-arts-disciplines"},
            {content:"Law", number: " (14,806)",href:"http://localhost/new-used-textbooks/law"},
            {content:"Literary Collections", number: " (2,791)",href:"http://localhost/new-used-textbooks/literary-collections"},
            {content:"Literary Criticism", number: " (17,974)",href:"http://localhost/new-used-textbooks/literary-criticism"},
            {content:"Mathematics", number: " (29,377)",href:"http://localhost/new-used-textbooks/mathematics"},
            {content:"Medical", number: " (36,068)",href:"http://localhost/new-used-textbooks/medical"},
            {content:"Music", number: " (6,704)",href:"http://localhost/new-used-textbooks/music"},
            {content:"Nature", number: " (4,474)",href:"http://localhost/new-used-textbooks/nature"},
            {content:"Performing Arts", number: " (4,709)",href:"http://localhost/new-used-textbooks/performing-arts"}
        ];
        const ul3List:{content:string, number:string, href:string}[] = [
            {content:"Pets", number: " (209)",href:"http://localhost/new-used-textbooks/pets"},
            {content:"Philosophy", number: " (11,321)",href:"http://localhost/new-used-textbooks/philosophy"},
            {content:"Photography", number: " (601)",href:"http://localhost/new-used-textbooks/photography"},
            {content:"Poetry", number: " (4,324)",href:"http://localhost/new-used-textbooks/poetry"},
            {content:"Political Science", number: " (30,347)",href:"http://localhost/new-used-textbooks/political-science"},
            {content:"Psychology", number: " (18,227)",href:"http://localhost/new-used-textbooks/psychology"},
            {content:"Reference", number: " (3,746)",href:"http://localhost/new-used-textbooks/reference"},
            {content:"Religion", number: " (19,824)",href:"http://localhost/new-used-textbooks/religion"},
            {content:"Science", number: " (50,397)",href:"http://localhost/new-used-textbooks/science"},
            {content:"Self-Help", number: " (1,989)",href:"http://localhost/new-used-textbooks/self-help"},
            {content:"Social Science", number: " (46,659)",href:"http://localhost/new-used-textbooks/social-science"},
            {content:"Sports & Recreation", number: " (2,623)",href:"http://localhost/new-used-textbooks/sports-recreation"},
            {content:"Study Aids", number: " (1,040)",href:"http://localhost/new-used-textbooks/study-aids"},
            {content:"Technology & Engineering", number: " (28,157)",href:"http://localhost/new-used-textbooks/technology-engineering"},
            {content:"Transportation", number: " (2,654)",href:"http://localhost/new-used-textbooks/transportation"},
            {content:"Travel", number: " (3,245)",href:"http://localhost/new-used-textbooks/travel"},
            {content:"True Crime", number: " (236)",href:"http://localhost/new-used-textbooks/true-crime"}
        ];

        for(let i=0; i<17; i++) {
            const ul1li: ReactTestInstance = ul1.props.children[i];
            expect(ul1li.type).toEqual("li");
            expect(ul1li.props.children[0].type).toEqual("a");
            expect(ul1li.props.children[0].props.href).toEqual(ul1List[i].href);
            expect(ul1li.props.children[0].props.children).toEqual(ul1List[i].content);
            expect(ul1li.props.children[1]).toEqual(ul1List[i].number);

            const ul2li: ReactTestInstance = ul2.props.children[i];
            expect(ul2li.type).toEqual("li");
            expect(ul2li.props.children[0].type).toEqual("a");
            expect(ul2li.props.children[0].props.href).toEqual(ul2List[i].href);
            expect(ul2li.props.children[0].props.children).toEqual(ul2List[i].content);
            expect(ul2li.props.children[1]).toEqual(ul2List[i].number);

            const ul3li: ReactTestInstance = ul3.props.children[i];
            expect(ul3li.type).toEqual("li");
            expect(ul3li.props.children[0].type).toEqual("a");
            expect(ul3li.props.children[0].props.href).toEqual(ul3List[i].href);
            expect(ul3li.props.children[0].props.children).toEqual(ul3List[i].content);
            expect(ul3li.props.children[1]).toEqual(ul3List[i].number);
        }
    })
})