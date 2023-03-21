import React from 'react';
import { Container } from '@follett/common-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export const SearchBar = (props) => (
    <Container className={`${props.containerClassName}`}>
        <div className="instant-quote-text">Get an instant quote for your textbooks</div>
        <div className="enter-isbn-text">Enter the ISBN of the book you want to sell below:</div>
        <form className="isbn-form">
            <input className="isbn-input" type="text" placeholder="Enter ISBNs, e.g. 9780134093413" value={props.searchedIsbn} onChange={(e) => props.isbnChangeFunc(e.target.value)}/>
            <button className="isbn-submit" type="submit" onClick={(e) => props.searchFunc(e)} disabled={props.disableButton}><FontAwesomeIcon className="isbn-submit-icon" icon={faArrowRight} /></button>
        </form>
        <div className="isbn-description">
            <div>When entering multiple ISBNs, please separate with commas.</div>
            <div className="tooltip-ex">
                <a className="tooltip-ex-link">What's an ISBN?</a>
                <span className="tooltip-ex-text">
                    <span>ISBN is the acronym for International Standard Book Number. This 10 or 13-digit number identifies a specific book, an edition of a book, or a book-like product (such as an audiobook). An ISBN can usually be found on the back cover, next to the barcode. If a book doesn't show the ISBN on the back cover, look on the page featuring the copyright and publisher information and the ISBN will be found there.</span>
                </span>
            </div>
        </div>
    </Container>
);

PropTypes.SearchBar = {
    containerClassName: PropTypes.string.isRequired,
    searchedIsbn: PropTypes.string,
    isbnChangeFunc: PropTypes.func.isRequired,
    searchFunc: PropTypes.func.isRequired,
    disableButton: PropTypes.bool.isRequired
};