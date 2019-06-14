import React, { useState } from "react";
import styled from "styled-components";
import Suggestion from "./Suggestion";

const Wrapper = styled.span`
  position: relative;
  display: ${({ hasResults }) => (hasResults ? "flex" : "none")};
  z-index: 9999;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-color: #979797;
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
  getMouseInSuggestions
}) => {
  const [mouseInSuggestions, setMouseInSuggestions] = useState(false);

  const handleMouseEnter = () => {
    console.log("mouseEntered");
    setMouseInSuggestions(true);
    getMouseInSuggestions(true);
  };

  const handleMouseLeave = () => {
    console.log("mouseLeft");
    setMouseInSuggestions(false);
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
            mouseInSuggestions={mouseInSuggestions}
            idx={idx}
            cursorIdx={cursorIdx}
            clickHandler={clickHandler}
            key={place.id}
            {...place}
          />
        ))}
      </SuggestionsList>
    </Wrapper>
  );
};

export default Suggestions;
