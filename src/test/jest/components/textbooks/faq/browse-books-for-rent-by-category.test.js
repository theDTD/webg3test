import React from 'react';
import TestRenderer from 'react-test-renderer';
import {BrowseBooksForRentByCategory} from "../../../../../main/react/components/textbooks/faq/browse-books-for-rent-by-category";

describe("FAQ - browse books for rent by category test", ()=>{
    it("should render properly", ()=>{
        const component = <BrowseBooksForRentByCategory domain="http://localhost" />;
        const renderer = TestRenderer.create(component);
        const root = renderer.root;

        const container = root.findByType("div");
        expect(container.props.id).toEqual("browse-books-for-rent-by-cateogry");
        expect(container.props.children.length).toEqual(2);
        expect(container.props.children[0].type).toEqual("h2");
        expect(container.props.children[0].props.className).toEqual("text-center text-md-start");
        expect(container.props.children[0].props.children).toEqual("Browse books for rent by category");

        expect(container.props.children[1].type).toEqual("div");
        expect(container.props.children[1].props.className).toEqual("d-flex flex-column justify-content-between flex-md-row text-center text-md-start");
        expect(container.props.children[1].props.children.length).toEqual(3);

        const ul1 = container.props.children[1].props.children[0];
        const ul2 = container.props.children[1].props.children[1];
        const ul3 = container.props.children[1].props.children[2];

        expect(ul1.type).toEqual("ul");
        expect(ul2.type).toEqual("ul");
        expect(ul3.type).toEqual("ul");

        expect(ul1.props.children.length).toEqual(12);
        expect(ul2.props.children.length).toEqual(11);
        expect(ul3.props.children.length).toEqual(11);
        
        const ul1List = [
            { href: "http://localhost/textbook-rental-subject/rent-accounting-textbooks", name: "Accounting" },
            { href: "http://localhost/textbook-rental-subject/rent-algebra-textbooks", name: "Algebra" },
            { href: "http://localhost/textbook-rental-subject/rent-anthropology-textbooks", name: "Anthropology" },
            { href: "http://localhost/textbook-rental-subject/rent-architecture-textbooks", name: "Architecture" },
            { href: "http://localhost/textbook-rental-subject/rent-art-textbooks", name: "Art" },
            { href: "http://localhost/textbook-rental-subject/rent-biology-textbooks", name: "Biology" },
            { href: "http://localhost/textbook-rental-subject/rent-business-textbooks", name: "Business" },
            { href: "http://localhost/textbook-rental-subject/rent-calculus-textbooks", name: "Calculus" },
            { href: "http://localhost/textbook-rental-subject/rent-chemistry-textbooks", name: "Chemistry" },
            { href: "http://localhost/textbook-rental-subject/rent-computer-science-textbooks", name: "Computer Science" },
            { href: "http://localhost/textbook-rental-subject/rent-earth-science-textbooks", name: "Earth Science" },
            { href: "http://localhost/textbook-rental-subject/rent-economics-textbooks", name: "Economics" }
        ];

        const ul2List = [
            { href: "http://localhost/textbook-rental-subject/rent-education-textbooks", name: "Education" },
            { href: "http://localhost/textbook-rental-subject/rent-engineering-textbooks", name: "Engineering" },
            { href: "http://localhost/textbook-rental-subject/rent-english-textbooks", name: "English" },
            { href: "http://localhost/textbook-rental-subject/rent-french-textbooks", name: "French" },
            { href: "http://localhost/textbook-rental-subject/rent-geometry-textbooks", name: "Geometry" },
            { href: "http://localhost/textbook-rental-subject/rent-history-textbooks", name: "History" },
            { href: "http://localhost/textbook-rental-subject/rent-law-textbooks", name: "Law" },
            { href: "http://localhost/textbook-rental-subject/rent-literature-textbooks", name: "Literature" },
            { href: "http://localhost/textbook-rental-subject/rent-management-textbooks", name: "Management" },
            { href: "http://localhost/textbook-rental-subject/rent-mathematics-textbooks", name: "Mathematics" },
            { href: "http://localhost/textbook-rental-subject/rent-medical-science-textbooks", name: "Medical Science" }
        ];
        
        const ul3List = [
            { href: "http://localhost/textbook-rental-subject/rent-nursing-textbooks", name: "Nursing" },
            { href: "http://localhost/textbook-rental-subject/rent-philosophy-textbooks", name: "Philosophy" },
            { href: "http://localhost/textbook-rental-subject/rent-physics-textbooks", name: "Physics" },
            { href: "http://localhost/textbook-rental-subject/rent-political-science-textbooks", name: "Political Science" },
            { href: "http://localhost/textbook-rental-subject/rent-psychology-textbooks", name: "Psychology" },
            { href: "http://localhost/textbook-rental-subject/rent-religion-textbooks", name: "Religion" },
            { href: "http://localhost/textbook-rental-subject/rent-science-textbooks", name: "Science" },
            { href: "http://localhost/textbook-rental-subject/rent-social-study-textbooks", name: "Social Study" },
            { href: "http://localhost/textbook-rental-subject/rent-sociology-textbooks", name: "Sociology" },
            { href: "http://localhost/textbook-rental-subject/rent-spanish-textbooks", name: "Spanish" },
            { href: "http://localhost/textbook-rental-subject/rent-technical-textbooks", name: "Technical" }
        ];

        for(let i=0; i<11; i++) {
            expect(ul1.props.children[i].type).toEqual("li");
            const ul1Li = ul1.props.children[i].props.children;
            expect(ul1Li.type).toEqual("a");
            expect(ul1Li.props.href).toEqual(ul1List[i].href);
            expect(ul1Li.props.children).toEqual(ul1List[i].name);

            expect(ul2.props.children[i].type).toEqual("li");
            const ul2Li = ul2.props.children[i].props.children;
            expect(ul2Li.type).toEqual("a");
            expect(ul2Li.props.href).toEqual(ul2List[i].href);
            expect(ul2Li.props.children).toEqual(ul2List[i].name);

            expect(ul3.props.children[i].type).toEqual("li");
            const ul3Li = ul3.props.children[i].props.children;
            expect(ul3Li.type).toEqual("a");
            expect(ul3Li.props.href).toEqual(ul3List[i].href);
            expect(ul3Li.props.children).toEqual(ul3List[i].name);
        }

        expect(ul1.props.children[11].type).toEqual("li");
        const ul1li12 = ul1.props.children[11].props.children;
        expect(ul1li12.type).toEqual("a");
        expect(ul1li12.props.href).toEqual(ul1List[11].href);
        expect(ul1li12.props.children).toEqual(ul1List[11].name);
    });
});