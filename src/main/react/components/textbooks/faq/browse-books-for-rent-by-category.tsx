import React from "react";

interface BrowseBooksForRentByCategoryProps {
    domain: string;
}

export const BrowseBooksForRentByCategory = (props: BrowseBooksForRentByCategoryProps) => (
    <div id="browse-books-for-rent-by-cateogry" className="col-md-9 faq-content text-start">
        <h2 className="text-center text-md-start">Browse books for rent by category</h2>
        <div className="d-flex flex-column justify-content-between flex-md-row text-center text-md-start">
            <ul>
                <li><a href={props.domain + "/textbook-rental-subject/rent-accounting-textbooks"}>Accounting</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-algebra-textbooks"}>Algebra</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-anthropology-textbooks"}>Anthropology</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-architecture-textbooks"}>Architecture</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-art-textbooks"}>Art</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-biology-textbooks"}>Biology</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-business-textbooks"}>Business</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-calculus-textbooks"}>Calculus</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-chemistry-textbooks"}>Chemistry</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-computer-science-textbooks"}>Computer Science</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-earth-science-textbooks"}>Earth Science</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-economics-textbooks"}>Economics</a></li>
            </ul>
            <ul>
                <li><a href={props.domain + "/textbook-rental-subject/rent-education-textbooks"}>Education</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-engineering-textbooks"}>Engineering</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-english-textbooks"}>English</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-french-textbooks"}>French</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-geometry-textbooks"}>Geometry</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-history-textbooks"}>History</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-law-textbooks"}>Law</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-literature-textbooks"}>Literature</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-management-textbooks"}>Management</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-mathematics-textbooks"}>Mathematics</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-medical-science-textbooks"}>Medical Science</a></li>
            </ul>
            <ul>
                <li><a href={props.domain + "/textbook-rental-subject/rent-nursing-textbooks"}>Nursing</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-philosophy-textbooks"}>Philosophy</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-physics-textbooks"}>Physics</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-political-science-textbooks"}>Political Science</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-psychology-textbooks"}>Psychology</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-religion-textbooks"}>Religion</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-science-textbooks"}>Science</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-social-study-textbooks"}>Social Study</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-sociology-textbooks"}>Sociology</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-spanish-textbooks"}>Spanish</a></li>
                <li><a href={props.domain + "/textbook-rental-subject/rent-technical-textbooks"}>Technical</a></li>
            </ul>
        </div>
    </div>
);