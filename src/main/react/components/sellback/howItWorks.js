import React from 'react';
import PropTypes from 'prop-types';
import HowItWorksBox from './howItWorksBox';
import * as faIcons from '@fortawesome/free-solid-svg-icons';

const HowItWorks = (props) => {

    let elements = [];
    let dataElements = props.data;

    Object.keys(dataElements).forEach((key) => {
        const dataElement = dataElements[key];
        let style = `how-it-works-box how-it-works-box-${++key}`;

        const element = <HowItWorksBox
                                key={key}
                                icon={faIcons[(dataElement['icon'])]}
                                header={dataElement['header']}
                                body={dataElement['body']}
                                style={style}/>

        elements.push(element);
    });

     return (
        <section className="how-it-works-section">
            <div>
                <h2 className="how-it-works-title">How it works</h2>
            </div>
            <p>
                <div className="how-it-works-rows">
                    {elements}
                </div>
            </p>
        </section>
    );
};

PropTypes.HowItWorks = {
    props: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired
};
export default HowItWorks;