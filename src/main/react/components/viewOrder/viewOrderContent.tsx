import React, {Component} from 'react';
import { useState } from 'react';

interface ViewOrderContentProps {
    toggleDialog: (value: boolean) => void
}

const ViewOrderContent = ({ toggleDialog }: ViewOrderContentProps) => {

    const [orderNumber, setOrderNumber] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setError]  = useState({ orderNumberMessage: '', emailMessage:'', responseMessage: '' });

    const onChangeHandler = (fieldName:string, value: string)=>{
        if(fieldName === "orderNumber"){
            setOrderNumber(value);
        }
        else if(fieldName ==="email"){
            setEmail(value);
        }
    }

    const onSubmitHandler = (e: Event)=>{
        e.preventDefault();      
        if(orderNumber.trim() === "" || email.trim() === ""){
            setError({ orderNumberMessage: !orderNumber ? 'Please provide your order number.' : "", emailMessage: !email ? 'Please enter the email address or last name used for this order.' : "", responseMessage: ''});
        }
        else{
            let validateURL = '/vb/viewOrder/searchOrder';
            fetch(validateURL,
                {
                    method: 'POST',
                    body: JSON.stringify({id: orderNumber, orderInfo: email})
                })
                 .then(response => response.json())
                 .then(data => {
                     if( data.encryptedEmail && data.orderType ) {
                         let url = "/CustomerService.OrderTracking.InfoEntry_TrackOrder.do_rewrite";
                         window.location = `${url}?OrderNumber=${orderNumber}&OrderType=${data.orderType}&OrderInfo=${data.encryptedEmail}`;
                     } else {
                         setError({ orderNumberMessage: '', emailMessage:'', responseMessage: 'The order number or email address / last name you provided does not match our records. Please try again.'});
                     }
                 })
                 .catch(error => {
                     setError({ orderNumberMessage: '', emailMessage:'', responseMessage: 'The order number or email address / last name you provided does not match our records. Please try again.'});
                 });
        }
    }

    return (
        <div className="container my-2 view-order-content">
            <form onSubmit={(e)=>{onSubmitHandler(e)}}>
                <h1>View an order</h1>
                <p className="search-order-header">Search by order to:</p>
                <ul>
                    <li key="order-1">View the status of your order</li>
                    <li key="order-2">Return an item</li>
                    <li key="order-3">Contact a seller</li>
                    <li key="order-4">Extend or purchase your rental</li>
                </ul>

                <div className="form-group">
                    <label htmlFor="OrderNumber">Your order number
                        <a href="#ForgotLightbox" id="DontKnowToggle" onClick={() => toggleDialog(true)}>I don't know my order number</a>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="OrderNumber"
                        id="OrderNumber"
                        placeholder="Example: 1234567"
                        onChange={(e)=>{ onChangeHandler("orderNumber",e.target.value)}}
                        value={orderNumber}
                    />
                    <span className="errorMsg">{errors.orderNumberMessage}</span>
                </div>

                <div className="form-group">
                    <label htmlFor="EmailLastNameInput">Email address or last name used for order</label>
                    <input
                        type="text"
                        className="form-control"
                        name="OrderInfo"
                        id="EmailLastNameInput"
                        placeholder="Example: example@example.com"
                        onChange={(e)=>{ onChangeHandler("email",e.target.value)}}
                        value={email}
                    />
                    <span className="errorMsg">{errors.emailMessage}</span>
                </div>

                <div className="submitContainer">
                    <button
                        type="submit"
                        className="btn btn-primary rounded-0 px-5 mt-2 mb-3"
                        id="SubmitBtn">
                        View my order <i className="fas fa-chevron-right"></i>
                    </button>
                    <span className="errorMsg">{errors.responseMessage}</span>
                    <p className="answersText">
                        For answers to all your frequently asked questions, please visit our <a href="https://help.valorebooks.com/">customer service center</a>.
                    </p>
                </div>
            </form>
            <div className="sideInfo">{/*additional info can go here*/}</div>
        </div>
    )
}

export default ViewOrderContent;