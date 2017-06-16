import React from 'react'
import styled from 'styled-components'
import FaSearch from 'react-icons/lib/fa/search'

const SearchInputWrapper = styled.div`
  width: 100%;
  height: 100%;
`

const SearchInput = styled.input`
  height: 100%;
  width: 100%;
  text-indent: 40px;
  font-size: 15px;
  border: 1px solid #979797;
  border-radius: 3px;
  ${props => props.hasResults && 'border-bottom-left-radius: 0;'}
  ${props => props.hasResults && 'border-bottom-right-radius: 0;'}
`

export default ({query, handleInputChange, hasResults}) => (
  <SearchInputWrapper>
    <FaSearch />
    <SearchInput
      hasResults={hasResults}
      placeholder='Search'
      value={query}
      onChange={handleInputChange}
    />
  </SearchInputWrapper>
)
