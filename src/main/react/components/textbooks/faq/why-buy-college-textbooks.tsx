import React from "react";

interface WhyBuyCollegeTextbooksProps {
    domain: string;
}

export const WhyBuyCollegeTextbooks = (props: WhyBuyCollegeTextbooksProps) => (
    <div id="why-buy-college-textbooks" className="col-md-9 faq-content text-start">
        <h2 className="text-center text-md-start">Why buy college textbooks online at ValoreBooks?</h2>
        <p lang="en-us">
            When you're looking for cheap college textbooks online, come to ValoreBooks! ValoreBooks is the best website to save money on college textbooks because we offer great prices, incredible convenience and service to make every customer's shopping experience fast and stress-free. You can count on us for great prices and great service every time. Want to learn more about the benefits of buying from ValoreBooks? Here's how we do it:
        </p>
        <p lang="en-us">
            <span className="p-head">One-stop shopping.</span>
            <span>We compare millions of low-cost college textbooks from thousands of sellers to find you the best book at the best price. That means no more wasted time and no more comparison-shopping.</span>
        </p>
        <p lang="en-us">
            <span className="p-head">Huge savings.</span>
            <span>Our marketplace model saves the average college student $500 per year on college textbooks. It's our way of helping you manage expenses and get the most out of college. Whether you're looking for new textbooks or cheap used college textbooks, we've got the books - and the savings. So, let us help you lower your textbook costs.</span>
        </p>
        <p lang="en-us">
            <span className="p-head">Extra Mile Guarantee.</span>
            <span>We're so sure you'll be happy with your ValoreBooks purchases, we offer a money-back guarantee on the books you buy. If your order arrives in poor condition or you received a different item, you can return it within 30 days for a full refund. No questions asked. That's why ValoreBooks is the best place to buy discounted textbooks for college.</span>
        </p>
        <p lang="en-us">
            <span className="p-head">Sell your books back when you're done with them.</span>
            <span>If you don't want to keep your books, you can sell them back to us. Online quotes are instant, shipping is free, and our sellback prices are the highest in the industry. <a className="text-decoration-underline" href={props.domain + "/sell-textbooks"}>Learn more.</a></span>
        </p>
        <p lang="en-us">
            <span className="p-head">Options for Buying College Textbooks at ValoreBooks</span>
            <span>When you want to buy college textbooks online, ValoreBooks offers you options to fit your budget: buy new books, used books, or rent. Click on an individual book listing, to see prices for available options, as well as information on book condition for used or rental copies.</span>
        </p>
        <p lang="en-us">
            <span className="p-head">Start Searching for Your Books Today</span>
            <span>When you're ready to buy college textbooks online, come to ValoreBooks. We're proud to be your top resource for finding affordable textbooks wherever you are, anytime, day or night. Search books by ISBN, browse top textbooks, search by school to find your own textbook directory, and more. It's never been easier to find great prices on the books you need. Start searching today!</span>
        </p>
    </div>
);