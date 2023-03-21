import React from "react";
import TestRenderer, {ReactTestInstance, ReactTestRenderer} from "react-test-renderer";
import SearchSuggestions from "../../../../main/react/components/textbooks/searchSuggestions";

const renderBaseTest = ( itemData: {
    contributor: string,
    image_link: string,
    item_link: string,
    product_code: string,
    product_name: string,
    product_type: string
}) => {
    const index = 0;
    const highlightFn = jest.fn();

    const component: JSX.Element = <SearchSuggestions
        item={itemData}
        index={index}
        cursor={index}
        searchValue={"test"}
        highlight={highlightFn}
    />;

    const renderedComponent: ReactTestRenderer = TestRenderer.create(component);
    const root: ReactTestInstance = renderedComponent.root;

    const listContainer: ReactTestInstance = root.findByType("li");
    expect(listContainer.props.className).toEqual("active");

    const link: ReactTestInstance = listContainer.children[0];
    expect(link.type).toEqual("a");
    expect(link.props.href).toEqual(itemData.item_link);

    const imgDiv: ReactTestInstance = link.children[0];
    expect(imgDiv.type).toEqual("div");
    expect(imgDiv.props.className).toEqual("img-container");

    const img: ReactTestInstance = imgDiv.children[0];
    expect(img.type).toEqual("img");
    expect(img.props.src).toEqual(itemData.image_link);
    expect(img.props.alt).toEqual(itemData.product_name);

    const detailsDiv: ReactTestInstance = link.children[1];
    expect(detailsDiv.type).toEqual("div");
    expect(detailsDiv.props.className).toEqual("book-details");

    const titleDiv: ReactTestInstance = detailsDiv.children[0];
    expect(titleDiv.type).toEqual("div");
    expect(titleDiv.props.className).toEqual("title");
    expect(highlightFn).toHaveBeenCalledWith("test", itemData.product_name);
    expect(highlightFn).toHaveBeenCalledTimes(1);

    const author: ReactTestInstance = detailsDiv.children[1];
    expect(author.type).toEqual("p");
    expect(author.props.className).toEqual("author");
    expect(author.props.children).toEqual(itemData.contributor);

    const isbn: ReactTestInstance = detailsDiv.children[2];
    expect(isbn.type).toEqual("p");
    expect(isbn.props.children).toEqual(
        itemData.product_type === "book" ?
            ["ISBN: ", itemData.product_code]
            :
            ["UPC: ", itemData.product_code]
    );
};

describe('SearchSuggestions should render properly', function () {
    it("SearchSuggestions should render ISBN as product code", () => {
        const data = {
            contributor: "test",
            image_link: "test.png",
            item_link: "www.test.com",
            product_code: "1234567890123",
            product_name: "Test",
            product_type: "book"
        };
        renderBaseTest(data);
    });
    it("SearchSuggestions should render UPC as product code",
        () => {
            const data = {
                contributor: "test",
                image_link: "test.png",
                item_link: "www.test.com",
                product_code: "1234567890123",
                product_name: "Test",
                product_type: "something else"
            };
            renderBaseTest(data);
        });

});