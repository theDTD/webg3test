import React from 'react';
import TestRenderer, {ReactTestInstance, ReactTestRenderer} from 'react-test-renderer';
import MainSearchBar from "../../../../main/react/components/textbooks/mainSearchBar";
import ISBNToolTip from "../../../../main/react/components/textbooks/ISBNToolTip";
import Search from "../../../../main/react/components/textbooks/search";
import {configure, mount, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {cleanup} from "@testing-library/react";

configure({ adapter: new Adapter() });

describe('MainSearchBar',() => {
    afterEach(cleanup);

    it('should render correctly', () => {
        render({showError: false, backgroundImage: "bg.png", contentAlignment: "center", isbnLinkClassName: "", mainHeaderText: "", searchErrorClassName: "no-results-error", searchStyleClassName: "search", searchSubText: "sub text", searchValue: "search value", sideImage: "sideImg.png", subHeaderText: ""});
    });

    it('should render correctly -- other props', () => {
        render({showError: true, backgroundImage: "", contentAlignment: "left", isbnLinkClassName: "", mainHeaderText: "main header text", searchErrorClassName: "rb-no-results-error", searchStyleClassName: "search", searchSubText: "sub text", searchValue: "nothing", sideImage: "", subHeaderText: "sub header text"});
    });

    it('should mount object refs', ()=> {
        const wrapper = mount(<MainSearchBar showError={true} mainHeaderText={'main'} subHeaderText={'sub'} handleNoResults={jest.fn()} searchValue={'search'} searchErrorClassName={'no-results-error'} />);
        const mainRef = wrapper.find(".mainSearchBar").instance();
        const errorRef = wrapper.find(".errorP").instance();
        expect(wrapper.instance().mainRef).toHaveProperty('current', mainRef);
        expect(wrapper.instance().errorRef).toHaveProperty('current', errorRef);
    });

    it('componentDidUpdate componentWillUnmount', ()=> {
        const wrapper = mount(<MainSearchBar showError={true} mainHeaderText={'main'} subHeaderText={'sub'} handleNoResults={jest.fn()} searchValue={'search'} searchErrorClassName={'no-results-error'} />);
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: true,
                media: query
            })),
        });

        const componentDidUpdate = jest.spyOn(wrapper.instance(), "componentDidUpdate");
        expect(wrapper.state("searchValue")).toEqual("search");
        wrapper.setProps({"searchValue": "new search"});
        expect(wrapper.state("searchValue")).toEqual("new search");
        expect(componentDidUpdate).toHaveBeenCalled();

        const componentWillUnmount = jest.spyOn(wrapper.instance(), "componentWillUnmount");
        wrapper.unmount();
        expect(componentWillUnmount).toHaveBeenCalled();
    });

    it('updateHeight', ()=> {
        updateHeight(true);
        updateHeight(false);
    });

    it('toggleErrorMessage', ()=> {
        toggleErrorMessage(true);
        toggleErrorMessage(false);
    });
});


const render = (props: {
    showError: boolean;
    backgroundImage?: string;
    sideImage?: string;
    mainHeaderText: string;
    subHeaderText: string;
    contentAlignment?: 'center' | 'left' | 'right';
    searchStyleClassName?: string;
    isbnLinkClassName?: string;
    searchSubText?: string;
    searchValue: string;
    searchErrorClassName: 'rb-no-results-error' | 'no-results-error';
})=> {
    const component = shallow(<MainSearchBar
        showError={props.showError}
        backgroundImage={props.backgroundImage}
        sideImage={props.sideImage}
        mainHeaderText={props.mainHeaderText}
        subHeaderText={props.subHeaderText}
        contentAlignment={props.contentAlignment}
        searchStyleClassName={props.searchStyleClassName}
        isbnLinkClassName={props.isbnLinkClassName}
        searchSubText={props.searchSubText}
        searchValue={props.searchValue}
        searchErrorClassName={props.searchErrorClassName}
        handleNoResults={jest.fn()}
    />);

    const renderedComponent: ReactTestRenderer = TestRenderer.create(component);
    const searchBar: ReactTestInstance = renderedComponent.root;

    expect(searchBar.type).toEqual("div");
    expect(searchBar.props.className).toEqual("mainSearchBar container-fluid");

    if(props.backgroundImage)
        expect(searchBar.props.style.backgroundImage).toEqual("url("+props.backgroundImage+")");
    else
        expect(searchBar.props.style.backgroundImage).toEqual(undefined);

    const container: ReactTestInstance  = searchBar.props.children[0];
    expect(container.type).toEqual("div");
    expect(container.props.className).toEqual("container d-flex justify-content-center");

    const mainDiv: ReactTestInstance  = container.props.children;
    expect(mainDiv.type).toEqual("div");
    expect(mainDiv.props.className).toEqual("row pt-md-5 pt-sm-2 col-lg-12");

    const textContainer: ReactTestInstance  = mainDiv.props.children[0];
    expect(textContainer.type).toEqual("div");

    if (props.sideImage)
        expect(textContainer.props.className).toEqual("col-md-12 col-lg-6 d-flex flex-column main-text-align-"+props.contentAlignment);
    else
        expect(textContainer.props.className).toEqual("col-md-12 col-lg-12 mt-5 d-flex flex-column main-text-align-"+props.contentAlignment);

    const textInfo: ReactTestInstance  = textContainer.props.children[0];
    expect(textInfo.type).toBe("h1");
    expect(textInfo.props.className).toEqual("defaultHeading1");
    expect(textInfo.props.children).toBe(props.mainHeaderText);

    const subTextInfo: ReactTestInstance  = textContainer.props.children[1];
    expect(subTextInfo.type).toBe("span");
    expect(subTextInfo.props.className).toEqual("sub-heading mb-1");
    expect(subTextInfo.props.children).toBe(props.subHeaderText);

    const sideImageContainer: ReactTestInstance  = mainDiv.props.children[1];
    expect(textContainer.type).toEqual("div");

    if (props.sideImage) {
        expect(textContainer.props.className).toEqual("col-md-12 col-lg-6 d-flex flex-column main-text-align-"+props.contentAlignment);
        const imageInfo: ReactTestInstance  = sideImageContainer.props.children;
        expect(imageInfo.type).toBe("img");
        expect(imageInfo.props.className).toEqual("img-fluid mx-auto d-block");
        expect(imageInfo.props.src).toBe(props.sideImage);
    } else {
        expect(textContainer.props.className).toEqual("col-md-12 col-lg-12 mt-5 d-flex flex-column main-text-align-"+props.contentAlignment);
    }

    const searchContainer: ReactTestInstance  = searchBar.props.children[1];
    expect(searchContainer.type).toEqual("div");
    expect(searchContainer.props.className).toEqual("container d-flex search-"+props.contentAlignment);

    const searchDiv: ReactTestInstance  = searchContainer.props.children;
    expect(searchDiv.type).toEqual("div");
    expect(searchDiv.props.className).toEqual("search-row");

    const searchInputContainer: ReactTestInstance  = searchDiv.props.children[0];
    expect(searchInputContainer.type).toEqual("div");
    expect(searchInputContainer.props.className).toEqual("position-relative z-index-1 main-search-container d-flex flex-column justify-content-start "+(props.sideImage?"margin-top-search ":"")+"search ");

    const search: ReactTestInstance  = searchInputContainer.props.children[0];
    expect(search.type).toEqual(Search);
    expect(search.props.placeholder).toEqual("Enter ISBN, Title or Author");

    const isbn: ReactTestInstance  = searchInputContainer.props.children[1];
    expect(isbn.type).toBe(ISBNToolTip);

    const searchSubTextContainer: ReactTestInstance  = searchDiv.props.children[1];
    expect(searchSubTextContainer.type).toEqual("div");
    expect(searchSubTextContainer.props.className).toEqual("search-subtext");
    expect(searchSubTextContainer.props.children).toBe(props.searchSubText);

}

const updateHeight = (matchMedia: boolean) => {
    const wrapper = mount(<MainSearchBar showError={true} mainHeaderText={'main'} subHeaderText={'sub'} handleNoResults={jest.fn()} searchValue={'search'} searchErrorClassName={'no-results-error'} />);
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: matchMedia,
            media: query
        })),
    });
    const height = matchMedia? "0px":"44px";
    wrapper.instance().updateHeight();
    expect(wrapper.instance().mainRef.current.style.paddingBottom).toEqual(height);
    wrapper.unmount();
}

const toggleErrorMessage = (value: boolean)=> {
    const wrapper = mount(<MainSearchBar showError={true} mainHeaderText={'main'} subHeaderText={'sub'} handleNoResults={jest.fn()} searchValue={'search'} searchErrorClassName={'no-results-error'} />);

    wrapper.instance().toggleErrorMessage(value);
    const expected = !value? "initial": "hidden";
    expect(wrapper.instance().errorRef.current.style.visibility).toEqual(expected);
}