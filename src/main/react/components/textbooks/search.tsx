import React, {useState, useEffect, useRef, FormEvent} from "react";
import SearchSuggestions from "./searchSuggestions";
import parse from "html-react-parser";

interface SearchProps {
    placeholder: string;
    handleNoResults(query: string): void;
    toggleErrorMessage?: (value: boolean)=>void;
}

const defaultProps = {
    placeholder: "Search millions of products!"
}

const Search = ({ placeholder, handleNoResults, toggleErrorMessage }: SearchProps & typeof defaultProps) => {
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [cursor, setCursor]: [number|undefined, (c: number)=>void] = useState();

    const productSearchPath = "/vb/productSearch/search";
    const productSubmitPath = "/Search.DefineSearch.do";

    const formRef: React.RefObject<HTMLFormElement> = useRef(null);
    const inputRef: React.RefObject<HTMLInputElement>  = useRef(null);
    const btnRef: React.RefObject<HTMLButtonElement>  = useRef(null);
    const containerRef: React.RefObject<HTMLDivElement>  = useRef(null);
    const titleRef: React.RefObject<HTMLDivElement>  = useRef(null);
    const itemRef: React.RefObject<HTMLLIElement>  = useRef(null);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
    }

    const highlight = (query: string, title: string) => {
        const regEscape = new RegExp(
            '(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'].join('|\\') + ')',
            'g'
        );
        const pattern = query.replace(regEscape, '\\$1');

        const html = title.replace(
            new RegExp(pattern, 'gi'),
            '<strong>$&</strong>'
        );
        return parse(html);
    }

    const handleClickOutside = (e: React.MouseEvent): void => {
        if (containerRef.current && searchValue.length > 3) {
            setShowResults(formRef.current.contains(e.target) || containerRef.current.contains(e.target));
        } else if (formRef.current && formRef.current.contains(e.target) && searchResults.length > 0) {
            setShowResults(true);
        }
    }

    const handleKeyDown = (e: KeyboardEvent): void => {
        if (e.key === 'ArrowUp' && showResults) {
            let cursorValue: number = cursor || searchResults.length
            setCursor(cursorValue-1);
        }
        else if (e.key === 'ArrowDown' && showResults) {
            setCursor(cursor! < searchResults.length - 1 ? cursor! + 1 : 0);
        }
        else if (e.key === 'Escape' && showResults) {
            setShowResults(false);
            setCursor();
        }
        else if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e);
        }
        else if (e.key === 'Tab') {
            if (titleRef.current) {
                setSearchValue(titleRef.current.textContent!);
            }
            setShowResults(false);
        }
    }

    const handleSubmit = (e: FormEvent | KeyboardEvent) => {
        e.preventDefault();
        if (searchValue.length > 0) {
            fetch(`${productSearchPath}?query=${searchValue}`,{method: 'GET'})
                .then(response => response.json())
                .then(data => {
                    if (data.suggestions && data.suggestions.length > 0) {
                        formRef.current!.submit();
                    } else {
                        handleNoResults(searchValue);
                    }
                })
                .catch(error => console.log(error));
        }
    }

    useEffect(() => {
        if (titleRef.current && searchValue == titleRef.current.textContent) {
            setShowResults(false);
            setCursor();
            setSearchResults([]);
        } else {
          const timerId = setTimeout(() => {

                if (searchValue.length > 3) {
                    fetch(`${productSearchPath}?query=${searchValue}`,
                        {
                            method: 'GET'
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.suggestions) {
                                setSearchResults(data.suggestions);
                                setShowResults(true);
                                setCursor();
                            }
                        })
                        .catch(error => console.log(error));
                } else {
                   setShowResults(false);
                   setSearchResults([]);
                }
            }, 275);

          return () => clearTimeout(timerId);
        }

    }, [searchValue, titleRef]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [searchValue, searchResults, cursor, titleRef, formRef, inputRef, containerRef]);

    useEffect(() =>{
        if (inputRef.current != undefined) {
            inputRef.current.addEventListener("keydown", handleKeyDown);
            inputRef.current.addEventListener("focus", () => {
                setShowResults(!!searchResults);
            });
        }
        return () => {
            inputRef!.current!.removeEventListener("keydown", handleKeyDown);
            formRef!.current!.removeEventListener("keydown", handleSubmit);
        }
    });

    useEffect(() => {
        if (toggleErrorMessage) {
            toggleErrorMessage(showResults);
        }
    }, [showResults]);

    return (
        <>
            <form
                data-testid="search-form"
                action={productSubmitPath}
                method="post"
                onSubmit={handleSubmit}
                ref={formRef}
                id="HeaderSearchForm"
                className="search-box d-flex justify-content-between align-items-center"
            >
                <input
                    type="text"
                    className="form-control search-input"
                    value={searchValue}
                    onChange={handleChange}
                    id="search_input"
                    name="text"
                    placeholder={placeholder || defaultProps.placeholder}
                    ref={inputRef}
                    autoComplete="off"
                    data-testid="search-input"
                />
                <div className="search-btn pr-3">
                    <button
                        ref={btnRef}
                        type="submit"
                        className="search-btn px-3"
                        title="Search"
                        aria-label="Search"
                        data-testid="search-submit"
                    >
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                <input type="hidden" key="" value="header" name="search_type"  data-testid="search-type"/>
                <input name="header_search_option" value="keyword" type="hidden" data-testid="search-option"/>
                <input name="department" id="header_search_dept" value="All Departments" type="hidden" data-testid="search-dept"/>
            </form>
            {
                searchResults && showResults &&
                <div className="suggestions-list-wrapper" ref={containerRef}  data-testid="search-suggestions-container">

                    <ul>
                        {
                            searchResults.map((item, i) => (
                                <SearchSuggestions
                                    key={i}
                                    index={i}
                                    item={item}
                                    cursor={cursor!}
                                    searchValue={searchValue}
                                    itemRef={itemRef}
                                    titleRef={titleRef}
                                    highlight={highlight}
                                    data-testid="search-suggestions"
                                />
                            ))
                        }
                    </ul>
                </div>
            }
        </>
    )
}

export default Search;