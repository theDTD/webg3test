import React from "react";

interface Book {
    title: string;
    product_link: string;
    contributor: string;
    img_link: string;
    list_price: number;
    rent_value: number;
    savings: string;
}
interface TextbookRentalSavingsProps {
    domain: string;
    popularRentalProducts: Book[]
}

export const TextbookRentalSavings = ({ domain, popularRentalProducts } : TextbookRentalSavingsProps ) => {

    return (
        <div id="textbook-rental-savings"  className="col-md-9 faq-content text-start">
            <h2 className="text-center text-md-start">Textbook rental savings</h2>
            <div className="rental-wrapper d-flex flex-wrap flex-column flex-md-row">
                {
                    popularRentalProducts.map((book:Book, index:number) => (
                        <div key={index} className="book-wrapper col-md-6">
                            <div className="book">
                                <div className="book-cover">
                                    <a className="cover-link" href={`${domain}${book.product_link}`}>
                                        <img src={book.img_link} alt={book.title}/>
                                    </a>
                                </div>
                                <div className="book-details">
                                    <a className="title" href={`${domain}${book.product_link}`}>{book.title}</a>
                                    <p className="author">by {book.contributor}</p>
                                    <p className="list-price">List Price: <span>${book.list_price}</span></p>
                                    <p className="rent-text">Rent it For: <a href={`${domain}${book.product_link}`}className="rent-value">${book.rent_value}</a></p>
                                    <p className="savings-text">Save: ${book.savings}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}