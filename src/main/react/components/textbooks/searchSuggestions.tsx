import React, {ReactNode} from "react";

interface ItemProps {
    item_link: string;
    image_link: string;
    product_name: string;
    contributor: string;
    product_type: string;
    product_code: string;
}


interface SearchSuggestionsProps {
    item: ItemProps;
    index: number;
    cursor: number;
    searchValue: string;
    highlight: (query: string, title: string)=>ReactNode;
    itemRef: React.RefObject<HTMLLIElement>;
    titleRef: React.RefObject<HTMLDivElement>;
}


const SearchSuggestions = (props: SearchSuggestionsProps) => {
    const { item, index, cursor, searchValue, highlight, itemRef, titleRef }: SearchSuggestionsProps = props;

    return (
        <li key={index} className={cursor === index ? 'active' : ''} ref={cursor === index ? itemRef : null}>
            <a href={item.item_link} className="grid-container">
                <div className="img-container">
                    <img src={item.image_link} alt={item.product_name}/>
                </div>
                <div className="book-details">
                    <div className="title" ref={cursor === index ? titleRef : null}>{highlight(searchValue, item.product_name)}</div>
                    {
                        item.contributor &&
                        <p className="author">{item.contributor}</p>
                    }
                    {
                        item.product_type === 'book' ?
                            <p>ISBN: {item.product_code}</p>
                            :
                            <p>UPC: {item.product_code}</p>
                    }
                </div>
            </a>
        </li>
    )
}

export default SearchSuggestions;