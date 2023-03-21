import React from 'react';

const ExtraMileBody = () => {

    return(
        <div key="extraMileBodyInfo" className="container mb-5 px-0">
            <div className="guarantee-image-container">
                <img src="https://images.valorebooks.com/images/vb/web/guarantee/Valore_guarantee.jpg" alt="Extra mile guarantee" className="img-fluid mx-auto"/>
            </div>

            <div className="guarantee-text px-2 mt-4 mb-5 mx-auto">
                <h1 className="px-1">At ValoreBooks, we promise the following:</h1>
                <p className="mt-5">
                    <span>To refund your money if there's any problem.</span> If your order arrives in poor condition or you received a different item, you can return it within 30 days for a full refund.  <a href="https://help.valorebooks.com/article/324-return-policies" target="_blank"> Learn more</a></p>
                <p>
                    <span>To offer textbook rentals at unbeatable prices.</span> If you rent a book from us and find a lower price within 7 days, we'll refund the difference. Simply <a href="https://help.valorebooks.com/" target="_blank" >contact us</a> with the details.
                </p>


                <p><span>To pay you the most money for your used books.</span> Whenever you have used textbooks to sell, you can rest easy knowing we always pay more through our Sellback program. <a href="https://help.valorebooks.com/article/260-about-sellback" target="_blank" >Learn more</a>
                </p>

                <p><span>To provide dedicated customer service.</span> Our team of professional problem solvers is trained to fix things quickly. That way you can shop and rent with confidence. <a href="https://help.valorebooks.com/" target="_blank">Contact the ValoreBooks customer service team.</a>
                </p>
            </div>
            <br/>
        </div>
    )
};

export default ExtraMileBody;