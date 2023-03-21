import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Search } from '../../../../main/react/components/sellback/search';
import { Container } from '@follett/common-ui';
import { SearchBar } from '../../../../main/react/components/sellback/searchBar';

const renderBaseTest = (imagePlacement) => {
    const component = <Search containerClassName="walmart-search-container" imagePlacement={imagePlacement} image="image"/>;
    const renderedComponent = TestRenderer.create(component);
    const root = renderedComponent.root;

    const searchContainer = root.findByType(Container);
    expect(searchContainer.props.className).toEqual("walmart-search-container");
    const searchContainerContents = searchContainer.props.children;
    expect(searchContainerContents.length).toEqual(3);

    const imageContainer = searchContainerContents[(imagePlacement === 'left' || imagePlacement === 'top' ? 0 : 2)];
    expect(imageContainer.type).toEqual('div');

    const image = imageContainer.props.children;
    expect(image.type).toEqual('img');
    expect(image.props.src).toEqual('image');

    expect(searchContainerContents[1].type).toEqual(SearchBar);
    expect(searchContainerContents[1].props.containerClassName).toEqual('search-bar-container');
    expect(searchContainerContents[(imagePlacement === 'left' || imagePlacement === 'top' ? 2 : 0)]).toEqual(false);
};

describe('render', () => {
    it('should render the component properly with image on left', () => {
        renderBaseTest('left');
    });

    it('should render the component properly with image on right', () => {
        renderBaseTest('right');
    });

    it('should render the component properly with image on top', () => {
        renderBaseTest('top');
    });

    it('should render the component properly with image on bottom', () => {
        renderBaseTest('bottom');
    });
});