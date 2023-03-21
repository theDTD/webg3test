import React from 'react';
import PropTypes from 'prop-types';

const Summary = (props) => {
    let hideDisclaimerTextAndButton = props.hideDisclaimerTextAndButton;
    let itemCount = props.itemCount;
    let itemTotal = props.itemTotal;
    let shippingLine = props.showShipping;
    let sellbackPriceLine = props.showPriceLabel;

    let disclaimer = !hideDisclaimerTextAndButton ? <div className="summary-disclaimer">
                                                         <p>Please note that we do not buy back books with broken covers, water damage, or excessive highlighting.</p>
                                                         <p>Do not sell back any books that you have rented. If you are unsure if you have a rental book, contact your bookstore for assistance before selling. Any rental or library books you sell will not be returned and you may incur additional fees from your institution.</p>
                                                         <p>The minimum sellback order is $15. You may only sell one copy of the same ISBN.</p>
                                                         <div className="summary-button-container">
                                                            <button className="summary-button" type="submit" onClick={()=>window.location.href="/vb/sellback/payment"+window.location.search}><span className="summary-button-text">Sell these books</span></button>
                                                         </div>
                                                     </div> : null
    let shipping = shippingLine ?  <p className="shipping-details">
                                        <span>Shipping</span>
                                        <span>Free</span>
                                    </p> : null

    let sellbackPrice = sellbackPriceLine ? <span className="sell-back-price">Sellback price</span> : null

    return (
        <div className="summary">
            <div className="summary-title">
                <span>Sellback summary</span>
            </div>
            <div>
                <p className="summary-item">
                    <div className="summary-item-left">
                        <span className="summary-item-left-text">Total ({itemCount} {itemCount > 1 ? "items" : "item"})</span>
                    </div>
                    <span className="summary-item-right">${itemTotal}</span>

                </p>
                {sellbackPrice}
                {shipping}
            </div>
            {disclaimer}
        </div>
    );
};

PropTypes.Summary = {
    hideDisclaimerTextAndButton: PropTypes.bool.isRequired,
    itemCount: PropTypes.number.isRequired,
    itemTotal: PropTypes.number.isRequired,
    showShipping: PropTypes.bool,
    showPriceLabel: PropTypes.bool
};

export default Summary;