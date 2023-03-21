import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Container } from '@follett/common-ui';
import { SearchBar } from '../../../../main/react/components/sellback/searchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({ adapter: new Adapter() });

describe('render', () => {
    it('should render the component properly', () => {
        const component = <SearchBar containerClassName="walmart-search-bar-container"/>;
        const renderedComponent = TestRenderer.create(component);
        const root = renderedComponent.root;

        const searchBarContainer = root.findByType(Container);
        expect(searchBarContainer.props.className).toEqual('walmart-search-bar-container');
        const searchBarContainerContents = searchBarContainer.props.children;
        expect(searchBarContainerContents.length).toEqual(4);

        expect(searchBarContainerContents[0].props.className).toEqual("instant-quote-text");
        expect(searchBarContainerContents[0].props.children).toEqual("Get an instant quote for your textbooks");

        expect(searchBarContainerContents[1].props.className).toEqual("enter-isbn-text");
        expect(searchBarContainerContents[1].props.children).toEqual("Enter the ISBN of the book you want to sell below:");

        const isbnForm = searchBarContainerContents[2];
        expect(isbnForm.props.className).toEqual("isbn-form");
        const isbnFormContents = isbnForm.props.children;
        expect(isbnFormContents.length).toEqual(2);

        expect(isbnFormContents[0].type).toEqual('input');
        expect(isbnFormContents[0].props.className).toEqual('isbn-input');
        expect(isbnFormContents[0].props.type).toEqual('text');
        expect(isbnFormContents[0].props.placeholder).toEqual('Enter ISBNs, e.g. 9780134093413');

        expect(isbnFormContents[1].type).toEqual('button');
        expect(isbnFormContents[1].props.className).toEqual('isbn-submit');
        expect(isbnFormContents[1].props.type).toEqual('submit');
        const buttonText = isbnFormContents[1].props.children;

        expect(buttonText.type).toEqual(FontAwesomeIcon);
        expect(buttonText.props.className).toEqual('isbn-submit-icon');
        expect(buttonText.props.icon).toEqual(faArrowRight);

        const isbnDescription = searchBarContainerContents[3];
        expect(isbnDescription.props.className).toEqual("isbn-description");

        const isbnDescriptionContents = isbnDescription.props.children;
        expect(isbnDescriptionContents.length).toEqual(2);

        expect(isbnDescriptionContents[0].type).toEqual('div');
        expect(isbnDescriptionContents[0].props.children).toEqual('When entering multiple ISBNs, please separate with commas.');

        expect(isbnDescriptionContents[1].type).toEqual('div');
        expect(isbnDescriptionContents[1].props.className).toEqual("tooltip-ex");

        const tooltipContents = isbnDescriptionContents[1].props.children;
        expect(tooltipContents.length).toEqual(2);

        expect(tooltipContents[0].type).toEqual("a");
        expect(tooltipContents[0].props.className).toEqual("tooltip-ex-link");
        expect(tooltipContents[0].props.children).toEqual("What's an ISBN?");

        expect(tooltipContents[1].type).toEqual("span");
        expect(tooltipContents[1].props.className).toEqual("tooltip-ex-text");
        expect(tooltipContents[1].props.children.type).toEqual("span");
        expect(tooltipContents[1].props.children.props.children).toEqual("ISBN is the acronym for International Standard Book Number. This 10 or 13-digit number identifies a specific book, an edition of a book, or a book-like product (such as an audiobook). An ISBN can usually be found on the back cover, next to the barcode. If a book doesn't show the ISBN on the back cover, look on the page featuring the copyright and publisher information and the ISBN will be found there.");
    });
});

describe('input entry', () => {

    const isbnChangeFunc = jest.fn();
    const searchFunc = jest.fn();

    const props = {
        containerClassName: 'walmart-search-bar-container',
        searchedIsbn: '',
        isbnChangeFunc: isbnChangeFunc,
        searchFunc: searchFunc,
        disableButton: true
    };

    it('should call isbnChangeFunc and searchFunc', () => {
        const wrapper = shallow(<SearchBar {...props} />);
        wrapper.find('input').simulate('change', {target: {value: '9780134093413'}});
        wrapper.find('button').simulate('click');
        expect(isbnChangeFunc).toHaveBeenCalledWith('9780134093413');
        expect(searchFunc).toHaveBeenCalledTimes(1);
    });
    it('should disable button when disableButton is true', () => {
        const wrapper = shallow(<SearchBar {...props} />);
        expect(wrapper.find("button").prop("disabled")).toBe(true);
    });
    it('should not disable button when disableButton is false', () => {

        const props = {
             disableButton: false
         };

        const wrapper = shallow(<SearchBar {...props} />);
        expect(wrapper.find("button").prop("disabled")).toBe(false);
    });
});
