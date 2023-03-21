import React, {Component, RefObject} from 'react';
import Search from "./search";
import ISBNToolTip from "./ISBNToolTip";

type MainSearchBarProps = {
    showError: boolean;
    backgroundImage?: string;
    sideImage?: string;
    mainHeaderText: string;
    subHeaderText: string;
    contentAlignment?: 'center' | 'left' | 'right';
    searchStyleClassName?: string;
    isbnLinkClassName?: string;
    handleNoResults(query: string): void;
    searchSubText?: string;
    searchValue: string;
    searchErrorClassName: 'rb-no-results-error' | 'no-results-error';
} & Partial<DefaultProps>

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps = {
    align: 'center',
    backgroundImage: '',
    mainHeaderText: '',
    searchSubText: '',
    searchValue: '',
    sideImage: '',
    subHeaderText: '',
    searchStyleClassName: '',
    searchErrorClassName: 'no-results-error'
}

interface MainSearchBarState {
    searchValue: string;
}

export default class MainSearchBar extends Component<MainSearchBarProps, MainSearchBarState> {
    errorRef: RefObject<HTMLParagraphElement>
    mainRef: RefObject<HTMLDivElement>

    constructor(props: MainSearchBarProps) {
        super(props);
        this.state = {
            searchValue: this.props.searchValue
        };
        this.errorRef = React.createRef();
        this.mainRef = React.createRef();
        this.updateHeight = this.updateHeight.bind(this);
        this.toggleErrorMessage = this.toggleErrorMessage.bind(this);
    }

    updateHeight() {
        const mainNode = this.mainRef.current!;
        const errNode = this.errorRef.current!;
        const height = this.errorRef.current!.clientHeight;
        const tabletMql = window.matchMedia('(min-width:426px) and (max-width: 991px)');

        if (errNode && this.props.showError) {
            if (tabletMql.matches) {
                mainNode.style.paddingBottom = `${height}px`;
            } else {
                mainNode.style.paddingBottom = `${height + 44}px`;
            }
        }
    }

    toggleErrorMessage(value: boolean) {
        const errNode = this.errorRef.current;
        if (errNode) {
            errNode.style.visibility = this.props.showError && !value ? 'initial' : 'hidden';
        }
    }

    componentDidUpdate(prevProps: MainSearchBarProps, prevState: MainSearchBarState) {
        const mainNode = this.mainRef.current!;
        const errNode = this.errorRef.current!;
        const height = this.errorRef.current!.clientHeight;
        const tabletMql = window.matchMedia('(min-width:426px) and (max-width: 991px)');

        if (errNode && this.props.showError) {
            if (tabletMql.matches) {
                mainNode.style.paddingBottom = `${height}px`;

            } else {
                mainNode.style.paddingBottom = `${height + 44}px`;
                window.addEventListener("resize", this.updateHeight);
            }
        }

        if (this.state.searchValue !== this.props.searchValue) {
            this.setState({
                searchValue: this.props.searchValue
            });
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateHeight);
    }

    render() {
        let imageBg = {
            backgroundImage: 'url('+this.props.backgroundImage+')',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }

        return (
            <div key={"mainSearchBar-"+new Date().getTime()} className="mainSearchBar container-fluid" style={this.props.backgroundImage ? imageBg : {} }
                 ref={this.mainRef}>
                <div className="container d-flex justify-content-center">
                    <div className="row pt-md-5 pt-sm-2 col-lg-12">
                        <div className={(this.props.sideImage ? 'col-md-12 col-lg-6' : 'col-md-12 col-lg-12 mt-5') + ' d-flex flex-column main-text-align-' +  (this.props.contentAlignment ? this.props.contentAlignment : 'center')}>
                            <h1 className="defaultHeading1">{this.props.mainHeaderText}</h1>
                            <span className="sub-heading mb-1">{this.props.subHeaderText}</span>
                        </div>
                        {

                            this.props.sideImage ?
                                <div className="col-md-12 col-lg-6">
                                    <img className="img-fluid mx-auto d-block" src={this.props.sideImage} alt="textbooks"/>
                                </div> :
                                null
                        }
                    </div>
                </div>
                <div className={'container d-flex search-' +  (this.props?.contentAlignment ? this.props!.contentAlignment : 'center')}>
                    <div className="search-row">
                        <div className={'position-relative z-index-1 main-search-container d-flex flex-column justify-content-start ' + (this.props.sideImage ? 'margin-top-search ' : '') + this.props.searchStyleClassName + ' ' + this.props.isbnLinkClassName}>
                            <Search placeholder="Enter ISBN, Title or Author" handleNoResults={this.props.handleNoResults} toggleErrorMessage={this.toggleErrorMessage}/>
                            <ISBNToolTip />
                        </div>
                        {
                            this.props.searchSubText &&  <div className="search-subtext">
                                {this.props.searchSubText}
                            </div>
                        }
                        {
                            this.props.showError &&
                            <p className={this.props.searchErrorClassName + " errorP"} ref={this.errorRef}>{`No results match your search for "${this.state.searchValue}": Please try again and make sure that the information you are searching for is spelled correctly. If you are searching by ISBN please make sure the number is entered correctly.`}</p>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
