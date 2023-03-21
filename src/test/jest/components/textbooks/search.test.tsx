import React from "react";
import Search from "../../../../main/react/components/textbooks/search";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {render, screen, fireEvent, within} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import fetchMock from "jest-fetch-mock";

import { act } from "react-dom/test-utils";


configure({ adapter: new Adapter() });

const results = {
    "query": "biology",
    "suggestions": [
        {
            "contributor": "Michael Windelspecht",
            "product_type": "book",
            "image_link": "https://img.valorebooks.com/H90/97/9780/978007/1.jpg",
            "product_id": 32465706,
            "isbn": "0073525480",
            "item_link": "https://www.valorebooks.com/search/suggest/1",
            "sellback_link": "https://www.valorebooks.com/SellBack.AddItem_AddItem.do?query=1#AddRemoveDestAnchor",
            "product_code": "1",
            "product_name": "Biology 1"
        },
        {
            "contributor": "Sylvia Mader",
            "product_type": "book",
            "image_link": "https://img.valorebooks.com/H90/97/9780/978007/2.jpg",
            "product_id": 32465706,
            "isbn": "0073525480",
            "item_link": "https://www.valorebooks.com/search/suggest/2",
            "sellback_link": "https://www.valorebooks.com/SellBack.AddItem_AddItem.do?query=9780073525488#2",
            "product_code": "2",
            "product_name": "Biology 2"
        }
    ]
};
describe("Search", () => {

    it('should render properly on load', async () => {
         const { queryByTestId  } = renderSearchForm();
         const searchForm = await queryByTestId ("search-form");
         const searchInput = await queryByTestId ("search-input");
         const searchButton = await queryByTestId ("search-submit");
         const searchTypeInput = await queryByTestId ("search-type");
         const searchOptionInput = await queryByTestId ("search-option");
         const searchDeptInput = await queryByTestId ("search-dept");
         const searchSuggestionsContainer = await queryByTestId("search-suggestions-container");

         expect(searchForm).toBeTruthy();
         expect(searchInput).toBeTruthy();
         expect(searchButton).toBeTruthy();
         expect(searchTypeInput).toBeTruthy();
         expect(searchOptionInput).toBeTruthy();
         expect(searchDeptInput).toBeTruthy();
         expect(searchSuggestionsContainer).toBeNull();
     });

    it('submits search - handle no result', async () => {
        fetchMock.mockResponseOnce(JSON.stringify([]));
        const onSubmit = jest.fn();
        const handleNoResult = jest.fn();
        const { findByTestId } = render(<Search placeholder={"search"} handleNoResults={handleNoResult} toggleErrorMessage={jest.fn()}/>);
        const searchInput = await findByTestId("search-input");
        const searchForm = await findByTestId("search-form");

        searchForm.onsubmit = onSubmit;

        userEvent.type(searchInput, 'biology');
        fireEvent.submit(searchInput);

        const searchSuggestionContainer = await findByTestId("search-suggestions-container");
        expect(searchSuggestionContainer).toBeTruthy();
        const list = screen.getByRole("list");
        expect(list).toBeTruthy();
        expect(screen.queryAllByRole("listitem")[0]).toBeUndefined();
    });

    it('submits search - throw error', async () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation();
        fetchMock.mockRejectedValue(new Error('error'));
        const onSubmit = jest.fn();
        const handleNoResult = jest.fn();
        const { findByTestId } = render(<Search placeholder={"search"} handleNoResults={handleNoResult} toggleErrorMessage={jest.fn()}/>);
        const searchInput = await findByTestId("search-input");
        const searchForm = await findByTestId("search-form");

        searchForm.onsubmit = onSubmit;

        userEvent.type(searchInput, 'biology');
        fireEvent.submit(searchInput);

        const searchSuggestionContainer = await findByTestId("search-suggestions-container");
        expect(searchSuggestionContainer).toBeTruthy();
        const list = screen.getByRole("list");
        expect(list).toBeTruthy();
        expect(screen.queryAllByRole("listitem")[0]).toBeUndefined();

        expect(consoleSpy).toHaveBeenCalled();

        await act(async () => {
            searchInput.focus();
            fireEvent.keyDown(searchInput, {
                key: "Tab",
                code: "Tab",
                keyCode: 9,
                charCode: 9
            });
        });

        expect(screen.queryByTestId("search-suggestions-container")).toBeNull();
    });

    it('submits search - has result and arrow up/down', async () => {
        jest.useFakeTimers();
        fetchMock.mockResponseOnce(JSON.stringify(results));
        const onSubmit = jest.fn();
        const handleNoResult = jest.fn();

        act(() => {
            render(<Search placeholder={"search"} handleNoResults={handleNoResult} toggleErrorMessage={jest.fn()}/>);
        });

        const searchInput = screen.getByTestId("search-input");
        const searchForm =  screen.getByTestId("search-form");

        searchForm.onsubmit = onSubmit;

        expect(searchInput).toBeTruthy();

        act(() => {
            searchInput.focus();
            fireEvent.change(searchInput, { target: { value: 'biology' } });
            fireEvent.keyDown(searchInput, {
                key: "Enter",
                code: "Enter",
                keyCode: 13,
                charCode: 13
            });
        });

        await act(async () => {
            jest.advanceTimersByTime(1000);
        });

        const searchSuggestionContainer = screen.getByTestId("search-suggestions-container");
        expect(searchSuggestionContainer).toBeTruthy();
        const list = screen.getByRole("list");
        expect(list).toBeTruthy();
        const { getAllByRole } = within(list);
        const items = getAllByRole("listitem");
        expect(items.length).toBe(2);

        await act(async () => {
            jest.advanceTimersByTime(1000);
        });

       await act(async () => {
            searchInput.focus();
            fireEvent.keyDown(searchInput, {
                key: "ArrowDown",
                code: "ArrowDown",
                keyCode: 40,
                charCode: 40
            });
        });

        expect(screen.queryByTestId("search-suggestions-container")).toBeTruthy();
        expect(screen.queryAllByRole("listitem")[0].getAttribute('class')).toBe('active');
        expect(screen.queryAllByRole("listitem")[1].getAttribute('class')).toBe('');

        await act(async () => {
            searchInput.focus();
            fireEvent.keyDown(searchInput, {
                key: "ArrowDown",
                code: "ArrowDown",
                keyCode: 40,
                charCode: 40
            });
        });

        expect(screen.queryAllByRole("listitem")[0].getAttribute('class')).toBe('');
        expect(screen.queryAllByRole("listitem")[1].getAttribute('class')).toBe('active');

         await act(async () => {
               searchInput.focus();
               fireEvent.keyDown(searchInput, {
                   key: "ArrowUp",
                   code: "ArrowUp",
                   keyCode: 38,
                   charCode: 38
               });
           });

           expect(screen.queryAllByRole("listitem")[0].getAttribute('class')).toBe('active');
           expect(screen.queryAllByRole("listitem")[1].getAttribute('class')).toBe('');

        await act(async () => {
            searchInput.focus();
            fireEvent.keyDown(searchInput, {
                key: "Escape",
                code: "Escape",
                keyCode: 27,
                charCode: 27
            });
        });

        expect(screen.queryByTestId("search-suggestions-container")).toBeNull();
    });


    it('submits search - less than 3 search character ', async () => {
        jest.useFakeTimers();
        fetchMock.mockResponseOnce(JSON.stringify(results));
        const onSubmit = jest.fn();
        const handleNoResult = jest.fn();

        act(() => {
            render(<Search placeholder={"search"} handleNoResults={handleNoResult} toggleErrorMessage={jest.fn()}/>);
        });

        const searchInput = screen.getByTestId("search-input");
        const searchForm =  screen.getByTestId("search-form");

        searchForm.onsubmit = onSubmit;

        expect(searchInput).toBeTruthy();

        act(() => {
            searchInput.focus();
            fireEvent.change(searchInput, { target: { value: 'bi' } });
        });

        await act(async () => {
            jest.advanceTimersByTime(1000);
        });

        act(() => {
            fireEvent.keyDown(searchInput, {
                key: "Enter",
                code: "Enter",
                keyCode: 13,
                charCode: 13
            });

        });
        expect(screen.queryByTestId("search-suggestions-container")).toBeNull();

    });


    it('submits search - more than 3 search character ', async () => {
        jest.useFakeTimers();
        fetchMock.mockResponseOnce(JSON.stringify(results));
        const onSubmit = jest.fn();
        const handleNoResult = jest.fn();

        act(() => {
            render(<Search placeholder={"search"} handleNoResults={handleNoResult} toggleErrorMessage={jest.fn()}/>);
        });

        const searchInput = screen.getByTestId("search-input");
        const searchForm =  screen.getByTestId("search-form");

        searchForm.onsubmit = onSubmit;

        expect(searchInput).toBeTruthy();

        act(() => {
            searchInput.focus();
            fireEvent.change(searchInput, { target: { value: 'biology' } });
        });

        await act(async () => {
            jest.advanceTimersByTime(1000);
        });

        act(() => {
            fireEvent.keyDown(searchInput, {
                key: "Enter",
                code: "Enter",
                keyCode: 13,
                charCode: 13
            });

        });

        await act(async () => {
            jest.advanceTimersByTime(1000);
        });

        expect(screen.queryByTestId("search-suggestions-container")).toBeTruthy();

    });

});

function renderSearchForm() {
    return render(<Search placeholder={"search"} handleNoResults={jest.fn()} toggleErrorMessage={jest.fn()}/>);
}