import React from 'react'
import styled from 'styled-components'

const SuggestionWrapper = styled.div`
  font-size: 18px;
  padding: 1rem 1.5rem 1rem 1.5rem;
  cursor: pointer;
  width: 100%;

  &:hover {
    color: white;
    background-color: #58a;
  }
`

export default ({place_name}) => (
  <SuggestionWrapper>{place_name}</SuggestionWrapper>
)
