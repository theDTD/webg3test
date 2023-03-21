import React from 'react';
import PropTypes from 'prop-types';

const ListItemCountBanner = (props) => {
    let listItemCount = props.listItemCount;
    let listItemCountRender = listItemCount > 0 ?  <div className="list-item-count-banner">
                                                      <span className="list-item-count-banner-text">Your sellback list: {listItemCount}</span><span className="list-item-count-banner-text2">&nbsp;item(s)</span>
                                                   </div> : null
    return (
      <section>
        {listItemCountRender}
      </section>
    );
};

PropTypes.ListItemCountBanner = {
    listItemCount: PropTypes.number.isRequired
};

export default ListItemCountBanner;