import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Container } from '@follett/common-ui';
import { FrequentlyAskedQuestion } from "../../../../main/react/components/sellback/frequentlyAskedQuestion";

jest.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: 'FontAwesomeIconMock'
}));

jest.mock('@fortawesome/free-solid-svg-icons', () => ({
    faChevronDown: 'faChevronDownMock'
}));

const baseTest = (expanded) => {
    const question = 'question';
    const answer = 'answer';
    const onClick = jest.fn((item) => {
        expect(item).toBe(question);
    });

    const component =
        <FrequentlyAskedQuestion question={question} answer={answer} expanded={!!expanded} onClick={onClick}/>
    const renderedComponent = TestRenderer.create(component);
    const root = renderedComponent.root;

    const container = root.findByType(Container);
    const containerContents = container.props.children;
    expect(containerContents.length).toEqual(2);

    const questionElement = containerContents[0];
    expect(questionElement.props.className).toEqual('faq-item-question');
    expect(questionElement.type).toEqual('div');
    questionElement.props.onClick();
    expect(onClick).toHaveBeenCalledTimes(1);
    const questionElementContents = questionElement.props.children;
    expect(questionElementContents.length).toEqual(2);
    const questionElementSpan = questionElementContents[0];
    expect(questionElementSpan.type).toEqual('span');
    expect(questionElementSpan.props.class).toEqual('faq-item-question-text');
    expect(questionElementSpan.props.children).toEqual(question);
    const chevron = questionElementContents[1];
    expect(chevron.type).toBe('FontAwesomeIconMock');
    expect(chevron.props.className).toEqual('faq-item-chevron');
    expect(chevron.props.icon).toEqual('faChevronDownMock');

    const answerElement = containerContents[1];

    if (expanded) {
        expect(answerElement.type).toBe('div');
        expect(answerElement.props.className).toEqual('faq-item-answer');
        expect(answerElement.props.children).toEqual(answer);
    } else expect(answerElement).toBe(null);
};

describe('render', () => {
    it('should display only the question and chevron when not expanded', () => {
        baseTest(false);
    });

    it('should display the question, chevron, and answer when expanded', () => {
        baseTest(true);
    });
});