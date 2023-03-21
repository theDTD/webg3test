import React, { Component } from 'react';
import { Container } from '@follett/common-ui';
import PropTypes from 'prop-types';
import { FrequentlyAskedQuestion } from "./frequentlyAskedQuestion";

export class FrequentlyAskedQuestions extends Component {
    constructor(props) {
        super(props);

        let knowledgeBase = {};

        Object.keys(props.knowledgeBase).forEach((key) => {
            const kbItem = props.knowledgeBase[key];
            knowledgeBase[kbItem['question']] = {answer: kbItem['answer'], expanded: false};
        });

        this.state = {
            knowledgeBase: knowledgeBase
        };

        this.expandOrRetractItem = this.expandOrRetractItem.bind(this);
    }

    expandOrRetractItem(question) {
        let knowledgeBase = this.state.knowledgeBase;
        let entry = knowledgeBase[question];

        if (entry) {
            entry['expanded'] = !entry['expanded'];
            knowledgeBase[question] = entry;
            this.setState({knowledgeBase: knowledgeBase});
        }
    }

    render() {
        let frequentlyAskedQuestions = [];
        let index = 0;

        Object.keys(this.state.knowledgeBase).forEach((key) => {
            index++;
            const question = key;
            const answer = this.state.knowledgeBase[key]['answer'];
            const expanded = this.state.knowledgeBase[key]['expanded'];

            const frequentlyAskedQuestion = <FrequentlyAskedQuestion key={'question' + index}
                                                                     question={question}
                                                                     answer={answer}
                                                                     expanded={expanded}
                                                                     onClick={this.expandOrRetractItem}/>;

            frequentlyAskedQuestions.push(frequentlyAskedQuestion);
        });

        return (
            <Container className='faq-section'>
                <h2 className='faq-header'>Frequently Asked Questions</h2>
                <div className='faq-questions'>
                    {frequentlyAskedQuestions}
                </div>
            </Container>
        );
    }
}

PropTypes.FrequentlyAskedQuestions = {
    knowledgeBase: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired
};