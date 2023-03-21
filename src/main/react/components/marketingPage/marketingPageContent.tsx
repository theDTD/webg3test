import React, { Component } from 'react';

interface ComponentProps {
    path: string
}
interface ComponentState {
    content: string
}

export default class MarketingPageContent extends Component<ComponentProps, ComponentState> {

    constructor(props: ComponentProps) {
        super(props);
        this.state = {
            content: ''
        }
    }

    componentWillMount() {
        fetch(this.props.path)
            .then((response) => { return response.text() })
            .then((html) => {
                let parser = new DOMParser();
                let doc = parser.parseFromString(html, 'text/html');
                let body = doc.documentElement.children[1].innerHTML
                this.setState({ content: body })
            })
            .catch(e => {
                console.error(e)
            });
    }

    render() {
        return (
            <div>
                <div id="marketingPage" dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
            </div>
        );
    }
}

