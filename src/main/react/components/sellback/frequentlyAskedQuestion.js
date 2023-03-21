import React from "react";
import PropTypes from 'prop-types';
import { Container } from '@follett/common-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export const FrequentlyAskedQuestion = (props) => (
    <Container>
        <div className='faq-item-question' onClick={() => { props.onClick(props.question) }}>
            <span class="faq-item-question-text">{props.question}</span>
            <FontAwesomeIcon className='faq-item-chevron' icon={faChevronDown}/>
        </div>
        { props.expanded ? <div className='faq-item-answer'>{props.answer}</div> : null }
    </Container>
);

PropTypes.FrequentlyAskedQuestion = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    expanded: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};
