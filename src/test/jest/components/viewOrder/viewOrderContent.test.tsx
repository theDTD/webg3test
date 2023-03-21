import React from "react";
import TestRenderer from "react-test-renderer";
import {configure, shallow} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import ViewOrderContent from "../../../../main/react/components/viewOrder/viewOrderContent";
import fetchMock from "jest-fetch-mock";
import { act } from "react-dom/test-utils";
configure({adapter: new Adapter()});


describe('ViewOrderContent', ()  =>{

    const savedLocation = window.location;

    beforeEach(() => {
        delete window.location;
        window.location = Object.assign(new URL("http://localhost/"), {
            ancestorOrigins: "",
            assign: jest.fn(),
            reload: jest.fn(),
            replace: jest.fn()
        });
    });
    afterEach(() => {
        window.location = savedLocation;
    });

    it("renders correctly", () => {
        const component = shallow(<ViewOrderContent/>);
        const renderedComponent = TestRenderer.create(component);
        const root = renderedComponent.root;

        const container = root.findByType("div");
        expect(container.props.className).toContain("container my-2 view-order-content");

        const mainDivContents = container.props.children;
        expect(mainDivContents.length).toEqual(2);

            const formContainer = mainDivContents[0];
            expect(formContainer.type).toBe('form');

                const formContainerChildren = formContainer.props.children;
                expect(formContainerChildren.length).toEqual(6);

                const header = formContainerChildren[0];
                expect(header.type).toBe('h1');
                expect(header.props.children).toBe('View an order');

                const subHeader = formContainerChildren[1];
                expect(subHeader.type).toBe('p');
                expect(subHeader.props.className).toContain("search-order-header");
                expect(subHeader.props.children).toBe('Search by order to:');

                const list = formContainerChildren[2];
                expect(list.type).toBe('ul');
                expect(list.props.children.length).toEqual(4);

                    const listItems = list.props.children;
                    expect(listItems.length).toEqual(4);

                    expect(listItems[0].type).toBe('li');
                    expect(listItems[0].props.children).toBe('View the status of your order');

                    expect(listItems[1].type).toBe('li');
                    expect(listItems[1].props.children).toBe('Return an item');

                    expect(listItems[2].type).toBe('li');
                    expect(listItems[2].props.children).toBe('Contact a seller');

                    expect(listItems[3].type).toBe('li');
                    expect(listItems[3].props.children).toBe('Extend or purchase your rental');


                const group1 = formContainerChildren[3];
                expect(group1.type).toBe('div');

                    const group1Contents = group1.props.children;
                    expect(group1Contents.length).toBe(3);

                        const label1 = group1Contents[0];
                        expect(label1.type).toBe('label');
                        expect(label1.props.children[0]).toBe('Your order number');

                        const link = label1.props.children[1];
                        expect(link.type).toBe('a');
                        expect(link.props.children).toBe('I don\'t know my order number');

                        const input1 = group1Contents[1];
                        expect(input1.type).toBe('input');

                        const span1 = group1Contents[2];
                        expect(span1.type).toBe('span');

                const group2 = formContainerChildren[4];
                expect(group2.type).toBe('div');

                    const group2Contents = group2.props.children;
                    expect(group2Contents.length).toBe(3);

                        const label2 = group2Contents[0];
                        expect(label2.type).toBe('label');
                        expect(label2.props.children).toBe('Email address or last name used for order');

                        const input2 = group2Contents[1];
                        expect(input2.type).toBe('input');

                        const span2 = group1Contents[2];
                        expect(span2.type).toBe('span');

            const submit = formContainerChildren[5];
            expect(submit.type).toBe('div');

                const submitContents = submit.props.children;

                const btn = submitContents[0];
                expect(btn.type).toBe('button');
                expect(btn.props.children[0]).toBe('View my order ');
                expect(btn.props.children[1].type).toBe('i');

                const span3 = submitContents[1];
                expect(span3.type).toBe('span');

                const ans = submitContents[2];
                expect(ans.type).toBe('p');
                expect(ans.props.children[0]).toBe('For answers to all your frequently asked questions, please visit our ');
                    const anslink = ans.props.children[1];
                    expect(anslink.type).toBe('a');
                    expect(anslink.props.children).toBe('customer service center');
                    expect(anslink.props.href).toBe('https://help.valorebooks.com/');

                expect(ans.props.children[2]).toBe('.');

        const sideInfo = mainDivContents[1];
       expect(sideInfo.type).toBe('div');
    });

    it('test submit - no input',  async () => {
        const mockSubmit = jest.fn();
        const wrapper = shallow(<ViewOrderContent/>);

        const button = wrapper.find('form').simulate('submit', { preventDefault: mockSubmit});

        await act(async () => {
            button.simulate('click');
        });

        expect(mockSubmit).toHaveBeenCalled();
        const errorMessages = wrapper.find('span').getElements();
        expect(errorMessages[0].props.children).toBe('Please provide your order number.');
        expect(errorMessages[1].props.children).toBe('Please enter the email address or last name used for this order.');
        expect(errorMessages[2].props.children).toBe('');

    });

    it('test submit - no order info', async () => {
        fetchMock.mockResponseOnce(JSON.stringify([]));

        const mockSubmit = jest.fn();
        const orderChange =  {
            target: { value: '21114' }
        };

        const emailChange =  {
            target: { value: 'test@valore.com' }
        }
        const wrapper = shallow(<ViewOrderContent/>);

        const inputOrderNumber = wrapper.find('input').at(0);
        const inputEmail = wrapper.find('input').at(1);

        inputOrderNumber.simulate('change', orderChange);
        inputEmail.simulate('change', emailChange);
        const button = wrapper.find('form').simulate('submit', { preventDefault: mockSubmit});


        await act(async () => {
            button.simulate('click');
        });

        const errorMessages = wrapper.find('span').getElements();
        expect(errorMessages[0].props.children).toBe('');
        expect(errorMessages[1].props.children).toBe('');
        expect(errorMessages[2].props.children).toBe('The order number or email address / last name you provided does not match our records. Please try again.');
    });


    it('test submit - fetch error', async () => {
        fetchMock.mockResponseOnce({});

        const mockSubmit = jest.fn();
        const orderChange =  {
            target: { value: '21114' }
        };

        const emailChange =  {
            target: { value: 'test@valore.com' }
        }
        const wrapper = shallow(<ViewOrderContent/>);

        const inputOrderNumber = wrapper.find('input').at(0);
        const inputEmail = wrapper.find('input').at(1);

        inputOrderNumber.simulate('change', orderChange);
        inputEmail.simulate('change', emailChange);
        const button = wrapper.find('form').simulate('submit', { preventDefault: mockSubmit});


        await act(async () => {
            button.simulate('click');
        });


        const errorMessages = wrapper.find('span').getElements();
        expect(errorMessages[0].props.children).toBe('');
        expect(errorMessages[1].props.children).toBe('');
        expect(errorMessages[2].props.children).toBe('The order number or email address / last name you provided does not match our records. Please try again.');

    });


    it('test submit - success', async () => {
         const result = {
            encryptedEmail: 'emailEncrypted',
            orderType: '1'
        }
        fetchMock.mockResponseOnce(JSON.stringify(result));

        const mockSubmit = jest.fn();
        const orderChange =  {
            target: { value: '21114' }
        };

        const emailChange =  {
            target: { value: 'test@valore.com' }
        }

        const wrapper = shallow(<ViewOrderContent/>);

        const inputOrderNumber = wrapper.find('input').at(0);
        const inputEmail = wrapper.find('input').at(1);

        inputOrderNumber.simulate('change', orderChange);
        inputEmail.simulate('change', emailChange);
        const button = wrapper.find('form').simulate('submit', { preventDefault: mockSubmit});

        await act(async () => {
            button.simulate('click');
        });

        expect(window.location).toBe('/CustomerService.OrderTracking.InfoEntry_TrackOrder.do_rewrite?OrderNumber=21114&OrderType=1&OrderInfo=emailEncrypted');

    });



});