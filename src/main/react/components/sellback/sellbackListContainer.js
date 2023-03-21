import React from 'react';
import PropTypes from 'prop-types';
import SellbackListItem from './sellbackListItem';

const SellbackListContainer = (props) => {

    let elements = [];
    let elemIdx = 0;
    let dataElements = props.data;

    Object.keys(dataElements).forEach((key) => {
        const dataElement = dataElements[key];
        const element = <SellbackListItem
                                key={key}
                                itemState={dataElement['addedItem']['state']}
                                image={dataElement['productDetails']['image']}
                                title={dataElement['productDetails']['name']}
                                isbn10={dataElement['productDetails']['isbn10']}
                                isbn13={dataElement['productDetails']['productCode']}
                                price={dataElement['addedItem']['price']}
                                removeItem={props.removeItem.bind(elemIdx, dataElement)}/>
        elements.push(element);
        elemIdx++;
    });

    return (
      <div className="list-item-container">
        <div className="list-item-top-divider"></div>
        {elements}
      </div>
    );
};

PropTypes.SellbackListContainer = {
    data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired
};

export default SellbackListContainer;