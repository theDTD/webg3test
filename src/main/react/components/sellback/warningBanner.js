import React from 'react';
import PropTypes from 'prop-types';

const WarningBanner = (props) => {

    let listItemCount = props.listItemCount;
    let textToDisplay = props.textBookTitle + " has been removed.";
    let emptyListText = "Your sellback list is empty! Search for more books to get started on a new list";

    let warningRender = <div className="warning-banner warning-banner-text">
                          {listItemCount > 0 ? textToDisplay : emptyListText}&nbsp;&nbsp;<span onClick={props.undoRemove}>Undo</span>
                        </div>
    return (
      <section>
        { warningRender }
      </section>
    );
};

PropTypes.WarningBanner = {
    textBookTitle: PropTypes.string.isRequired,
    listItemCount: PropTypes.number.isRequired,
    undoRemove: PropTypes.func.isRequired
};

export default WarningBanner;