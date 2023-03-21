import React from 'react';
import renderer from 'react-test-renderer';
import SellbackListItem from '../../../../main/react/components/sellback/sellbackListItem';

const renderBaseTest = (props) => {
    const component = <SellbackListItem
                        itemState={props.itemState}
                        image={props.image}
                        title={props.title}
                        isbn10={props.isbn10}
                        isbn13={props.isbn13}
                        price={props.price}/>;
    const renderedComponent = renderer.create(component);
    const root = renderedComponent.root;

    const sellbackListItem = root.findByType(SellbackListItem).type;
    expect(sellbackListItem).toEqual(SellbackListItem);

    const sellbackListItemProps = root.findByType(SellbackListItem).props;
    expect(sellbackListItemProps.itemState).toEqual(props.itemState);
    expect(sellbackListItemProps.image).toEqual(props.image);
    expect(sellbackListItemProps.title).toEqual(props.title);
    expect(sellbackListItemProps.isbn10).toEqual(props.isbn10);
    expect(sellbackListItemProps.isbn13).toEqual(props.isbn13);
    expect(sellbackListItemProps.price).toEqual(props.price);
};

describe('SellbackListItem', () => {
    it('should render properly', () => {
        renderBaseTest({
            itemState: "LOCKED",
            image: "test image",
            title: "test title",
            isbn10: "1111111111",
            isbn13: "2222222222222",
            price: 123
        });
    });
    it('should render without isbn10', () => {
        renderBaseTest({
            itemState: "LOCKED",
            image: "test image",
            title: "test title",
            isbn10: null,
            isbn13: "2222222222222",
            price: 123
        });
    });
    it('should render without isbn13', () => {
        renderBaseTest({
            itemState: "REMOVED_NOT_AVAILABLE",
            image: "test image",
            title: "test title",
            isbn10: "1111111111",
            isbn13: null,
            price: 123
        });
    });
});