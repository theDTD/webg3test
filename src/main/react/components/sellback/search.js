import React from 'react';
import { Container } from '@follett/common-ui';
import { SearchBar } from './searchBar';
import PropTypes from 'prop-types';

export const Search = (props) => (
    <Container className={`${props.containerClassName}`}>
        {(props.imagePlacement === 'left' || props.imagePlacement === 'top') &&
            <div class="search-image"><img src={props.image}/></div>
        }
        <SearchBar containerClassName="search-bar-container" isbnChangeFunc={props.isbnChangeFunc} searchFunc={props.searchFunc} searchedIsbn={props.searchedIsbn} disableButton={props.disableButton}/>
        {(props.imagePlacement === 'right' || props.imagePlacement === 'bottom') &&
            <div class="search-image"><img src={props.image}/></div>
        }
    </Container>
);

PropTypes.Search = {
    containerClassName: PropTypes.string.isRequired,
    imagePlacement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    image: PropTypes.string,
    searchedIsbn: PropTypes.string,
    isbnChangeFunc: PropTypes.func.isRequired,
    searchFunc: PropTypes.func.isRequired,
    disableButton: PropTypes.bool.isRequired
};