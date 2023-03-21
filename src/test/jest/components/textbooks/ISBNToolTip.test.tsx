import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import TestRenderer, {ReactTestInstance, ReactTestRenderer} from 'react-test-renderer';
import ISBNToolTip from "../../../../main/react/components/textbooks/ISBNToolTip";

configure({ adapter: new Adapter() });

describe('IsbnInfo', () => {
    it('should render IsbnInfo correctly', () => {
        const component: JSX.Element = <ISBNToolTip></ISBNToolTip>;

        const renderedComponent: ReactTestRenderer = TestRenderer.create(component);
        const root: ReactTestInstance = renderedComponent.root;

        const isbn: ReactTestInstance = root.findByType("span");
        expect(isbn.props.children[0]).toEqual("What\'s an ISBN?");

            const tooltip: ReactTestInstance = isbn.props.children[1];
            expect(tooltip.type).toBe("span");
            expect(tooltip.props.children[0].type).toBe(("h4"));
            expect(tooltip.props.children[0].props.children).toEqual(("ISBN"));
            expect(tooltip.props.children[1].type).toBe(("img"));
            expect(tooltip.props.children[1].props.src).toEqual(("https://images.valorebooks.com/images/vb/web/sellback/DVDPage/UPCImg.jpg"));
            expect(tooltip.props.children[2].type).toBe(("div"));
            expect(tooltip.props.children[2].props.children).toBe(("The ISBN is a 10 or 13 digit number that is unique to a particular title, author, edition, and publisher. It can be found on the back cover of each book."));
    });
})