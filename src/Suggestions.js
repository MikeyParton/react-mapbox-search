import React from 'react'
import styled from 'styled-components'
import Suggestion from './Suggestion'

const SuggestionsBox = styled.span`
  position: relative;
  display: ${({hasResults}) => hasResults ? 'flex' : 'none'};
  z-index: 9999;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-color: #979797;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
`

const SuggestionsList = styled.div`
  padding-top: 10px;
  width: 100%;
`

export default ({places, hasResults}) => (
  <SuggestionsBox hasResults={hasResults}>
    <SuggestionsList>
      {
        places.map(place => {
          return <Suggestion key={place.id} {...place} />
        })
      }
    </SuggestionsList>
  </SuggestionsBox>
)
