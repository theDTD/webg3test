import React from 'react';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Footer from "../../../../main/react/components/textbooks/footer";
import TestRenderer, {ReactTestInstance, ReactTestRenderer} from 'react-test-renderer';
import Collapsible from "../../../../main/react/components/textbooks/collapsible";

configure({ adapter: new Adapter() });

const domain: string = "www.domain.com";

const footerSealClassName: string = "footer-seal";
const sealImgSrc: string = "https://images.valorebooks.com/images/vb/web/sellback/10656_home/valore-logo1.svg";
const sealImgAlt: string = "ValoreBooks seal";
const sealP: string = "With our dedicated customer support team, you can rest easy knowing that we're doing everything we can to save you time, money, and stress";

const csLi1Key: string = "cs-1";
const csLi1LinkHref: string = "https://help.valorebooks.com";
const csLi1LinkTitle: string = "Support center";
const csLi1LinkTextContent: string = "Support Center";

const csLi2Key: string = "cs-2";
const csLi2LinkHref: string = "https://help.valorebooks.com/article/324-return-policies";
const csLi2LinkTitle: string = "Return policies";
const csLi2LinkTextContent: string = "Return Policies";

const csLi3Key: string = "cs-3";
const csLi3LinkHref: string = "https://help.valorebooks.com/article/224-shipping";
const csLi3LinkTitle: string = "Shipping details";
const csLi3LinkTextContent: string = "Shipping Details";

const csLi4Key: string = "cs-4";
const csLi4LinkHref: string = `${domain}/the-ultimate-guide-to-sell-textbooks`;
const csLi4LinkTitle: string = "How to Sell Textbooks - The Ultimate Guide for Selling College Books";
const csLi4LinkTextContent: string = "How to Sell Textbooks";

const siLi1Key: string = "si-1";
const siLi1LinkHref: string = "https://help.valorebooks.com/article/337-legal-policies";
const siLi1LinkTitle: string = "Legal policies";
const siLi1LinkTextContent: string = "Legal Policies";

const siLi2Key: string = "si-2";
const siLi2LinkHref: string = `${domain}/Sitemap.do`;
const siLi2LinkTitle: string = "Site map";
const siLi2LinkTextContent: string = "Site Map";

const siLi3Key: string = "si-3";
const siLi3LinkHref: string = `${domain}/extra-mile-guarantee`;
const siLi3LinkTitle: string = "ValoreBooks guarantee";
const siLi3LinkTextContent: string = "ValoreBooks Guarantee";

const vaLi1Key: string = "va-1";
const vaLi1LinkHref: string = `${domain}/YourAccount.do`;
const vaLi1LinkTitle: string = "View order status";
const vaLi1LinkTextContent: string = "View Order Status";


const vaLi2Key: string = "va-2";
const vaLi2LinkHref: string = `${domain}/marketplace-sellers`;
const vaLi2LinkTitle: string = "Marketplace sellers";
const vaLi2LinkTextContent: string = "Marketplace Sellers";

const vaLi3Key: string = "va-3";
const vaLi3LinkHref: string = `${domain}/rental-marketplace`;
const vaLi3LinkTitle: string = "Rental providers";
const vaLi3LinkTextContent: string = "Rental Providers";

const vaLi4Key: string = "va-4";
const vaLi4LinkHref: string = `${domain}/affiliate-program`;
const vaLi4LinkTitle: string = "Affiliates";
const vaLi4LinkTextContent: string = "Affiliates";

const bbLi1Key: string = "bb-1";
const bbLi1LinkHref: string = `${domain}/top-books`;
const bbLi1LinkTitle: string = "Top books";
const bbLi1LinkTextContent: string = "Top Books";

const bbLi2Key: string = "bb-2";
const bbLi2LinkHref: string = `${domain}/top-textbooks-for-college`;
const bbLi2LinkTitle: string = "Top textbooks";
const bbLi2LinkTextContent: string = "Top Textbooks";

const bbLi3Key: string = "bb-3";
const bbLi3LinkHref: string = `${domain}/rent-textbooks`;
const bbLi3LinkTitle: string = "Rent textbooks";
const bbLi3LinkTextContent: string = "Rent Textbooks";

const bbLi4Key: string = "bb-4";
const bbLi4LinkHref: string = `${domain}/textbook-rental-subjects`;
const bbLi4LinkTitle: string = "Textbook rental subjects";
const bbLi4LinkTextContent: string = "Textbook Rental Subjects";

const fbLink: string = "https://www.facebook.com/valorebooks"
const fbIcon: string = "fab fa-facebook-f";
const smLi1Key: string = "sm-1";

const twitterLink: string = "https://twitter.com/valorebooks";
const twitterIcon: string = "fab fa-twitter";
const smLi2Key: string = "sm-2";

const instagramLink: string = "https://www.instagram.com/valorebooks/?hl=en";
const instagramIcon: string = "fab fa-instagram";
const smLi3Key: string = "sm-3";

const pinterestLink: string = "https://www.pinterest.com/valorebooks/";
const pinterestIcon: string = "fab fa-pinterest";
const smLi4Key: string = "sm-4";

const nacsHref: string = "https://nacs.org/";
const nacsLinkTitle: string = "National Association Of College Stores";
const nacsLinkTarget: string = "_blank";

const nacsLogoSrc: string = "https://img.valorebooks.com/images/vb/web/footer/nacs.png";
const nacsLogoAlt: string = "National Association Of College Stores";

const bbb_linkId: string = "bbblink";
const bbb_linkClassName: string = "ruhzbam";
const bbb_linkHref: string = "https://www.bbb.org/us/ar/little-rock/profile/textbooks/valorebooks-0935-90387842#bbbseal";
const bbb_linkTitle: string = "ValoreBooks, Textbooks, Little Rock, AR"
const bbb_linkImgId: string = "bbblinkimg";
const bbb_linkImgSrc: string = "https://seal-arkansas.bbb.org/logo/ruhzbam/valorebooks-90387842.png";
const bbb_linkImgWidth: string = "300";
const bbb_linkImgHeight: string = "68";
const bbb_LinkImgAlt: string = "ValoreBooks, Textbooks, Little Rock, AR";


describe('Footer', () => {
    it('should render Footer correctly', () => {
        const component: JSX.Element = <Footer domain={domain}/>;
        const renderedComponent: ReactTestRenderer = TestRenderer.create(component);
        const root: ReactTestInstance = renderedComponent.root;

        const footer: ReactTestInstance = root.findByType("footer");

        const separator: ReactTestInstance = footer.props.children[0];
        expect(separator.type).toEqual("img");
        expect(separator.props.alt).toEqual("Section separator purple");

        const footerContentWrapper: ReactTestInstance = footer.props.children[1];
        expect(footerContentWrapper.type).toEqual("div");
        expect(footerContentWrapper.props.className).toEqual("footer-content-wrapper");

        const containerDesktop: ReactTestInstance = footerContentWrapper.props.children[0];
        expect(containerDesktop.type).toEqual("div");
        expect(containerDesktop.props.className).toEqual("container desktop-only");

        const footerGrid: ReactTestInstance = containerDesktop.props.children.props;
        expect(footerGrid.className).toEqual("footer-grid");

        const footerSeal: Object = footerGrid.children[0];
        expect(footerSeal.type).toEqual("div");
        expect(footerSeal.props.className).toEqual(footerSealClassName);

        const sealImg: Object = footerSeal.props.children[0];
        expect(sealImg.type).toEqual("img");
        expect(sealImg.props.src).toEqual(sealImgSrc);
        expect(sealImg.props.alt).toEqual(sealImgAlt);

        const footerSealP: Object = footerSeal.props.children[1];
        expect(footerSealP.type).toEqual("p");
        expect(footerSealP.props.children).toEqual(sealP);

        const customerService: Object = footerGrid.children[1];
        expect(customerService.type).toEqual("div");
        expect(customerService.props.className).toEqual("links-customer-service");

        const customerServiceHeading: Object = customerService.props.children[0];
        expect(customerServiceHeading.type).toEqual("h6");
        expect(customerServiceHeading.props.className).toEqual("footer-heading");
        expect(customerServiceHeading.props.children).toEqual("Customer Service");

        const customerServiceList: Object = customerService.props.children[1];
        expect(customerServiceList.type).toEqual("ul");

        const customerServiceListLi1: Object = customerServiceList.props.children[0];
        expect(customerServiceListLi1.type).toEqual("li");
        expect(customerServiceListLi1.key).toEqual(csLi1Key);

        const customerServiceListLi1Link: Object = customerServiceListLi1.props.children;
        expect(customerServiceListLi1Link.type).toEqual("a");
        expect(customerServiceListLi1Link.props.href).toEqual(csLi1LinkHref);
        expect(customerServiceListLi1Link.props.title).toEqual(csLi1LinkTitle);
        expect(customerServiceListLi1Link.props.children).toEqual(csLi1LinkTextContent);

        const customerServiceListLi2: Object = customerServiceList.props.children[1];
        expect(customerServiceListLi2.type).toEqual("li");
        expect(customerServiceListLi2.key).toEqual(csLi2Key);

        const customerServiceListLi2Link: Object = customerServiceListLi2.props.children;
        expect(customerServiceListLi2Link.type).toEqual("a");
        expect(customerServiceListLi2Link.props.href).toEqual(csLi2LinkHref);
        expect(customerServiceListLi2Link.props.title).toEqual(csLi2LinkTitle);
        expect(customerServiceListLi2Link.props.children).toEqual(csLi2LinkTextContent);

        const customerServiceListLi3: Object = customerServiceList.props.children[2];
        expect(customerServiceListLi3.type).toEqual("li");
        expect(customerServiceListLi3.key).toEqual(csLi3Key);

        const customerServiceListLi3Link: Object = customerServiceListLi3.props.children;
        expect(customerServiceListLi3Link.type).toEqual("a");
        expect(customerServiceListLi3Link.props.href).toEqual(csLi3LinkHref);
        expect(customerServiceListLi3Link.props.title).toEqual(csLi3LinkTitle);
        expect(customerServiceListLi3Link.props.children).toEqual(csLi3LinkTextContent);

        const customerServiceListLi4: Object = customerServiceList.props.children[3];
        expect(customerServiceListLi4.type).toEqual("li");
        expect(customerServiceListLi4.key).toEqual(csLi4Key);

        const customerServiceListLi4Link: Object = customerServiceListLi4.props.children;
        expect(customerServiceListLi4Link.type).toEqual("a");
        expect(customerServiceListLi4Link.props.href).toEqual(csLi4LinkHref);
        expect(customerServiceListLi4Link.props.title).toEqual(csLi4LinkTitle);
        expect(customerServiceListLi4Link.props.children).toEqual(csLi4LinkTextContent);

        const siteInfo: Object = footerGrid.children[2];
        expect(siteInfo.type).toEqual("div");
        expect(siteInfo.props.className).toEqual("links-site-information");

        const siteInfoHeading: Object = siteInfo.props.children[0];
        expect(siteInfoHeading.type).toEqual("h6");
        expect(siteInfoHeading.props.className).toEqual("footer-heading");
        expect(siteInfoHeading.props.children).toEqual("Site Information");

        const siteInfoList: Object = siteInfo.props.children[1];
        expect(siteInfoList.type).toEqual("ul");

        const siteInfoListLi1: Object = siteInfoList.props.children[0];
        expect(siteInfoListLi1.type).toEqual("li");
        expect(siteInfoListLi1.key).toEqual(siLi1Key);

        const siteInfoListLi1Link: Object = siteInfoListLi1.props.children;
        expect(siteInfoListLi1Link.type).toEqual("a");
        expect(siteInfoListLi1Link.props.href).toEqual(siLi1LinkHref);
        expect(siteInfoListLi1Link.props.title).toEqual(siLi1LinkTitle);
        expect(siteInfoListLi1Link.props.children).toEqual(siLi1LinkTextContent);

        const siteInfoListLi2: Object = siteInfoList.props.children[1];
        expect(siteInfoListLi2.type).toEqual("li");
        expect(siteInfoListLi2.key).toEqual(siLi2Key);

        const siteInfoListLi2Link: Object = siteInfoListLi2.props.children;
        expect(siteInfoListLi2Link.type).toEqual("a");
        expect(siteInfoListLi2Link.props.href).toEqual(siLi2LinkHref);
        expect(siteInfoListLi2Link.props.title).toEqual(siLi2LinkTitle);
        expect(siteInfoListLi2Link.props.children).toEqual(siLi2LinkTextContent);

        const siteInfoListLi3: Object = siteInfoList.props.children[2];
        expect(siteInfoListLi3.type).toEqual("li");
        expect(siteInfoListLi3.key).toEqual(siLi3Key);

        const siteInfoListLi3Link: Object = siteInfoListLi3.props.children;
        expect(siteInfoListLi3Link.type).toEqual("a");
        expect(siteInfoListLi3Link.props.href).toEqual(siLi3LinkHref);
        expect(siteInfoListLi3Link.props.title).toEqual(siLi3LinkTitle);
        expect(siteInfoListLi3Link.props.children).toEqual(siLi3LinkTextContent);

        const valoreAccounts: Object = footerGrid.children[3];
        expect(valoreAccounts.type).toEqual("div");
        expect(valoreAccounts.props.className).toEqual("links-valore-accounts");

        const valoreAccountsHeading: Object = valoreAccounts.props.children[0];
        expect(valoreAccountsHeading.type).toEqual("h6");
        expect(valoreAccountsHeading.props.className).toEqual("footer-heading");
        expect(valoreAccountsHeading.props.children).toEqual("Valore Accounts");

        const valoreAccountsList: Object = valoreAccounts.props.children[1];
        expect(valoreAccountsList.type).toEqual("ul");

        const valoreAccountsLi1: Object = valoreAccountsList.props.children[0];
        expect(valoreAccountsLi1.type).toEqual("li");
        expect(valoreAccountsLi1.key).toEqual(vaLi1Key)


        const valoreAccountsLi1Link: Object = valoreAccountsLi1.props.children;
        expect(valoreAccountsLi1Link.type).toEqual("a");
        expect(valoreAccountsLi1Link.props.href).toEqual(vaLi1LinkHref);
        expect(valoreAccountsLi1Link.props.title).toEqual(vaLi1LinkTitle);
        expect(valoreAccountsLi1Link.props.children).toEqual(vaLi1LinkTextContent);

        const valoreAccountsLi2: Object = valoreAccountsList.props.children[1];
        expect(valoreAccountsLi2.type).toEqual("li");
        expect(valoreAccountsLi2.key).toEqual(vaLi2Key)

        const valoreAccountsLi2Link: Object = valoreAccountsLi2.props.children;
        expect(valoreAccountsLi2Link.type).toEqual("a");
        expect(valoreAccountsLi2Link.props.href).toEqual(vaLi2LinkHref);
        expect(valoreAccountsLi2Link.props.title).toEqual(vaLi2LinkTitle);
        expect(valoreAccountsLi2Link.props.children).toEqual(vaLi2LinkTextContent);

        const valoreAccountsLi3: Object = valoreAccountsList.props.children[2];
        expect(valoreAccountsLi3.type).toEqual("li");
        expect(valoreAccountsLi3.key).toEqual(vaLi3Key)

        const valoreAccountsLi3Link: Object = valoreAccountsLi3.props.children;
        expect(valoreAccountsLi3Link.type).toEqual("a");
        expect(valoreAccountsLi3Link.props.href).toEqual(vaLi3LinkHref);
        expect(valoreAccountsLi3Link.props.title).toEqual(vaLi3LinkTitle);
        expect(valoreAccountsLi3Link.props.children).toEqual(vaLi3LinkTextContent);

        const valoreAccountsLi4: Object = valoreAccountsList.props.children[3];
        expect(valoreAccountsLi4.type).toEqual("li");
        expect(valoreAccountsLi4.key).toEqual(vaLi4Key)

        const valoreAccountsLi4Link: Object = valoreAccountsLi4.props.children;
        expect(valoreAccountsLi4Link.type).toEqual("a");
        expect(valoreAccountsLi4Link.props.href).toEqual(vaLi4LinkHref);
        expect(valoreAccountsLi4Link.props.title).toEqual(vaLi4LinkTitle);
        expect(valoreAccountsLi4Link.props.children).toEqual(vaLi4LinkTextContent);

        const browseBooks: Object = footerGrid.children[4];
        expect(browseBooks.type).toEqual("div");
        expect(browseBooks.props.className).toEqual("links-browse-books");

        const browseBooksHeading: Object = browseBooks.props.children[0];
        expect(browseBooksHeading.type).toEqual("h6");
        expect(browseBooksHeading.props.className).toEqual("footer-heading");
        expect(browseBooksHeading.props.children).toEqual("Browse Books");

        const browseBooksList: Object = browseBooks.props.children[1];
        expect(browseBooksList.type).toEqual("ul");

        const browseBooksListLi1: Object = browseBooksList.props.children[0];
        expect(browseBooksListLi1.type).toEqual("li");
        expect(browseBooksListLi1.key).toEqual(bbLi1Key);

        const browseBooksListLi1Link: Object = browseBooksListLi1.props.children;
        expect(browseBooksListLi1Link.type).toEqual("a");
        expect(browseBooksListLi1Link.props.href).toEqual(bbLi1LinkHref);
        expect(browseBooksListLi1Link.props.title).toEqual(bbLi1LinkTitle);
        expect(browseBooksListLi1Link.props.children).toEqual(bbLi1LinkTextContent);

        const browseBooksListLi2: Object = browseBooksList.props.children[1];
        expect(browseBooksListLi2.type).toEqual("li");
        expect(browseBooksListLi2.key).toEqual(bbLi2Key);

        const browseBooksListLi2Link: Object = browseBooksListLi2.props.children;
        expect(browseBooksListLi2Link.type).toEqual("a");
        expect(browseBooksListLi2Link.props.href).toEqual(bbLi2LinkHref);
        expect(browseBooksListLi2Link.props.title).toEqual(bbLi2LinkTitle);
        expect(browseBooksListLi2Link.props.children).toEqual(bbLi2LinkTextContent);

        const browseBooksListLi3: Object = browseBooksList.props.children[2];
        expect(browseBooksListLi3.type).toEqual("li");
        expect(browseBooksListLi3.key).toEqual(bbLi3Key);

        const browseBooksListLi3Link: Object = browseBooksListLi3.props.children;
        expect(browseBooksListLi3Link.type).toEqual("a");
        expect(browseBooksListLi3Link.props.href).toEqual(bbLi3LinkHref);
        expect(browseBooksListLi3Link.props.title).toEqual(bbLi3LinkTitle);
        expect(browseBooksListLi3Link.props.children).toEqual(bbLi3LinkTextContent);

        const browseBooksListLi4: Object = browseBooksList.props.children[3];
        expect(browseBooksListLi4.type).toEqual("li");
        expect(browseBooksListLi4.key).toEqual(bbLi4Key);

        const browseBooksListLi4Link: Object = browseBooksListLi4.props.children;
        expect(browseBooksListLi4Link.type).toEqual("a");
        expect(browseBooksListLi4Link.props.href).toEqual(bbLi4LinkHref);
        expect(browseBooksListLi4Link.props.title).toEqual(bbLi4LinkTitle);
        expect(browseBooksListLi4Link.props.children).toEqual(bbLi4LinkTextContent);

        const socialMedia: Object = footerGrid.children[5];
        expect(socialMedia.type).toEqual("div");
        expect(socialMedia.props.className).toEqual("footer-social-media");

        const socialMediaList: Object = socialMedia.props.children;
        expect(socialMediaList.type).toEqual("ul");

        const socialMediaListLi1: Object = socialMediaList.props.children[0];
        expect(socialMediaListLi1.type).toEqual("li");
        expect(socialMediaListLi1.key).toEqual(smLi1Key);

        const socialMediaListLi1Link: Object = socialMediaListLi1.props.children;
        expect(socialMediaListLi1Link.type).toEqual("a");
        expect(socialMediaListLi1Link.props.href).toEqual(fbLink);
        expect(socialMediaListLi1Link.props.target).toEqual("_blank");

        const socialMediaListLi1Icon: Object = socialMediaListLi1Link.props.children;
        expect(socialMediaListLi1Icon.type).toEqual("i");
        expect(socialMediaListLi1Icon.props.className).toEqual(fbIcon);

        const socialMediaListLi2: Object = socialMediaList.props.children[1];
        expect(socialMediaListLi2.type).toEqual("li");
        expect(socialMediaListLi2.key).toEqual(smLi2Key);

        const socialMediaListLi2Link: Object = socialMediaListLi2.props.children;
        expect(socialMediaListLi2Link.type).toEqual("a");
        expect(socialMediaListLi2Link.props.href).toEqual(twitterLink);
        expect(socialMediaListLi2Link.props.target).toEqual("_blank");

        const socialMediaListLi2Icon: Object = socialMediaListLi2Link.props.children;
        expect(socialMediaListLi2Icon.type).toEqual("i");
        expect(socialMediaListLi2Icon.props.className).toEqual(twitterIcon);

        const socialMediaListLi3: Object = socialMediaList.props.children[2];
        expect(socialMediaListLi3.type).toEqual("li");
        expect(socialMediaListLi3.key).toEqual(smLi3Key);

        const socialMediaListLi3Link: Object = socialMediaListLi3.props.children;
        expect(socialMediaListLi3Link.type).toEqual("a");
        expect(socialMediaListLi3Link.props.href).toEqual(instagramLink);
        expect(socialMediaListLi3Link.props.target).toEqual("_blank");

        const socialMediaListLi3Icon: Object = socialMediaListLi3Link.props.children;
        expect(socialMediaListLi3Icon.type).toEqual("i");
        expect(socialMediaListLi3Icon.props.className).toEqual(instagramIcon);

        const socialMediaListLi4: Object = socialMediaList.props.children[3];
        expect(socialMediaListLi4.type).toEqual("li");
        expect(socialMediaListLi4.key).toEqual(smLi4Key);

        const socialMediaListLi4Link: Object = socialMediaListLi4.props.children;
        expect(socialMediaListLi4Link.type).toEqual("a");
        expect(socialMediaListLi4Link.props.href).toEqual(pinterestLink);
        expect(socialMediaListLi4Link.props.target).toEqual("_blank");

        const socialMediaListLi4Icon: Object = socialMediaListLi4Link.props.children;
        expect(socialMediaListLi4Icon.type).toEqual("i");
        expect(socialMediaListLi4Icon.props.className).toEqual(pinterestIcon);

        const gridSpace1: Object = footerGrid.children[6];
        expect(gridSpace1.type).toEqual("div");
        expect(gridSpace1.props.className).toEqual("footer-social-media-col-2");

        const gridSpace2: Object = footerGrid.children[7];
        expect(gridSpace2.type).toEqual("div");
        expect(gridSpace2.props.className).toEqual("footer-social-media-col-3");

        const gridSpace3: Object = footerGrid.children[8];
        expect(gridSpace3.type).toEqual("div");
        expect(gridSpace3.props.className).toEqual("footer-social-media-col-4");

        const gridSpace5: Object = footerGrid.children[9];
        expect(gridSpace5.type).toEqual("div");
        expect(gridSpace5.props.className).toEqual("footer-social-media-col-5");

        const containerDesktop2: ReactTestInstance = footerContentWrapper.props.children[1];
        expect(containerDesktop2.type).toEqual("div");
        expect(containerDesktop2.props.className).toEqual("container desktop-only");

        const disclaimerGrid: ReactTestInstance = containerDesktop2.props.children;
        expect(disclaimerGrid.props.className).toEqual("footer-disclaimer-grid");
        expect(disclaimerGrid.type).toEqual("div");

        const disclaimerSpacer: ReactTestInstance = disclaimerGrid.props.children[0];
        expect(disclaimerSpacer.type).toEqual("div");
        expect(disclaimerSpacer.props.className).toEqual("footer-disclaimer-col-1");

        const disclaimer: Object = disclaimerGrid.props.children[1];
        const disclaimerGrp: Object = disclaimer.props.children;
        expect(disclaimerGrp.type).toEqual("div");
        expect(disclaimerGrp.props.className).toEqual("footer-disclaimer-grp");

        const disclaimerPContainer: Object = disclaimerGrp.props.children[0];
        expect(disclaimerPContainer.type).toEqual("div");
        expect(disclaimerPContainer.props.className).toEqual("footer-disclaimer");

        const disclaimerPLine1Grp: Object = disclaimerPContainer.props.children[0];
        expect(disclaimerPLine1Grp.type).toEqual("p");
        expect(disclaimerPLine1Grp.props.children[0]).toEqual("© 2005-");
        expect(disclaimerPLine1Grp.props.children[1]).toEqual(new Date().getFullYear());
        expect(disclaimerPLine1Grp.props.children[2]).toEqual(", ");
        expect(disclaimerPLine1Grp.props.children[3].type).toEqual("a");
        expect(disclaimerPLine1Grp.props.children[3].props.href).toEqual("/");
        expect(disclaimerPLine1Grp.props.children[3].props.children).toEqual("ValoreBooks");
        expect(disclaimerPLine1Grp.props.children[4]).toEqual(". All Rights Reserved.");

        const externalLinks: Object = disclaimerGrp.props.children[1];
        expect(externalLinks.type).toEqual("div");
        expect(externalLinks.props.className).toEqual("footer-logos");

        const nacsLink: Object = externalLinks.props.children[0];
        expect(nacsLink.type).toEqual("a");
        expect(nacsLink.props.href).toEqual(nacsHref);
        expect(nacsLink.props.title).toEqual(nacsLinkTitle);
        expect(nacsLink.props.target).toEqual(nacsLinkTarget);

        const nacsLinkImg: Object = nacsLink.props.children;
        expect(nacsLinkImg.type).toEqual("img");
        expect(nacsLinkImg.props.src).toEqual(nacsLogoSrc);
        expect(nacsLinkImg.props.alt).toEqual(nacsLogoAlt);

        const bbbLink: Object = externalLinks.props.children[1];
        expect(bbbLink.type).toEqual("a");
        expect(bbbLink.props.id).toEqual(bbb_linkId);
        expect(bbbLink.props.className).toEqual(bbb_linkClassName);
        expect(bbbLink.props.href).toEqual(bbb_linkHref);
        expect(bbbLink.props.title).toEqual(bbb_linkTitle);
        expect(bbbLink.props.target).toEqual();

        const bbbLinkImg: Object = bbbLink.props.children;
        expect(bbbLinkImg.type).toEqual("img");
        expect(bbbLinkImg.props.src).toEqual(bbb_linkImgSrc);
        expect(bbbLinkImg.props.alt).toEqual(bbb_LinkImgAlt);
        expect(bbbLinkImg.props.height).toEqual(bbb_linkImgHeight);
        expect(bbbLinkImg.props.width).toEqual(bbb_linkImgWidth);
        expect(bbbLinkImg.props.id).toEqual(bbb_linkImgId);

    //    Mobile
        const mobileContainer: ReactTestInstance = footerContentWrapper.props.children[2];
        expect(mobileContainer.type).toEqual("div");
        expect(mobileContainer.props.className).toEqual("mobile-only");
        
        const mobileInnerContainer: Object = mobileContainer.props.children;
        expect(mobileInnerContainer.type).toEqual("div");
        expect(mobileInnerContainer.props.className).toEqual("container");

        const mobileDedicatedSeal: Object = mobileInnerContainer.props.children[0];
        expect(mobileDedicatedSeal.type).toEqual("div");
        expect(mobileDedicatedSeal.props.className).toEqual(footerSealClassName);

        const mobileDedicatedSealImg: Object = mobileDedicatedSeal.props.children[0];
        expect(mobileDedicatedSealImg.type).toEqual("img");
        expect(mobileDedicatedSealImg.props.src).toEqual(sealImgSrc);
        expect(mobileDedicatedSealImg.props.alt).toEqual(sealImgAlt);

        const mobileDedicatedSealP: Object = mobileDedicatedSeal.props.children[1];
        expect(mobileDedicatedSealP.type).toEqual("p");
        expect(mobileDedicatedSealP.props.children).toEqual(sealP);

        const collapsible1: JSX.Element = mobileInnerContainer.props.children[1];
        expect(collapsible1.type).toEqual(Collapsible);
        expect(collapsible1.props.title).toEqual("Customer Service");

        const csMobileList: Object = collapsible1.props.content;
        expect(csMobileList.type).toEqual("ul");

        const csMobileListLi1: Object = csMobileList.props.children[0];
        expect(csMobileListLi1.type).toEqual("li");
        expect(csMobileListLi1.key).toEqual(csLi1Key);

        const csMobileListLi1Link: Object = csMobileListLi1.props.children;
        expect(csMobileListLi1Link.type).toEqual("a");
        expect(csMobileListLi1Link.props.href).toEqual(csLi1LinkHref);
        expect(csMobileListLi1Link.props.title).toEqual(csLi1LinkTitle);
        expect(csMobileListLi1Link.props.children).toEqual(csLi1LinkTextContent);

        const csMobileListLi2: Object = csMobileList.props.children[1];
        expect(csMobileListLi2.type).toEqual("li");
        expect(csMobileListLi2.key).toEqual(csLi2Key);

        const csMobileListLi2Link: Object = csMobileListLi2.props.children;
        expect(csMobileListLi2Link.type).toEqual("a");
        expect(csMobileListLi2Link.props.href).toEqual(csLi2LinkHref);
        expect(csMobileListLi2Link.props.title).toEqual(csLi2LinkTitle);
        expect(csMobileListLi2Link.props.children).toEqual(csLi2LinkTextContent);

        const csMobileListLi3: Object = csMobileList.props.children[2];
        expect(csMobileListLi3.type).toEqual("li");
        expect(csMobileListLi3.key).toEqual(csLi3Key);

        const csMobileListLi3Link: Object = csMobileListLi3.props.children;
        expect(csMobileListLi3Link.type).toEqual("a");
        expect(csMobileListLi3Link.props.href).toEqual(csLi3LinkHref);
        expect(csMobileListLi3Link.props.title).toEqual(csLi3LinkTitle);
        expect(csMobileListLi3Link.props.children).toEqual(csLi3LinkTextContent);

        const csMobileListLi4: Object = csMobileList.props.children[3];
        expect(csMobileListLi4.type).toEqual("li");
        expect(csMobileListLi4.key).toEqual(csLi4Key);

        const csMobileListLi4Link: Object = csMobileListLi4.props.children;
        expect(csMobileListLi4Link.type).toEqual("a");
        expect(csMobileListLi4Link.props.href).toEqual(csLi4LinkHref);
        expect(csMobileListLi4Link.props.title).toEqual(csLi4LinkTitle);
        expect(csMobileListLi4Link.props.children).toEqual(csLi4LinkTextContent);

        const siMobile: JSX.Element = mobileInnerContainer.props.children[2];
        expect(siMobile.type).toEqual(Collapsible);
        expect(siMobile.props.title).toEqual("Site Information");

        const siMobileList: Object = siMobile.props.content;
        expect(siMobileList.type).toEqual("ul");

        const siMobileListLi1: Object = siMobileList.props.children[0];
        expect(siMobileListLi1.type).toEqual("li");
        expect(siMobileListLi1.key).toEqual(siLi1Key);

        const siMobileListLi1Link: Object = siMobileListLi1.props.children;
        expect(siMobileListLi1Link.type).toEqual("a");
        expect(siMobileListLi1Link.props.href).toEqual(siLi1LinkHref);
        expect(siMobileListLi1Link.props.title).toEqual(siLi1LinkTitle);
        expect(siMobileListLi1Link.props.children).toEqual(siLi1LinkTextContent);

        const siMobileListLi2: Object = siMobileList.props.children[1];
        expect(siMobileListLi2.type).toEqual("li");
        expect(siMobileListLi2.key).toEqual(siLi2Key);

        const siMobileListLi2Link: Object = siMobileListLi2.props.children;
        expect(siMobileListLi2Link.type).toEqual("a");
        expect(siMobileListLi2Link.props.href).toEqual(siLi2LinkHref);
        expect(siMobileListLi2Link.props.title).toEqual(siLi2LinkTitle);
        expect(siMobileListLi2Link.props.children).toEqual(siLi2LinkTextContent);

        const siMobileListLi3: Object = siMobileList.props.children[2];
        expect(siMobileListLi3.type).toEqual("li");
        expect(siMobileListLi3.key).toEqual(siLi3Key);

        const siMobileListLi3Link: Object = siMobileListLi3.props.children;
        expect(siMobileListLi3Link.type).toEqual("a");
        expect(siMobileListLi3Link.props.href).toEqual(siLi3LinkHref);
        expect(siMobileListLi3Link.props.title).toEqual(siLi3LinkTitle);
        expect(siMobileListLi3Link.props.children).toEqual(siLi3LinkTextContent);

        const vaMobile: JSX.Element = mobileInnerContainer.props.children[3];
        expect(vaMobile.type).toEqual(Collapsible);
        expect(vaMobile.props.title).toEqual("Valore Accounts");

        const vaMobileList: Object = vaMobile.props.content;
        expect(vaMobileList.type).toEqual("ul");

        const vaMobileListLi1: Object = vaMobileList.props.children[0];
        expect(vaMobileListLi1.type).toEqual("li");
        expect(vaMobileListLi1.key).toEqual(vaLi1Key);

        const vaMobileListLi1Link: Object = vaMobileListLi1.props.children;
        expect(vaMobileListLi1Link.type).toEqual("a");
        expect(vaMobileListLi1Link.props.href).toEqual(vaLi1LinkHref);
        expect(vaMobileListLi1Link.props.title).toEqual(vaLi1LinkTitle);
        expect(vaMobileListLi1Link.props.children).toEqual(vaLi1LinkTextContent);

        const vaMobileListLi2: Object = vaMobileList.props.children[1];
        expect(vaMobileListLi2.type).toEqual("li");
        expect(vaMobileListLi2.key).toEqual(vaLi2Key);

        const vaMobileListLi2Link: Object = vaMobileListLi2.props.children;
        expect(vaMobileListLi2Link.type).toEqual("a");
        expect(vaMobileListLi2Link.props.href).toEqual(vaLi2LinkHref);
        expect(vaMobileListLi2Link.props.title).toEqual(vaLi2LinkTitle);
        expect(vaMobileListLi2Link.props.children).toEqual(vaLi2LinkTextContent);

        const vaMobileListLi3: Object = vaMobileList.props.children[2];
        expect(vaMobileListLi3.type).toEqual("li");
        expect(vaMobileListLi3.key).toEqual(vaLi3Key);

        const vaMobileListLi3Link: Object = vaMobileListLi3.props.children;
        expect(vaMobileListLi3Link.type).toEqual("a");
        expect(vaMobileListLi3Link.props.href).toEqual(vaLi3LinkHref);
        expect(vaMobileListLi3Link.props.title).toEqual(vaLi3LinkTitle);
        expect(vaMobileListLi3Link.props.children).toEqual(vaLi3LinkTextContent);

        const vaMobileListLi4: Object = vaMobileList.props.children[3];
        expect(vaMobileListLi4.type).toEqual("li");
        expect(vaMobileListLi4.key).toEqual(vaLi4Key);

        const vaMobileListLi4Link: Object = vaMobileListLi4.props.children;
        expect(vaMobileListLi4Link.type).toEqual("a");
        expect(vaMobileListLi4Link.props.href).toEqual(vaLi4LinkHref);
        expect(vaMobileListLi4Link.props.title).toEqual(vaLi4LinkTitle);
        expect(vaMobileListLi4Link.props.children).toEqual(vaLi4LinkTextContent);

        const bbMobile: JSX.Element = mobileInnerContainer.props.children[4];
        expect(bbMobile.type).toEqual(Collapsible);
        expect(bbMobile.props.title).toEqual("Browse Books");

        const bbMobileList: Object = bbMobile.props.content;
        expect(bbMobileList.type).toEqual("ul");

        const bbMobileListLi1: Object = bbMobileList.props.children[0];
        expect(bbMobileListLi1.type).toEqual("li");
        expect(bbMobileListLi1.key).toEqual(bbLi1Key);

        const bbMobileListLi1Link: Object = bbMobileListLi1.props.children;
        expect(bbMobileListLi1Link.type).toEqual("a");
        expect(bbMobileListLi1Link.props.href).toEqual(bbLi1LinkHref);
        expect(bbMobileListLi1Link.props.title).toEqual(bbLi1LinkTitle);
        expect(bbMobileListLi1Link.props.children).toEqual(bbLi1LinkTextContent);

        const bbMobileListLi2: Object = bbMobileList.props.children[1];
        expect(bbMobileListLi2.type).toEqual("li");
        expect(bbMobileListLi2.key).toEqual(bbLi2Key);

        const bbMobileListLi2Link: Object = bbMobileListLi2.props.children;
        expect(bbMobileListLi2Link.type).toEqual("a");
        expect(bbMobileListLi2Link.props.href).toEqual(bbLi2LinkHref);
        expect(bbMobileListLi2Link.props.title).toEqual(bbLi2LinkTitle);
        expect(bbMobileListLi2Link.props.children).toEqual(bbLi2LinkTextContent);

        const bbMobileListLi3: Object = bbMobileList.props.children[2];
        expect(bbMobileListLi3.type).toEqual("li");
        expect(bbMobileListLi3.key).toEqual(bbLi3Key);

        const bbMobileListLi3Link: Object = bbMobileListLi3.props.children;
        expect(bbMobileListLi3Link.type).toEqual("a");
        expect(bbMobileListLi3Link.props.href).toEqual(bbLi3LinkHref);
        expect(bbMobileListLi3Link.props.title).toEqual(bbLi3LinkTitle);
        expect(bbMobileListLi3Link.props.children).toEqual(bbLi3LinkTextContent);

        const bbMobileListLi4: Object = bbMobileList.props.children[3];
        expect(bbMobileListLi4.type).toEqual("li");
        expect(bbMobileListLi4.key).toEqual(bbLi4Key);

        const bbMobileListLi4Link: Object = bbMobileListLi4.props.children;
        expect(bbMobileListLi4Link.type).toEqual("a");
        expect(bbMobileListLi4Link.props.href).toEqual(bbLi4LinkHref);
        expect(bbMobileListLi4Link.props.title).toEqual(bbLi4LinkTitle);
        expect(bbMobileListLi4Link.props.children).toEqual(bbLi4LinkTextContent);

        const smMobile: JSX.Element = mobileInnerContainer.props.children[5];
        expect(smMobile.type).toEqual("div");
        expect(smMobile.props.className).toEqual("footer-social-media");

        const smMobileList: Object = smMobile.props.children;
        expect(smMobileList.type).toEqual("ul");

        const smMobileListLi1: Object = smMobileList.props.children[0];
        expect(smMobileListLi1.type).toEqual("li");
        expect(smMobileListLi1.key).toEqual(smLi1Key);

        const smMobileListLi1Link: Object = smMobileListLi1.props.children;
        expect(smMobileListLi1Link.type).toEqual("a");
        expect(smMobileListLi1Link.props.href).toEqual(fbLink);
        expect(smMobileListLi1Link.props.children.type).toEqual("i");
        expect(smMobileListLi1Link.props.children.props.className).toEqual(fbIcon);

        const smMobileListLi2: Object = smMobileList.props.children[1];
        expect(smMobileListLi2.type).toEqual("li");
        expect(smMobileListLi2.key).toEqual(smLi2Key);

        const smMobileListLi2Link: Object = smMobileListLi2.props.children;
        expect(smMobileListLi2Link.type).toEqual("a");
        expect(smMobileListLi2Link.props.href).toEqual(twitterLink);
        expect(smMobileListLi2Link.props.children.type).toEqual("i");
        expect(smMobileListLi2Link.props.children.props.className).toEqual(twitterIcon);

        const smMobileListLi3: Object = smMobileList.props.children[2];
        expect(smMobileListLi3.type).toEqual("li");
        expect(smMobileListLi3.key).toEqual(smLi3Key);

        const smMobileListLi3Link: Object = smMobileListLi3.props.children;
        expect(smMobileListLi3Link.type).toEqual("a");
        expect(smMobileListLi3Link.props.href).toEqual(instagramLink);
        expect(smMobileListLi3Link.props.children.type).toEqual("i");
        expect(smMobileListLi3Link.props.children.props.className).toEqual(instagramIcon);

        const smMobileListLi4: Object = smMobileList.props.children[3];
        expect(smMobileListLi4.type).toEqual("li");
        expect(smMobileListLi4.key).toEqual(smLi4Key);

        const smMobileListLi4Link: Object = smMobileListLi4.props.children;
        expect(smMobileListLi4Link.type).toEqual("a");
        expect(smMobileListLi4Link.props.href).toEqual(pinterestLink);
        expect(smMobileListLi4Link.props.children.type).toEqual("i");
        expect(smMobileListLi4Link.props.children.props.className).toEqual(pinterestIcon);

        const disclaimerMobile: JSX.Element = mobileInnerContainer.props.children[6];
        expect(disclaimerMobile.props.children.type).toEqual("div");
        expect(disclaimerMobile.props.children.props.className).toEqual("footer-disclaimer-grp");

        const disclaimerContainerMobile: Object = disclaimerMobile.props.children;
        expect(disclaimerContainerMobile.type).toEqual("div");

        const smFragment: JSX.Element = mobileInnerContainer.props.children[6];

        const footerDisclaimerGrpMobile: JSX.Element = smFragment.props.children;
        expect(footerDisclaimerGrpMobile.type).toEqual("div");
        expect(footerDisclaimerGrpMobile.props.className).toEqual("footer-disclaimer-grp");

        const footerDisclaimerMobile: Object = disclaimerContainerMobile.props.children[0];
        expect(footerDisclaimerMobile.type).toEqual("div");
        expect(footerDisclaimerMobile.props.className).toEqual("footer-disclaimer");

        const footerDisclaimerMobileP1: Object = footerDisclaimerMobile.props.children[0];
        expect(footerDisclaimerMobileP1.type).toEqual("p");
        expect(footerDisclaimerMobileP1.props.children[0]).toEqual("© 2005-");
        expect(footerDisclaimerMobileP1.props.children[1]).toEqual(new Date().getFullYear());
        expect(footerDisclaimerMobileP1.props.children[2]).toEqual(", ");
        expect(footerDisclaimerMobileP1.props.children[3].type).toEqual("a");
        expect(footerDisclaimerMobileP1.props.children[3].props.href).toEqual("/");
        expect(footerDisclaimerMobileP1.props.children[3].props.children).toEqual("ValoreBooks");
        expect(disclaimerPLine1Grp.props.children[4]).toEqual(". All Rights Reserved.");

        const footerDisclaimerMobileP2: Object = footerDisclaimerMobile.props.children[1];
        expect(footerDisclaimerMobileP2.type).toEqual("p");
        expect(footerDisclaimerMobileP2.props.children).toEqual("Designated trademarks and brands are the property of their respective owners.");

        const footerLogosMobile: Object = disclaimerGrp.props.children[1];
        expect(footerLogosMobile.type).toEqual("div");
        expect(footerLogosMobile.props.className).toEqual("footer-logos");

        const nacsLogoMobileLink: Object = footerLogosMobile.props.children[0];
        expect(nacsLogoMobileLink.type).toEqual("a");
        expect(nacsLogoMobileLink.props.href).toEqual(nacsHref);
        expect(nacsLogoMobileLink.props.title).toEqual(nacsLinkTitle);
        expect(nacsLogoMobileLink.props.target).toEqual(nacsLinkTarget);

        const nacsLogoMobile: Object = nacsLogoMobileLink.props.children;
        expect(nacsLogoMobile.type).toEqual("img");
        expect(nacsLogoMobile.props.src).toEqual(nacsLogoSrc);
        expect(nacsLogoMobile.props.alt).toEqual(nacsLogoAlt);

        const bbbLogoMobileLink: Object = footerLogosMobile.props.children[1];
        expect(bbbLogoMobileLink.type).toEqual("a");
        expect(bbbLogoMobileLink.props.id).toEqual(bbb_linkId);
        expect(bbbLogoMobileLink.props.className).toEqual(bbb_linkClassName);
        expect(bbbLogoMobileLink.props.href).toEqual(bbb_linkHref);
        expect(bbbLogoMobileLink.props.title).toEqual(bbb_linkTitle);

        const bbbLogoMobile: Object = bbbLogoMobileLink.props.children;
        expect(bbbLogoMobile.type).toEqual("img");
        expect(bbbLogoMobile.props.src).toEqual(bbb_linkImgSrc);
        expect(bbbLogoMobile.props.alt).toEqual(bbb_LinkImgAlt);
        expect(bbbLogoMobile.props.id).toEqual(bbb_linkImgId);
        expect(bbbLogoMobile.props.width).toEqual(bbb_linkImgWidth);
    });
});