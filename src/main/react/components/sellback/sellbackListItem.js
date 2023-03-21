import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@follett/common-ui';

const SellbackListItem = (props) => {

    let itemIsNotRNA = (props.itemState != "REMOVED_NOT_AVAILABLE");
    let price = props.price.toLocaleString("en",{useGrouping: false, minimumFractionDigits: 2});
    let listItemClassName = itemIsNotRNA ? "list-item" : "list-item-rna";
    const is979 = props.isbn13 && props.isbn13.substr(0,3) === '979'

    return (
        <Container className={`${listItemClassName}`}>
            <div className="list-item-image-div">
              <img className="list-item-image" src={props.image} alt="Book cover"/>
            </div>
            <div className="list-item-details">
                <div className="list-item-details-text">
                  <div className="list-item-textbook-title">{props.title}</div>
                    { !is979? <div>ISBN-10: {props.isbn10}</div> : null }
                  <div>ISBN-13: {props.isbn13}</div>
                  {
                      !itemIsNotRNA ?
                      <div className="list-item-rna-message">
                          <p>Sorry, but this item is no longer available.</p>
                      </div> : null
                  }
                </div>
                 <div className="list-item-price">
                     <div>
                          <div className="list-item-price-text">{ itemIsNotRNA ? `$${price}` : `N/A` }</div>
                          <div className="list-item-sellback-price-text">Sellback price</div>
                     </div>
                     <div className="list-item-remove" onClick={props.removeItem}>Remove</div>
                 </div>
             </div>
        </Container>
    );
};

PropTypes.SellbackListItem = {
    itemState: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isbn10: PropTypes.string.isRequired,
    isbn13: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    removeItem: PropTypes.func.isRequired
};

export default SellbackListItem;