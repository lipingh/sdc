import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const SearchQuestions = ({ handleSearch }) => (
  <>
    <form>
      <input
        className="search-bar"
        type="text"
        onChange={(e) => { handleSearch(e); }}
        placeholder="Have a Question? Search for Answers ..."
      />
      <FontAwesomeIcon icon={faSearch} />
    </form>
  </>
);

export default SearchQuestions;
