import React from "react";
import styled from "styled-components";

const Suggestion = ({
  place_name,
  clickHandler,
  cursorIdx,
  idx,
  selectColor,
  mouseInSuggestions
}) => {
  const Wrapper = styled.div`
    font-size: 14px;
    padding: 1rem 1.5rem 1rem 1.5rem;
    cursor: pointer;
    width: 100%;

    &:hover {
      color: white;
      background-color: ${selectColor};
    }
  `;

  return (
    <Wrapper
      style={
        cursorIdx === idx && !mouseInSuggestions
          ? { color: "white", background: selectColor }
          : null
      }
      onClick={event => clickHandler({ place_name, event })}
    >
      {place_name}
    </Wrapper>
  );
};

export default Suggestion;
