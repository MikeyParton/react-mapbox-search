import React from "react";
import styled from "styled-components";
import Suggestion from "./Suggestion";

const Wrapper = styled.span`
  position: relative;
  display: ${({ hasResults }) => (hasResults ? "flex" : "none")};
  z-index: 9999;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-color: #d3d3d3;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
`;

const SuggestionsList = styled.div`
  width: 100%;
`;

const Suggestions = ({
  places,
  hasResults,
  clickHandler,
  cursorIdx,
  mouseInSuggestions,
  getMouseInSuggestions,
  selectColor
}) => {
  const handleMouseEnter = () => {
    getMouseInSuggestions(true);
  };

  const handleMouseLeave = () => {
    getMouseInSuggestions(false);
  };

  return (
    <Wrapper hasResults={hasResults}>
      <SuggestionsList
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {places.map((place, idx) => (
          <Suggestion
            selectColor={selectColor}
            mouseInSuggestions={mouseInSuggestions}
            idx={idx}
            cursorIdx={cursorIdx}
            clickHandler={clickHandler}
            key={place.id}
            place={place}
          />
        ))}
      </SuggestionsList>
    </Wrapper>
  );
};

export default Suggestions;
