import React from 'react';
import renderer from 'react-test-renderer';
import SellbackListContainer from '../../../../main/react/components/sellback/sellbackListContainer';

describe('SellbackListContainer', () => {
    it('should render properly', () => {
       const data = [{ "addedItem": { "id": 1, "price": 123, "state": "LOCKED"}, "productDetails": { "image": "test image", "name": "test title", "isbn10": "1111111111", "productCode": "2222222222222" }}];
       const component = <SellbackListContainer data={data} removeItem={() => {}}/>;
       const renderedComponent = renderer.create(component);
       const root = renderedComponent.root;

       expect(root.props.data.length).toEqual(1);

       const mainDiv = root._fiber.child.stateNode;
       expect(mainDiv.type).toEqual("div");
       expect(mainDiv.props.className).toEqual("list-item-container");
       expect(mainDiv.props.children.length).toEqual(2);

       const mainDivChildren = mainDiv.props.children;
       expect(mainDivChildren[0].type).toEqual("div");
       expect(mainDivChildren[0].props.className).toEqual("list-item-top-divider");

       const sellbackListItem = mainDivChildren[1];
       expect(sellbackListItem.length).toEqual(1);
       expect(sellbackListItem[0].props.itemState).toEqual(data[0].addedItem.state);
       expect(sellbackListItem[0].props.image).toEqual(data[0].productDetails.image);
       expect(sellbackListItem[0].props.title).toEqual(data[0].productDetails.name);
       expect(sellbackListItem[0].props.isbn10).toEqual(data[0].productDetails.isbn10);
       expect(sellbackListItem[0].props.isbn13).toEqual(data[0].productDetails.productCode);
       expect(sellbackListItem[0].props.price).toEqual(data[0].addedItem.price);
    });
});