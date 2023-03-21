import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TestRenderer from 'react-test-renderer';
import { FrequentlyAskedQuestions } from "../../../../main/react/components/sellback/frequentlyAskedQuestions";
import { Container } from "@follett/common-ui";

configure({ adapter: new Adapter() });

const simpleKnowledgeBaseProp = [{id: 1, question: 'question', answer: 'answer'}];
const complexKnowledgeBaseProp = [{id: 1, question: 'question1', answer: 'answer1'},
                                  {id: 2, question: 'question2', answer: 'answer2'}];

jest.mock('../../../../main/react/components/sellback/frequentlyAskedQuestion', () => ({
    FrequentlyAskedQuestion: 'FrequentlyAskedQuestionMock'
}));

const expandOrRetractItemBaseTest = (callback) => {
    const wrapper = shallow(<FrequentlyAskedQuestions knowledgeBase={simpleKnowledgeBaseProp}/>);
    const componentInstance = wrapper.instance();

    expect(wrapper.state.length).toBe(1);
    const knowledgeBaseState = wrapper.state('knowledgeBase');
    expect(Object.keys(knowledgeBaseState).length).toBe(1);
    const knowledgeBaseEntry = knowledgeBaseState['question'];
    expect(Object.keys(knowledgeBaseEntry).length).toBe(2);
    expect(knowledgeBaseEntry['answer']).toBe(simpleKnowledgeBaseProp[0]['answer']);
    expect(knowledgeBaseEntry['expanded']).toBe(false);
    callback(componentInstance, knowledgeBaseEntry);
}

describe('expandOrRetractItem', () => {
    it('should expand when retracted and retract when expanded', () => {
        expandOrRetractItemBaseTest((componentInstance, knowledgeBaseEntry) => {
            componentInstance.expandOrRetractItem('question');
            expect(knowledgeBaseEntry['expanded']).toBe(true);

            componentInstance.expandOrRetractItem('question');
            expect(knowledgeBaseEntry['expanded']).toBe(false);
        });
    });

    it('should do nothing when the question does not exist', () => {
        expandOrRetractItemBaseTest((componentInstance, knowledgeBaseEntry) => {
            componentInstance.expandOrRetractItem('question2');
            expect(knowledgeBaseEntry['expanded']).toBe(false);

            componentInstance.expandOrRetractItem('question2');
            expect(knowledgeBaseEntry['expanded']).toBe(false);
        });
    });
});

describe('render', () => {
    it('should display the component as expected', () => {
        const component = <FrequentlyAskedQuestions knowledgeBase={complexKnowledgeBaseProp}/>;
        const renderedComponent = TestRenderer.create(component);
        const root = renderedComponent.root;

        const container = root.findByType(Container);
        expect(container.props.className).toBe('faq-section');
        const containerContents = container.props.children;
        expect(containerContents.length).toEqual(2);

        const h2 = containerContents[0];
        expect(h2.type).toEqual('h2');
        expect(h2.props.className).toBe('faq-header');
        expect(h2.props.children).toBe("Frequently Asked Questions");

        const div = containerContents[1];
        expect(div.type).toEqual('div');
        expect(div.props.className).toBe('faq-questions');
        const divContents = div.props.children;
        expect(divContents.length).toEqual(2);

        const first = divContents[0];
        expect(first.type).toEqual('FrequentlyAskedQuestionMock');
        expect(first.key).toBe('question1');
        expect(first.props.question).toBe('question1');
        expect(first.props.answer).toBe('answer1');
        expect(first.props.expanded).toBe(false);
        expect(first.props.onClick).toBe(root.instance.expandOrRetractItem);

        const last = divContents[1];
        expect(last.type).toEqual('FrequentlyAskedQuestionMock');
        expect(last.key).toBe('question2');
        expect(last.props.question).toBe('question2');
        expect(last.props.answer).toBe('answer2');
        expect(last.props.expanded).toBe(false);
        expect(last.props.onClick).toBe(root.instance.expandOrRetractItem);
    });
});