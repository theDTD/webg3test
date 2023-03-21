import React from 'react';
import Sellback from '../../../main/react/containers/sellback';
import TestRenderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Container } from '@follett/common-ui';
import HeaderBanner from '../../../main/react/components/sellback/headerBanner';
import Header from '../../../main/react/components/sellback/header';
import { Search } from '../../../main/react/components/sellback/search';
import HowItWorks from '../../../main/react/components/sellback/howItWorks';
import { FrequentlyAskedQuestions } from '../../../main/react/components/sellback/frequentlyAskedQuestions';
import Footer from '../../../main/react/components/sellback/footer';

configure({ adapter: new Adapter() });

describe('render', () => {
    it('should render the component properly', () => {
        const component = <Sellback />;
        const renderedComponent = TestRenderer.create(component);
        const root = renderedComponent.root;

        const mainContainer = root.findByType(Container);
        const mainContainerContents = mainContainer.props.children;
        expect(mainContainerContents.length).toEqual(3);

        const headerBanner = mainContainerContents[1];
        expect(headerBanner.type).toEqual(HeaderBanner);
        expect(headerBanner.props.banner).toEqual('headerBannerText');
        expect(headerBanner.props.url).toEqual('headerBannerUrl');

        const sellbackLandingContainer = mainContainerContents[2];
        expect(sellbackLandingContainer.type).toEqual(Container);
        expect(sellbackLandingContainer.props.className).toEqual('sellback-landing-container');

        const sellbackLandingContainerContents = sellbackLandingContainer.props.children;
        expect(sellbackLandingContainerContents.length).toEqual(11);

        const header = sellbackLandingContainerContents[0];
        expect(header.type).toEqual(Header);
        expect(header.props.brandLogo).toEqual('headerLogo');
        expect(header.props.isDisplayed).toEqual('true');

        const search1 = sellbackLandingContainerContents[1];
        expect(search1.type).toEqual(Search);
        expect(search1.props.containerClassName).toEqual('search-container hide-desktop');
        expect(search1.props.image).toEqual('upperSearch');
        expect(search1.props.imagePlacement).toEqual('right');
        expect(search1.props.searchedIsbn).toEqual('');

        const search2 = sellbackLandingContainerContents[2];
        expect(search2.type).toEqual(Search);
        expect(search2.props.containerClassName).toEqual('search-container hide-mobile');
        expect(search2.props.image).toEqual('upperSearch');
        expect(search2.props.imagePlacement).toEqual('top');
        expect(search2.props.searchedIsbn).toEqual('');

        const warningBanner = sellbackLandingContainerContents[3];
        expect(warningBanner).toEqual(false);

        const errorText = sellbackLandingContainerContents[4];
        expect(errorText).toEqual('');

        const itemList = sellbackLandingContainerContents[5];
        expect(itemList).toEqual(null);

        const howItWorks = sellbackLandingContainerContents[6];
        expect(howItWorks.type).toEqual(HowItWorks);
        expect(howItWorks.props.data).toEqual("howItWorksData");

        const faq = sellbackLandingContainerContents[7];
        expect(faq.type).toEqual(FrequentlyAskedQuestions);
        expect(faq.props.knowledgeBase).toEqual('knowledgeBase');

        const search3 = sellbackLandingContainerContents[8];
        expect(search3.type).toEqual(Search);
        expect(search3.props.containerClassName).toEqual('search-container hide-desktop');
        expect(search3.props.image).toEqual('lowerSearch');
        expect(search3.props.imagePlacement).toEqual('left');
        expect(search3.props.searchedIsbn).toEqual('');

        const search4 = sellbackLandingContainerContents[9];
        expect(search4.type).toEqual(Search);
        expect(search4.props.containerClassName).toEqual('search-container hide-mobile');
        expect(search4.props.image).toEqual('lowerSearch');
        expect(search4.props.imagePlacement).toEqual('top');
        expect(search4.props.searchedIsbn).toEqual('');

        const footer = sellbackLandingContainerContents[10];
        expect(footer.type).toEqual(Footer);
        expect(footer.props.footerBannerText).toEqual('footerBannerText');
        expect(footer.props.footerBannerContactText).toEqual('footerBannerContactText');
        expect(footer.props.footerBannerContactDetail).toEqual('footerBannerContactDetail');
    });
});

describe('isbnChange', () => {
    it('should set searchedIsbn in the state', () => {
        const wrapper = shallow(<Sellback />);
        const componentInstance = wrapper.instance();
        componentInstance.isbnChange('9780470616307');
        expect(wrapper.state('searchedIsbn')).toBe('9780470616307');
    });
});

describe('addItem', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    const flushAllPromises = () => new Promise((resolve) => setImmediate(resolve));

    it('should add an item to the itemList in the state', async () => {
        const wrapper = shallow(<Sellback />);
        const componentInstance = wrapper.instance();
        componentInstance.setState({searchedIsbn: 'searchedIsbn', displaySpinner: true});
        const scrollTo = jest.fn();
        componentInstance.scrollToSellbackListContainer = scrollTo;

        fetch.mockResponseOnce(JSON.stringify({addedItem: {id: 1234, price: 10}}), {status: 200});

        componentInstance.addItem({
            preventDefault: function() { return null; }
        });

        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual("/vb/sellback/addItem?isbn=searchedIsbn");

        await flushAllPromises();

        expect(scrollTo).toHaveBeenCalledWith();

        expect(wrapper.state('searchedIsbn')).toEqual('');
        expect(wrapper.state('itemList').length).toEqual(1);
        expect(wrapper.state('itemList')[0].addedItem.id).toEqual(1234);
        expect(wrapper.state('hasRemovedItem')).toEqual(false);
        expect(wrapper.state('removedItem')).toEqual(null);
        expect(wrapper.state('removedItemIndex')).toEqual(null);
        expect(wrapper.state('itemTotal')).toEqual("10.00");
        expect(wrapper.state('errorText')).toEqual('');
        expect(wrapper.state('displaySpinner')).toEqual(false);
    });

    it('should not add an item to the itemList in the state when isbn is blank', async () => {
        const wrapper = shallow(<Sellback />);
        const componentInstance = wrapper.instance();
        componentInstance.setState({searchedIsbn: '', displaySpinner: false});

        componentInstance.addItem({
            preventDefault: function() { return null; }
        });

        expect(fetch.mock.calls.length).toEqual(0);
        expect(wrapper.state('displaySpinner')).toEqual(false);
    });

    it('should not add an item to the itemList in the state when a bad status is returned', async () => {
        const wrapper = shallow(<Sellback />);
        const componentInstance = wrapper.instance();
        componentInstance.setState({searchedIsbn: 'searchedIsbn', displaySpinner: true});

        fetch.mockResponseOnce(JSON.stringify({bad: "request"}), {status: 400});

        componentInstance.addItem({
            preventDefault: function() { return null; }
        });

        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual("/vb/sellback/addItem?isbn=searchedIsbn");

        await flushAllPromises();

        expect(wrapper.state('errorText')).toEqual('An error occurred. Please try again later.');
        expect(wrapper.state('displaySpinner')).toEqual(false);
    });

    it('should not add an item to the itemList in the state when a bad status is returned', async () => {
        const wrapper = shallow(<Sellback />);
        const componentInstance = wrapper.instance();
        componentInstance.setState({searchedIsbn: 'searchedIsbn', displaySpinner: true});

        fetch.mockResponseOnce("An invalid ISBN was provided.", {status: 400});

        componentInstance.addItem({
            preventDefault: function() { return null; }
        });

        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual("/vb/sellback/addItem?isbn=searchedIsbn");

        await flushAllPromises();

        expect(wrapper.state('errorText')).toEqual('The provided ISBN is invalid.');
        expect(wrapper.state('displaySpinner')).toEqual(false);
    });


    it('should display the error in the state when an exception occurs', async () => {
        const wrapper = shallow(<Sellback />);
        const componentInstance = wrapper.instance();
        componentInstance.setState({searchedIsbn: 'searchedIsbn', displaySpinner: true});

        fetch.mockRejectOnce('Rejected');

        componentInstance.addItem({
            preventDefault: function() { return null; }
        });

        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual("/vb/sellback/addItem?isbn=searchedIsbn");

        await flushAllPromises();

        expect(wrapper.state('errorText')).toEqual('An error occurred. Please try again later.');
        expect(wrapper.state('displaySpinner')).toEqual(false);
    });

    it('should not add an item to the itemList in the state when a bad status is returned and no active bid', async () => {
        const wrapper = shallow(<Sellback />);
        const componentInstance = wrapper.instance();
        componentInstance.setState({searchedIsbn: 'searchedIsbn', displaySpinner: true});

        fetch.mockResponseOnce("Obtained a quote of $0 for the given ISBN", {status: 400});

        componentInstance.addItem({
            preventDefault: function() { return null; }
        });

        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual("/vb/sellback/addItem?isbn=searchedIsbn");

        await flushAllPromises();

        expect(wrapper.state('errorText')).toEqual('The provided ISBN has no active bids. Please try again later or provide a new ISBN.');
        expect(wrapper.state('displaySpinner')).toEqual(false);
    });
});

describe('undoRemove', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    const flushAllPromises = () => new Promise((resolve) => setImmediate(resolve));

    it('should add an item back into the list successfully', async () => {
        const wrapper = shallow(<Sellback />);
        const componentInstance = wrapper.instance();
        componentInstance.setState({
            itemList: [],
            removedItem: {
                productDetails: {productCode: '9780000000019'},
                addedItem: {id: 1, buybackPrice: 10, price: 10}
            },
            removedItemIndex: 0,
            hasRemovedItem: true,
            displaySpinner: true
        });
        
        fetch.mockResponseOnce(JSON.stringify({
            productDetails: {productCode: '9780000000019'},
            addedItem: {id: 2, buybackPrice: 10, price: 10}
        }), {status: 200});

        componentInstance.undoRemove();

        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual('/vb/sellback/addItem?isbn=9780000000019&buybackPrice=10');

        await flushAllPromises();

        expect(wrapper.state('itemList').length).toEqual(1);
        expect(wrapper.state('itemList')[0].addedItem.id).toEqual(2);
        expect(wrapper.state('hasRemovedItem')).toEqual(false);
        expect(wrapper.state('removedItem')).toEqual(null);
        expect(wrapper.state('removedItemIndex')).toEqual(null);
        expect(wrapper.state('itemTotal')).toEqual('10.00');
        expect(wrapper.state('errorText')).toEqual('');
        expect(wrapper.state('displaySpinner')).toEqual(false);
    });

    it('should not add an item back into the list when response status is not 200', async () => {
        const wrapper = shallow(<Sellback />);
        const componentInstance = wrapper.instance();
        componentInstance.setState({
            itemList: [],
            removedItem: {
                productDetails: {productCode: '9780000000019'},
                addedItem: {id: 1, buybackPrice: 10, price: 10}
            },
            removedItemIndex: 0,
            hasRemovedItem: true,
            displaySpinner: true
        });

        fetch.mockResponseOnce(JSON.stringify({
            productDetails: {productCode: '9780000000019'},
            addedItem: {id: 2, buybackPrice: 10, price: 10}
        }), {status: 400});

        componentInstance.undoRemove();

        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual('/vb/sellback/addItem?isbn=9780000000019&buybackPrice=10');

        await flushAllPromises();

        expect(wrapper.state('itemList').length).toEqual(0);
        expect(wrapper.state('errorText')).toEqual('An error occurred. Please try again later.');
        expect(wrapper.state('displaySpinner')).toEqual(false);
    });

    it('should not add an item back into the list when response status is not 200', async () => {
        const wrapper = shallow(<Sellback />);
        const componentInstance = wrapper.instance();
        componentInstance.setState({
            itemList: [],
            removedItem: {
                productDetails: {productCode: '9780000000019'},
                addedItem: {id: 1, buybackPrice: 10, price: 10}
            },
            removedItemIndex: 0,
            hasRemovedItem: true,
            displaySpinner: true
        });

        fetch.mockResponseOnce(JSON.stringify({
            productDetails: {productCode: '9780000000019'},
            addedItem: {id: 2, buybackPrice: 10, price: 10}
        }), {status: 400});

        componentInstance.undoRemove();

        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual('/vb/sellback/addItem?isbn=9780000000019&buybackPrice=10');

        await flushAllPromises();

        expect(wrapper.state('itemList').length).toEqual(0);
        expect(wrapper.state('errorText')).toEqual('An error occurred. Please try again later.');
        expect(wrapper.state('displaySpinner')).toEqual(false);
    });

    it('should not add an item back into the list when an exception occurs', async () => {
        const wrapper = shallow(<Sellback />);
        const componentInstance = wrapper.instance();
        componentInstance.setState({
            itemList: [],
            removedItem: {
                productDetails: {productCode: '9780000000019'},
                addedItem: {id: 1, buybackPrice: 10, price: 10}
            },
            removedItemIndex: 0,
            hasRemovedItem: true,
            displaySpinner: true
        });

        fetch.mockRejectOnce('Rejected');

        componentInstance.undoRemove();

        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual('/vb/sellback/addItem?isbn=9780000000019&buybackPrice=10');

        await flushAllPromises();

        expect(wrapper.state('itemList').length).toEqual(0);
        expect(wrapper.state('errorText')).toEqual('An error occurred. Please try again later.');
        expect(wrapper.state('displaySpinner')).toEqual(false);
    });
});

describe('removeItem', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    const flushAllPromises = () => new Promise((resolve) => setImmediate(resolve));

    it('should remove an item from the list successfully', async () => {
        const wrapper = shallow(<Sellback />);
        const componentInstance = wrapper.instance();
        const item = {
            productDetails: {productCode: '9780000000019'},
            addedItem: {id: 123, cartId: 12}
        };
        componentInstance.setState({
            itemList: [item],
            hasRemovedItem: false,
            displaySpinner: true
        });

        fetch.mockResponseOnce(JSON.stringify({}), {status: 200});

        componentInstance.removeItem(item);

        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual('/vb/sellback/removeItem?id=123');

        await flushAllPromises();

        expect(wrapper.state('itemList').length).toEqual(0);
        expect(wrapper.state('hasRemovedItem')).toEqual(true);
        expect(wrapper.state('removedItem').addedItem.id).toEqual(123);
        expect(wrapper.state('removedItemIndex')).toEqual(0);
        expect(wrapper.state('itemTotal')).toEqual('0.00');
        expect(wrapper.state('errorText')).toEqual('');
        expect(wrapper.state('displaySpinner')).toEqual(false);
    });

    it('should not remove an item from the list when the status is not 200', async () => {
        const wrapper = shallow(<Sellback />);
        const componentInstance = wrapper.instance();
        const item = {
            productDetails: {productCode: '9780000000019'},
            addedItem: {id: 123, cartId: 12}
        };
        componentInstance.setState({
            itemList: [item],
            hasRemovedItem: false,
            displaySpinner: true
        });

        fetch.mockResponseOnce(JSON.stringify({}), {status: 400});

        componentInstance.removeItem(item);

        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual('/vb/sellback/removeItem?id=123');

        await flushAllPromises();

        expect(wrapper.state('itemList').length).toEqual(1);
        expect(wrapper.state('hasRemovedItem')).toEqual(false);
        expect(wrapper.state('removedItem')).toEqual(null);
        expect(wrapper.state('removedItemIndex')).toEqual(null);
        expect(wrapper.state('errorText')).toEqual('An error occurred. Please try again later.');
        expect(wrapper.state('displaySpinner')).toEqual(false);
    });

    it('should not remove an item from the list when exception occurs', async () => {
        const wrapper = shallow(<Sellback />);
        const componentInstance = wrapper.instance();
        const item = {
            productDetails: {productCode: '9780000000019'},
            addedItem: {id: 123, cartId: 12}
        };
        componentInstance.setState({
            itemList: [item],
            hasRemovedItem: false,
            displaySpinner: true,
        });

        fetch.mockRejectOnce('Rejected');

        componentInstance.removeItem(item);

        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual('/vb/sellback/removeItem?id=123');

        await flushAllPromises();

        expect(wrapper.state('itemList').length).toEqual(1);
        expect(wrapper.state('hasRemovedItem')).toEqual(false);
        expect(wrapper.state('removedItem')).toEqual(null);
        expect(wrapper.state('removedItemIndex')).toEqual(null);
        expect(wrapper.state('errorText')).toEqual('An error occurred. Please try again later.');
        expect(wrapper.state('displaySpinner')).toEqual(false);
    });
});

describe('setItemTotal', () => {
    it('item total should be correct', () => {
        const wrapper = shallow(<Sellback />);
        const componentInstance = wrapper.instance();
        const itemTotal = componentInstance.setItemTotal([
            {
                addedItem: {price: 10}
            },
            {
                addedItem: {price: 25}
            },
            {
                addedItem: {price: 50.50}
            }
        ]);
        expect(itemTotal).toBe("85.50");
    });
    it('item in REMOVED_NOT_AVAILABLE state should not be added in item total', () => {
        const wrapper = shallow(<Sellback />);
        const componentInstance = wrapper.instance();
        const itemTotal = componentInstance.setItemTotal([
            {
                addedItem: {price: 10, state: "LOCKED"}
            },
            {
                addedItem: {price: 25, state: "LOCKED"}
            },
            {
                addedItem: {price: 50.50, state: "REMOVED_NOT_AVAILABLE"}
            }
        ]);
        expect(itemTotal).toBe("35.00");
    });
});

describe('scrollToSellbackListContainer', () => {
    it('should call window.scrollTo once', () => {
        const spyScrollTo = jest.fn();
        Object.defineProperty(global.window, 'scrollTo', { value: spyScrollTo });

        const wrapper = shallow(<Sellback />);
        const componentInstance = wrapper.instance();
        componentInstance.scrollToSellbackListContainer();
        expect(spyScrollTo).toHaveBeenCalledWith({
            top: {"current": null},
            behavior: 'smooth'
        });
    });
});