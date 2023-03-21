import React, { Component } from 'react';

export default class SeoEditContent extends Component<{ initialData: {} }, { initialState: {} }> {

    constructor(props) {
        super(props);
        this.state = props.initialData

        this.submit = this.submit.bind(this);
        this.removeMeta = this.removeMeta.bind(this);
        this.addMeta = this.addMeta.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.metaChange = this.metaChange.bind(this);
    }

    submit(e) {
        e.preventDefault();

        let data = this.state
        data.meta = this.state.meta.filter(function(item) {
            return item.property && item.content
        });

        fetch("/vb/seo/save", {
            method: 'POST',
            body: JSON.stringify(this.state )
        }).then(response => {
            if(!response.ok) {
                return response.text().then(text => {throw new Error(text)});
            }
            return response.json()
        })
            .then(data => {
                console.log("success");
            })
            .catch(error => console.log(error));
    }

    removeMeta(index: number) {
        let state = this.state;
        state.meta.splice(index, 1);
        this.setState(state);
    }

    addMeta() {
        let state = this.state;
        state.meta.push({property: "", content: ""});
        this.setState(state);
    }

    inputChange(e: Event) {
        let state = this.state;
        const k = e.target.name.split(".");
        let v = e.target.value;
        if (k.length > 1) {
            state[k[0]][k[1]] = v;
        } else {
            state[k[0]] = v;
        }
        this.setState(state);
    }

    metaChange(e: Event) {
        let state = this.state;
        const k = e.target.name.split("-")[0];
        const i = e.target.name.split("-")[1];
        const v = e.target.value;
        state.meta[i][k] = v;
        this.setState(state);
    }

    render() {
        return (
            <div id="content">
                <form onSubmit={this.submit}>
                    <div>
                        <button type="submit">Save Changes</button> <a href={`/vb/seo/index?isbn=${this.state.product?.productCode}`} target="_blank">Preview</a>
                    </div>
                    <div>
                        <label>Page Title</label>
                        <input type="text" name="title" value={this.state.title} onChange={(e)=>this.inputChange(e)} />
                    </div>
                    <div>
                        <label>Page Description</label>
                        <textarea name="description" onChange={(e)=>this.inputChange(e)} value={this.state.description} />
                    </div>
                    <hr />
                    <h3>Product Info</h3>
                    <div>
                        <label>Book Title</label>
                        <input type="text" name="product.name" value={this.state.product?.name} onChange={(e)=>this.inputChange(e)} />
                    </div>
                    <div>
                        <label>Author</label>
                        <input type="text" name="product.author" value={this.state.product?.author} onChange={(e)=>this.inputChange(e)} />
                    </div>
                    <div>
                        <label>Description</label>
                        <input type="text" name="product.description" value={this.state.product?.description} onChange={(e)=>this.inputChange(e)} />
                    </div>
                    <div>
                        <label>Edition</label>
                        <input type="text" name="product.edition" value={this.state.product?.edition} onChange={(e)=>this.inputChange(e)} />
                    </div>
                    <div>
                        <label>Image URL</label>
                        <input type="text" name="product.image" value={this.state.product?.image} onChange={(e)=>this.inputChange(e)} />
                    </div>
                    <div>
                        <label>ISBN</label>
                        <input type="text" name="product.productCode" value={this.state.product?.productCode} onChange={(e)=>this.inputChange(e)} />
                    </div>
                    <div>
                        <label>Price</label>
                        <input type="text" name="product.price" value={this.state.product?.price} onChange={(e)=>this.inputChange(e)} />
                    </div>
                    <div>
                        <label>Quantity</label>
                        <input type="text" name="product.quantity" value={this.state.product?.quantity} onChange={(e)=>this.inputChange(e)} />
                    </div>
                    <div>
                        <label>Type (<i>New | Used | Rental | Alternate</i>)</label>
                        <input type="text" name="product.type" value={this.state.product?.type} onChange={(e)=>this.inputChange(e)} />
                    </div>
                    <div>
                        <label>Product URL</label>
                        <input type="text" name="product.url" value={this.state.product?.url} onChange={(e)=>this.inputChange(e)} />
                    </div>
                    <hr />
                    <h3>Meta</h3>
                    { this.state.meta?.map((object, i) =>
                        <div key={i}>
                            <input type="text" name={`property-${i}`} placeholder="property name" value={object.property} onChange={(e)=>this.metaChange(e)} />
                            <input type="text" name={`content-${i}`} placeholder="content" value={object.content} onChange={(e)=>this.metaChange(e)} />
                            <button type="button" className="btn-removeMeta" onClick={()=>this.removeMeta(i)}>remove</button>
                        </div>
                    )}
                    <button type="button" className="btn-addMeta" onClick={()=>this.addMeta()}>Add</button>
                </form>
            </div>
        )
    }

}