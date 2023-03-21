
import React from "react";
import {configure, shallow} from "enzyme";
import SeoEditContent from "../../../../main/react/components/seoTest/editContent";
import {act} from "react-dom/test-utils";
import Adapter from "enzyme-adapter-react-16";

const initialData = {
    title: "title",
    description: "description",
    product: {productCode: "123"},
    meta: []
}

configure({adapter: new Adapter()});

describe("editContent", ()=> {
    const flushAllPromises = () => new Promise((resolve) => setImmediate(resolve));
    const submitMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("test add/remove meta", async ()=> {
        // const wrapper = shallow(<SeoEditContent initialData={initialData} />);
        //
        // const meta = wrapper.find({name: "property-0"});
        // expect(meta.length).toEqual(0);
        //
        // const add = wrapper.find(".btn-addMeta");
        // await act(async ()=> {
        //     add.simulate("click");
        // });
        //
        // const added = wrapper.find({name: "property-0"});
        // expect(added.length).toEqual(1);
        //
        // const remove = wrapper.find(".btn-removeMeta");
        // await act(async ()=> {
        //     remove.simulate("click");
        // });
        //
        // const removed = wrapper.find({name: "property-0"});
        // expect(removed.length).toEqual(0);
    });

    // it("test inputChange", async ()=>{
    //     const wrapper = shallow(<SeoEditContent initialData={initialData} />);
    //     const expected = "new value";
    //
    //     const names = ["title", "product.name", "product.author", "product.description", "product.edition", "product.image", "product.productCode", "product.price", "product.quantity", "product.type", "product.url"];
    //
    //     names.forEach( name => {
    //         const input = wrapper.find({name: name});
    //         input.simulate("change", {target: {name: name, value: expected}});
    //         if (name.split(".").length == 1) {
    //             expect(initialData[name]).toBe(expected);
    //         } else {
    //             const k = name.split(".")[1];
    //             expect(initialData.product[k]).toBe(expected);
    //         }
    //     })
    // });
    //
    //
    // it("test metaChange", async ()=> {
    //     const wrapper = shallow(<SeoEditContent initialData={initialData} />);
    //
    //     const add = wrapper.find(".btn-addMeta");
    //     await act(async ()=> {
    //         add.simulate("click");
    //     });
    //
    //     const metaProperty = wrapper.find({name: "property-0"});
    //     const metaContent = wrapper.find({name: "content-0"});
    //     await act(async ()=> {
    //         metaProperty.simulate("change", {target: {name: "property-0", value: "og:title"}});
    //         metaContent.simulate("change", {target: {name: "content-0", value: "meta title"}});
    //     });
    //
    //     const expected = {property: "og:title", content: "meta title"};
    //     expect(initialData.meta.length).toEqual(1);
    //     expect(initialData.meta[0].property).toContain(expected.property);
    //     expect(initialData.meta[0].content).toContain(expected.content);
    // });
    //
    // it("test submit", async ()=> {
    //     fetch.mockResponseOnce(JSON.stringify({}), {status: 200});
    //
    //     const wrapper = shallow(<SeoEditContent initialData={initialData} />);
    //     await wrapper.find('form').simulate('submit', {preventDefault: submitMock});
    //
    //     expect(submitMock).toHaveBeenCalled();
    //     await flushAllPromises();
    //     expect(fetch.mock.calls.length).toEqual(1);
    //     expect(fetch.mock.calls[0][0]).toEqual("/vb/seo/save");
    // });
    //
    // it("test submit -- error", async ()=> {
    //     fetch.mockResponseOnce(JSON.stringify({}), {status: 400});
    //
    //     const wrapper = shallow(<SeoEditContent initialData={initialData} />);
    //     await wrapper.find('form').simulate('submit', {preventDefault: submitMock});
    //
    //     expect(submitMock).toHaveBeenCalled();
    //     await flushAllPromises();
    //     expect(fetch.mock.calls.length).toEqual(1);
    //     expect(fetch.mock.calls[0][0]).toEqual("/vb/seo/save");
    // });
})