import React, { Component } from 'react';

interface BodyProps {
    domain: string;
    questionList: {
        text: string;
        linkText: string;
        link: string;
    }[];
    stepList: {
        text: string;
        class: string;
    }[];
    questionListHeader: string;
    header: { color: string, text: string };
    header2: string;
    cardTitle: string;
    cardButtonText: string;
}

interface BodyState {
    orderNumber?: number;
    orderInfo?: string;
}

const defaultProps = {
    domain: "https://www.valorebooks.com"
}

export default class Body extends Component<BodyProps & typeof defaultProps, BodyState> {

    PURCHASE_AND_OR_RENTAL_TYPE: number;

    constructor(props: BodyProps) {
        super(props);
        this.state = {
            orderNumber: 0,
            orderInfo: ''
        }
        this.PURCHASE_AND_OR_RENTAL_TYPE = 1;
        this.setOrderInfo = this.setOrderInfo.bind(this);
        this.setOrderNumber = this.setOrderNumber.bind(this);
    }

    setOrderInfo(e: React.FormEvent<HTMLInputElement>): void {
        this.setState({orderInfo: e.currentTarget.value});
    }

    setOrderNumber(e: React.FormEvent<HTMLInputElement>): void {
        this.setState({orderNumber: parseInt(e.currentTarget.value)});
    }

    render() {
        const questions: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>[] = [];
        const steps: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>[] = [];
        this.props.questionList.forEach((li, index) => {
            questions.push(<li key={index}>{li.text} <a href={li.link}>{li.linkText}</a></li>);
        });
        this.props.stepList.forEach((step, index) => {
            steps.push(
                <div className={step.class} key={index}>
                    <div lang="en-us">{step.text}</div>
                </div>
            );
        });
        return (
            <div className="textbook-body">
                <div className="container text-center">
                    <h2 className={this.props.header.color}>{this.props.header.text}</h2>
                    <hr />
                    <div className="row">
                        <div className="col">
                            <div className="card text-start">
                                <div className="card-title">{this.props.cardTitle}</div>
                                <form id="trackOrderForm" action={this.props.domain + "/CustomerService.OrderTracking.InfoEntry_TrackOrder.do"} method="post" noValidate>
                                    <input type="hidden" name="OrderType" value={this.PURCHASE_AND_OR_RENTAL_TYPE} />
                                    <div className="d-flex align-items-start align-items-md-center justify-content-between flex-column flex-md-row">
                                        <label htmlFor="OrderNumber">What's your order number?</label>
                                        <input type="number" name="OrderNumber" aria-label="OrderNumber" title="OrderNumber" onChange={this.setOrderNumber} placeholder="This will be a seven digit number" />
                                    </div>
                                    <div className="d-flex align-items-start align-items-md-center justify-content-between flex-column flex-md-row">
                                        <label htmlFor="OrderInfo">What's your email or last name?</label>
                                        <input type="text" name="OrderInfo" aria-label="OrderInfo" onChange={this.setOrderInfo} title="OrderInfo" />
                                    </div>
                                </form>
                                <div className="d-flex justify-content-end align-items-center">
                                    <button type="submit" form="trackOrderForm" className="btn-trackorder">
                                        <span>{this.props.cardButtonText} </span><i className="fas fa-angle-right"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr className="hidden-desktop" />
                        <div className="col-md">
                            { this.props.header2 &&
                                <div className="text-start"><h3 className="color1 ms-4">{this.props.header2}</h3></div>
                            }
                            <div className={this.props.header2? "steps d-flex justify-content-center":"steps d-flex justify-content-center full-height"}>
                                {steps}
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md text-md-start">
                            { this.props.questionListHeader &&
                                <h3>{this.props.questionListHeader}</h3>
                            }
                            <ul className="unordered-list">
                                {questions}
                            </ul>
                        </div>
                        <hr className="hidden-desktop"/>
                        <div className="col-md">
                            <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start">
                                <img className="seal mt-3 mt-md-0"
                                     src="https://images.valorebooks.com/images/vb/web/sellback/10656_home/seal.png"
                                     alt="guarantee seal"/>
                                <div className="text-md-start mt-3 mt-md-0">
                                    <h3>The ValoreBooks Guarantee</h3>
                                    <div>
                                        With our dedicated customer support team, you can rest easy knowing that we're doing everything we can to save you time, money, and stress. <a href={this.props.domain + "/extra-mile-guarantee"}>Learn more.</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

