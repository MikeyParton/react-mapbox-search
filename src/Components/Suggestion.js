import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  font-size: 14px;
  padding: 1rem 1.5rem 1rem 1.5rem;
  cursor: pointer;
  width: 100%;

  &:hover {
    color: white;
    background-color: ${props => props.selectColor};
  }
`;

const Suggestion = ({
  place,
  clickHandler,
  cursorIdx,
  idx,
  selectColor,
  mouseInSuggestions,
  isTouch
}) => {
  return (
    <Wrapper
      selectColor={selectColor}
      style={
        cursorIdx === idx && !mouseInSuggestions && !isTouch
          ? { color: "white", background: selectColor }
          : null
      }
      onMouseDown={event => clickHandler({ location: place, event })}
    >
      {place.place_name}
    </Wrapper>
  );
};

export default Suggestion;
