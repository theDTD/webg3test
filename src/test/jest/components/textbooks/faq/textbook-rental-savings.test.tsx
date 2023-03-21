import React from 'react';
import TestRenderer from "react-test-renderer";
import { TextbookRentalSavings } from "../../../../../main/react/components/textbooks/faq/textbook-rental-savings";

describe("Textbook Rental Savings", () => {
    it("Textbook Rental Savings component should render properly", () => {
        const popularRentals: {title:string, product_link:string, contributor:string, img_link: string, list_price:number, rent_value:number, savings:string}[] = [
            {
                title: "Criminal Justice Today (10th Edition) (MyCrimeKit Series) (Hardcover)",
                product_link: `/textbooks/criminal-justice-today-10th-edition-mycrimekit-series-hardcover-10th-edition/9780135130308`,
                contributor: "Schmalleger, Frank",
                img_link: "https://img.valorebooks.com/W120/97/9780/978013/9780135130308.jpg",
                list_price: 139.20,
                rent_value: 15.00,
                savings: "124.20 (89%)"
            },
            {
                title: "Leadership: Theory and Practice",
                product_link: `/textbooks/leadership-theory-and-practice-4thth-edition/9781412941617`,
                contributor: "Unknown",
                img_link: "https://img.valorebooks.com/W120/97/9781/978141/9781412941617.jpg",
                list_price: 73.95,
                rent_value: 15.00,
                savings: "59.00 (79%)"
            },
            {
                title: "The Elements of Statistical Learning: Data Mining, Inference, and Prediction, Second Edition (Springer Series in Statistics)",
                product_link: `/textbooks/the-elements-of-statistical-learning-data-mining-inference-and-prediction-second-edition-springer-series-in-statistics-2nd-ed-2009-corr-7th-printing-2013th-edition/9780387848570`,
                contributor: "Trevor Hastie, Robert Tibshirani, Jerome Friedman",
                img_link: "https://img.valorebooks.com/W120/97/9780/978038/9780387848570.jpg",
                list_price: 89.95,
                rent_value: 24.89,
                savings: "65.06 (72%)"
            },
            {
                title: "Exercise Physiology Energy, Nutrition, and Human Performance",
                product_link: `/textbooks/exercise-physiology-energy-nutrition-and-human-performance-6th-edition/9780781749909`,
                contributor: "McArdle, William D., Katch, Frank I., Katch, Victor L.",
                img_link: "https://img.valorebooks.com/W120/97/9780/978078/9780781749909.jpg",
                list_price: 101.95,
                rent_value: 20.00,
                savings: "81.95 (80%)"
            },
            {
                title: "Single Variable Calculus: Early Transcendentals (Available 2010 Titles Enhanced Web Assign)",
                product_link: `/textbooks/single-variable-calculus-early-transcendentals-available-2010-titles-enhanced-web-assign-6th-edition/9780495011699`,
                contributor: "James Stewart",
                img_link: "https://img.valorebooks.com/W120/97/9780/978049/9780495011699.jpg",
                list_price: 294.95,
                rent_value: 284.38,
                savings: "10.57 (3%)"
            },
            {
                title: "Prentice Hall Real Nursing Skills Basic Nursing Skills",
                product_link: `/textbooks/prentice-hall-real-nursing-skills-basic-nursing-skills/9780131915268`,
                contributor: "Prentice-Hall Staff, Pearson Education Staff",
                img_link: "https://img.valorebooks.com/W120/97/9780/978013/9780131915268.jpg",
                list_price: 76.95,
                rent_value: 22.72,
                savings: "54.23 (70%)"
            },
            {
                title: "Society: The Basics (10th Edition)",
                product_link: `/textbooks/society-the-basics-10th-edition-10th-edition/9780135018828`,
                contributor: "John J. Macionis",
                img_link: "https://img.valorebooks.com/W120/97/9780/978013/9780135018828.jpg",
                list_price: 114.60,
                rent_value: 14.95,
                savings: "99.65 (86%)"
            },
            {
                title: "Intermediate Algebra Fifth Edition",
                product_link: `/textbooks/intermediate-algebra-fifth-edition-5th-edition/9780136007296`,
                contributor: "Martin-Gay, Elayn, Elayn Martin-Gay, Elayn Martin-Gay K. Elayn Martin-Gay",
                img_link: "https://img.valorebooks.com/W120/97/9780/978013/9780136007296.jpg",
                list_price: 158.00,
                rent_value: 14.95,
                savings: "143.05 (90%)"
            }
        ]

        const component: JSX.Element = <TextbookRentalSavings domain="https://localhost.test.domain" popularRentalProducts={popularRentals} />
        const renderedComponent: TestRenderer.ReactTestRenderer = TestRenderer.create(component);
        const root: TestRenderer.ReactTestInstance = renderedComponent.root;

        const body: TestRenderer.ReactTestInstance = root.findByType("div");
        expect(body.props.className).toEqual("col-md-9 faq-content text-start");

        const header: TestRenderer.ReactTestInstance = body.props.children[0];
        expect(header.type).toEqual("h2");
        expect(header.props.className).toEqual("text-center text-md-start");
        expect(header.props.children).toEqual("Textbook rental savings");

        const rentalWrapper: TestRenderer.ReactTestInstance = body.props.children[1];
        expect(rentalWrapper.type).toEqual("div");
        expect(rentalWrapper.props.className).toEqual("rental-wrapper d-flex flex-wrap flex-column flex-md-row");

        expect(rentalWrapper.props.children.length).toEqual(popularRentals.length);
        for(let i=0; i<popularRentals.length; i++) {
            const bookWrapper: TestRenderer.ReactTestInstance = rentalWrapper.props.children[i];
            expect(bookWrapper.type).toEqual("div");
            expect(bookWrapper.props.className).toEqual("book-wrapper col-md-6");

            const book: TestRenderer.ReactTestInstance = bookWrapper.props.children;
            expect(book.type).toEqual("div");
            expect(book.props.className).toEqual("book");

            const bookCover: TestRenderer.ReactTestInstance = book.props.children[0];
            expect(bookCover.type).toEqual("div");
            expect(bookCover.props.className).toEqual("book-cover");

            const bookLink: TestRenderer.ReactTestInstance =  bookCover.props.children;
            expect(bookLink.type).toEqual("a");
            expect(bookLink.props.className).toEqual("cover-link");
            expect(bookLink.props.href).toContain("https://localhost.test.domain");

            const bookImg: TestRenderer.ReactTestInstance =  bookLink.props.children;
            expect(bookImg.type).toEqual("img");
            expect(bookImg.props.alt).toContain(popularRentals[i].title);

            const bookDetails = book.props.children[1];
            expect(bookDetails.type).toEqual("div");
            expect(bookDetails.props.className).toEqual("book-details");

            const title: TestRenderer.ReactTestInstance = bookDetails.props.children[0];
            expect(title.type).toEqual("a");
            expect(title.props.className).toEqual("title");
            expect(title.props.href).toContain("https://localhost.test.domain");
            expect(title.props.children).toEqual(popularRentals[i].title);

            const author: TestRenderer.ReactTestInstance = bookDetails.props.children[1];
            expect(author.type).toEqual("p");
            expect(author.props.className).toEqual("author");
            expect(author.props.children[0]).toEqual("by ");
            expect(author.props.children[1]).toEqual(popularRentals[i].contributor);

            const listPrice: TestRenderer.ReactTestInstance = bookDetails.props.children[2];
            expect(listPrice.type).toEqual("p");
            expect(listPrice.props.className).toEqual("list-price");
            expect(listPrice.props.children[0]).toEqual("List Price: ");

            const listPriceSpan: TestRenderer.ReactTestInstance = listPrice.props.children[1];
            expect(listPriceSpan.type).toEqual("span");
            expect(listPriceSpan.props.children[1]).toEqual(popularRentals[i].list_price);

            const rentText: TestRenderer.ReactTestInstance = bookDetails.props.children[3];
            expect(rentText.type).toEqual("p");
            expect(rentText.props.className).toEqual("rent-text");
            expect(rentText.props.children[0]).toEqual("Rent it For: ");

            const rentTextLink: TestRenderer.ReactTestInstance = rentText.props.children[1];
            expect(rentTextLink.type).toEqual("a");
            expect(rentTextLink.props.className).toEqual("rent-value");
            expect(rentTextLink.props.href).toContain("https://localhost.test.domain");
            expect(rentTextLink.props.children[1]).toEqual(popularRentals[i].rent_value);

            const savings: TestRenderer.ReactTestInstance = bookDetails.props.children[4];
            expect(savings.type).toEqual("p");
            expect(savings.props.className).toEqual("savings-text");
            expect(savings.props.children[0]).toContain("Save: ");
            expect(savings.props.children[1]).toEqual(popularRentals[i].savings);
        }
    })
})