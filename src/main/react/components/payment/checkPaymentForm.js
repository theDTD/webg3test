import React from 'react';
import {Container} from "@follett/common-ui";
import Footer from "../sellback/footer";
import Header from "../sellback/header";
import Summary from "../sellback/summary";
import ListItemCountBanner from "../sellback/listItemCountBanner";
import SellbackListContainer from "../sellback/sellbackListContainer";
import RadioGroup from "./radioGroup";

const CheckPaymentForm = (props) => {
    let itemList = props.itemList;
    let itemCount = props.itemList.length;
    let itemTotal = props.itemTotal;
    let images = props.images;
    let errorText = props.errorText;

    return (
        <Container className="check-payment-container">
            <Header maxWidth="false" className="d-flex justify-content-between"
                    brandLogo={images['headerLogo']}
                    isDisplayed="true"/>

            <div className="d-flex justify-content-between check-payment-landing">
                <div className="check-payment-form">
                    <h2>Payment delivery</h2>
                    <hr className="heading-divider"/>
                    <h3>Choose how to get paid:</h3>
                    <div className="payment-options d-flex">
                        <RadioGroup
                            name="payment-group"
                            options={[
                                { value: "paypal", label: "PayPal", defaultChecked: true },
                                { value: "check", label: "Check" }
                            ]}/>

                    </div>

                    <p>Once payment has been issued, you can expect to receive your check within 7-14 business days via USPS first class mail.</p>

                    <small>*required field</small>

                    <h3>Payment address</h3>
                    <hr className="heading-divider"/>
                    <form>
                        <div className="form-row justify-content-between">
                            <div className="form-group">
                                <label htmlFor="firstName">First name*</label>
                                <input type="text" id="firstName" className="form-control" placeholder="Jon"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last name*</label>
                                <input type="text" id="lastName" className="form-control" placeholder="Smith"/>
                            </div>
                        </div>
                        <div className="form-row justify-content-between">
                            <div className="form-group">
                                <label htmlFor="streetAddress1">Street Address 1*</label>
                                <input type="text" id="streetAddress1" className="form-control"
                                       placeholder="1234 Main St."/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="streetAddress2">Apt, suite, etc. (Optional)</label>
                                <input type="text" id="streetAddress2" className="form-control" placeholder="304"/>
                            </div>
                        </div>
                        <div className="form-row justify-content-between">
                            <div className="form-group">
                                <label htmlFor="city">City*</label>
                                <input type="text" id="city" className="form-control" placeholder="Little Rock"/>
                            </div>
                            <div className="form-group d-flex justify-content-between">
                                <div className="form-group-sm">
                                    <label htmlFor="state">State*</label>
                                    <input type="text" id="state" className="form-control" placeholder="Arkansas"/>
                                </div>
                                <div className="form-group-sm">
                                    <label htmlFor="zip">ZIP code*</label>
                                    <input type="text" id="zip" className="form-control"
                                           placeholder="12345"/>
                                </div>
                            </div>
                        </div>
                        <div className="form-row justify-content-between">
                            <div className="form-group">
                                <label htmlFor="email">Email address* (for order notification)</label>
                                <input type="text" id="email" className="form-control"
                                       placeholder="jxsmith@school.edu"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="mobile">Mobile phone (for delivery questions)*</label>
                                <input type="text" id="mobile" className="form-control" placeholder="555-555-5555"/>
                            </div>
                        </div>
                    </form>

                    <div className="check-payment-form-footer">
                        <div className="form-check">
                            <label className="custom-checkbox">
                                <input type="checkbox"/>
                                <span>Send me special offers from Walmart.</span>
                            </label>
                        </div>
                        <div className="form-check">
                            <label className="custom-checkbox">
                                <input type="checkbox"/>
                                <span>I confirm that the textbooks that I am selling are
                                        authentic, authorized, and lawfully acquired.
                                    <br/>
                                    <small>
                                        Walmart has partnered with ValoreBooks to provide this online buyback service.
                                        Please <strong>do not</strong> sell back any books that you have rented. If you are unsure if you
                                        have a rental book,
                                        contact your bookstore for assistance before selling. Any rental or library books
                                        you sell will <strong>not</strong> be
                                        returned and you may incur additional fees from your institution.
                                    </small>
                                </span>
                            </label>
                        </div>
                        <div className="text-right">
                            <button type="submit" className="btn btn-primary btn-sellback">Complete sellback</button>
                        </div>
                    </div>
                </div>

                <div className="check-payment-cart">
                    {errorText &&
                    <div className="alert alert-danger" role="alert">
                        {errorText}
                    </div>}
                    <ListItemCountBanner listItemCount={itemCount}/>
                    <Summary hideDisclaimerTextAndButton={true} itemCount={itemCount} itemTotal={itemTotal}
                             showShipping={true} showPriceLabel={true}/>
                    <SellbackListContainer data={itemList} removeItem={props.removeItem}/>
                </div>
            </div>

            <div className="check-payment-form-footer-sm">
                <div className="form-check">
                    <label className="custom-checkbox">
                        <input type="checkbox"/>
                        <span>Send me special offers from Walmart.</span>
                    </label>
                </div>
                <div className="form-check">
                    <label className="custom-checkbox">
                        <input type="checkbox"/>
                        <span>I confirm that the textbooks that I am selling are
                                authentic, authorized, and lawfully acquired.
                            <br/>
                            <small>Walmart has partnered with ValoreBooks to provide this online buyback service.
                                Please <strong>do not</strong> sell back any books that you have rented. If you are unsure if you
                                have a rental book,
                                contact your bookstore for assistance before selling. Any rental or library books
                                you sell will <strong>not</strong> be
                                returned and you may incur additional fees from your institution.
                            </small>
                        </span>
                    </label>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-sellback">Complete sellback</button>
                </div>
            </div>


            <Footer className="d-flex justify-content-between mt-5"
                    footerBannerText="© 2021 Walmart Stores, Inc. in partnership with © ValoreBooks"
                    footerBannerContactText="Contact Support"
                    footerBannerContactDetail="support@valorebooks.com"/>


        </Container>
    );
}

export default CheckPaymentForm;