import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Search } from '../components/sellback/search';
import { Container } from '@follett/common-ui';
import { FrequentlyAskedQuestions } from "../components/sellback/frequentlyAskedQuestions";
import Header from '../components/sellback/header';
import HowItWorks from '../components/sellback/howItWorks';
import HeaderBanner from '../components/sellback/headerBanner';
import Footer from '../components/sellback/footer';
import ListItemCountBanner from '../components/sellback/listItemCountBanner';
import Summary from '../components/sellback/summary';
import WarningBanner from '../components/sellback/warningBanner';
import SellbackListContainer from '../components/sellback/sellbackListContainer';

const sellbackPath = "/vb/sellback";

const contentElement = document.getElementById('content');

const staticData = JSON.parse(contentElement.getAttribute('staticData'));
const images = staticData.images;

const headerBannerText = staticData.headerBannerData ? staticData.headerBannerData['text'] : null;
const headerBannerUrl = staticData.headerBannerData ? staticData.headerBannerData['url'] : null;
const footerBannerText = staticData.footerBannerData[0]['text'];
const footerBannerContactText = staticData.footerBannerData[1]['text'];
const footerBannerContactDetail = staticData.footerBannerData[2]['text'];

const initialItemData = JSON.parse(contentElement.getAttribute('initialItemData'));

const noActiveBidsErrorText = 'The provided ISBN has no active bids. Please try again later or provide a new ISBN.'
const errorText = 'An error occurred. Please try again later.';
const isbnInvalidErrorText = 'The provided ISBN is invalid.';

export default class Sellback extends Component {

    constructor() {
      super();
      this.state = {
        searchedIsbn: '',
        itemList: initialItemData,
        hasRemovedItem: false,
        removedItem: null,
        removedItemIndex: null,
        itemTotal: initialItemData ? this.setItemTotal(initialItemData) : 0,
        errorText: '',
        displaySpinner: false
      };
      this.removeItem = this.removeItem.bind(this);
      this.undoRemove = this.undoRemove.bind(this);
      this.addItem = this.addItem.bind(this);
      this.isbnChange = this.isbnChange.bind(this);
      this.sellbackListContainerRef = React.createRef();
    }

    isbnChange(isbn) {
      this.setState({
        searchedIsbn : isbn.trim()
      });
    }

    addItem(evt) {

      evt.preventDefault();
      const isbn = this.state.searchedIsbn;

      if (isbn !== "") {
        this.setState({ displaySpinner: true });
        fetch(`${sellbackPath}/addItem?isbn=${isbn}`, {
          method: 'GET'
        })
        .then(res => {
          if (res.status == 200) {

            const currentData = [...this.state.itemList];

            res.json().then(json => {
              
                currentData.push(json);

                this.setState({
                  searchedIsbn: '',
                  itemList: currentData,
                  hasRemovedItem: false,
                  removedItem: null,
                  removedItemIndex: null,
                  itemTotal: this.setItemTotal(currentData),
                  errorText: '',
                  displaySpinner: false
              }, function() {
                this.scrollToSellbackListContainer();
              });
            });
          } else {
            res.text().then(text => {
              this.setState({
                  errorText: text === 'An invalid ISBN was provided.' ? isbnInvalidErrorText : (text === 'Obtained a quote of $0 for the given ISBN' ? noActiveBidsErrorText: errorText),
                  displaySpinner: false
              });
            });
          }
        })
        .catch((ex) => {
            this.setState({
                errorText: errorText,
                displaySpinner: false
            });
        });
      }
    }

    undoRemove() {

      const currentData = [...this.state.itemList];
      const removedItem = this.state.removedItem;

      this.setState({ displaySpinner: true });
      fetch(`${sellbackPath}/addItem?isbn=${removedItem.productDetails.productCode}&buybackPrice=${removedItem.addedItem.buybackPrice}`, {
        method: 'GET'
      })
      .then(res => {
        if (res.status == 200) {

          const index = this.state.removedItemIndex;

          res.json().then(json => {
              currentData.splice(index, 0, json);
              this.setState({
                  itemList: currentData,
                  hasRemovedItem: false,
                  removedItem: null,
                  removedItemIndex: null,
                  itemTotal: this.setItemTotal(currentData),
                  errorText: '',
                  displaySpinner: false
              });
          });
        } else {
          this.setState({
            errorText: errorText,
            displaySpinner: false
          });
        }
      })
      .catch(ex => {
          this.setState({
              errorText: errorText,
              displaySpinner: false
          });
      });
    }

    removeItem(item) {

      this.setState({ displaySpinner: true });
      fetch(`${sellbackPath}/removeItem?id=${item.addedItem.id}`, {
        method: 'POST',
        body: JSON.stringify({cartId: item.addedItem.cartId})
      })
      .then(res => {
        if (res.status == 200) {

          const currentData = [...this.state.itemList];

          const index = currentData.indexOf(item);
          currentData.splice(index, 1);

          this.setState({
              itemList: currentData,
              hasRemovedItem: true,
              removedItem: item,
              removedItemIndex: index,
              itemTotal: this.setItemTotal(currentData),
              errorText: '',
              displaySpinner: false
          });

        } else {
          this.setState({
            errorText: errorText,
            displaySpinner: false
          });
        }
      })
      .catch(ex => {
          this.setState({
              errorText: errorText,
              displaySpinner: false
          });
      });
    }

    setItemTotal(itemList) {
        let totalTemp = 0;
        for (var i = 0; i < itemList.length; i++) {
          var price = 0;
          if (itemList[i].addedItem.state != "REMOVED_NOT_AVAILABLE") {
             price = itemList[i].addedItem.price;
          }
          totalTemp += price;
        }
        return parseFloat(totalTemp).toFixed(2);
    }

    scrollToSellbackListContainer() {
        window.scrollTo({ behavior: 'smooth', top: this.sellbackListContainerRef });
    }

    render() {

        let itemList = this.state.itemList;
        let itemCount = itemList.length;
        let itemTotal = this.state.itemTotal;
        let searchedIsbn = this.state.searchedIsbn;
        let displaySpinner = this.state.displaySpinner;

        return (
            <Container>
                { displaySpinner ? <div className="spinner"/> : null }
                {headerBannerText && <HeaderBanner banner={headerBannerText} url={headerBannerUrl}/>}
                <Container className="sellback-landing-container">
                    <Header brandLogo={images['headerLogo']} isDisplayed="true" />
                    <Search containerClassName="search-container hide-desktop"
                            image={images['upperSearch']}
                            imagePlacement="right"
                            searchedIsbn={searchedIsbn}
                            isbnChangeFunc={this.isbnChange}
                            searchFunc={this.addItem}
                            disableButton={displaySpinner}/>
                    <Search containerClassName="search-container hide-mobile"
                            image={images['upperSearch']}
                            imagePlacement="top"
                            searchedIsbn={searchedIsbn}
                            isbnChangeFunc={this.isbnChange}
                            searchFunc={this.addItem}
                            disableButton={displaySpinner}/>
                    {this.state.hasRemovedItem && <WarningBanner textBookTitle={this.state.removedItem.productDetails.name} listItemCount={itemCount} undoRemove={this.undoRemove}/>}
                    {this.state.errorText &&
                        <div className="error-banner error-banner-text">
                            {this.state.errorText}
                        </div>}
                    {
                      itemList && itemCount > 0 ?
                      <div>
                          <ListItemCountBanner listItemCount={itemCount} />
                          <Container className="sellback-list-container" ref={this.sellbackListContainerRef}>
                              <SellbackListContainer data={itemList} removeItem={this.removeItem}/>
                              <Summary hideDisclaimerTextAndButton={false} itemCount={itemCount} itemTotal={itemTotal}/>
                          </Container>
                       </div> : null
                    }
                    <HowItWorks data={staticData.howItWorksData} />
                    <FrequentlyAskedQuestions knowledgeBase={staticData.knowledgeBase}/>
                    <Search containerClassName="search-container hide-desktop"
                            image={images['lowerSearch']}
                            imagePlacement="left"
                            searchedIsbn={searchedIsbn}
                            isbnChangeFunc={this.isbnChange}
                            searchFunc={this.addItem}
                            disableButton={displaySpinner}/>
                    <Search containerClassName="search-container hide-mobile"
                            image={images['lowerSearch']}
                            imagePlacement="top"
                            searchedIsbn={searchedIsbn}
                            isbnChangeFunc={this.isbnChange}
                            searchFunc={this.addItem}
                            disableButton={displaySpinner}/>
                    <Footer footerBannerText={footerBannerText}
                            footerBannerContactText={footerBannerContactText}
                            footerBannerContactDetail={footerBannerContactDetail} />
                </Container>
            </Container>
        )
    }
}

ReactDOM.render(<Sellback />, contentElement);