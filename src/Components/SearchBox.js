import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Suggestions from "./Suggestions";
import SearchInput from "./SearchInput";
import { getResults } from "../utils/helpers";

const SearchBoxWrapper = styled.div`
  width: 100%;
  height: 42px;

  svg {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translate(0, -50%);
    fill: #d3d3d3;
  }
`;

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      queryResults: [],
      cursorIdx: 0,
      mouseLeft: false,
      getMouseInSuggestions: false
    };
  }

  handleInputChange = event => {
    this.setState({ query: event.target.value }, () => {
      this.sendQuery();
    });
  };

  showResults = () => {
    return this.state.queryResults.length > 0 && !this.state.mouseLeft;
  };

  async sendQuery() {
    const { token, country } = this.props;
    try {
      const queryResults = await getResults(this.state.query, token, country);
      if (queryResults.error) throw Error(queryResults.error);
      this.setState({ queryResults: queryResults.response.features });
    } catch (e) {
      console.log("error");
    }
  }

  handleClick = ({ event, place_name }) => {
    this.setState({ query: place_name, queryResults: [], cursorIdx: 0 });
    this.props.callback({ location: place_name, event });
  };

  handleArrowKeys = event => {
    if (this.state.getMouseInSuggestions) {
      return;
    }
    switch (event.keyCode) {
      case 38: {
        // up arrow pressed
        event.preventDefault();
        if (this.showResults() && this.state.cursorIdx > 0)
          this.setState(prevState => ({ cursorIdx: prevState.cursorIdx - 1 }));
        break;
      }
      case 40: {
        // down arrow pressed
        event.preventDefault();
        if (
          this.showResults() &&
          this.state.cursorIdx < this.state.queryResults.length - 1
        )
          this.setState(prevState => ({ cursorIdx: prevState.cursorIdx + 1 }));
        break;
      }

      case 13: {
        // enter pressed
        event.preventDefault();
        if (this.showResults()) {
          this.handleClick({
            place_name: this.state.queryResults[this.state.cursorIdx].place_name
          });
        }
      }
    }
  };

  getMouseInSuggestions = bool => {
    if (this.state.getMouseInSuggestions !== bool) {
      this.setState({ getMouseInSuggestions: bool });
    }
    if (bool && this.state.cursorIdx !== 0) {
      this.setState({ cursorIdx: 0 });
    }
  };

  handleMouseLeave = () => {
    this.setState({ mouseLeft: true, cursorIdx: 0 });
  };

  handleMouseEnter = () => {
    this.setState({ mouseLeft: false });
  };

  render() {
    return (
      <SearchBoxWrapper
        onMouseLeave={this.handleMouseLeave}
        onKeyDown={this.handleArrowKeys}
        onMouseEnter={this.handleMouseEnter}
      >
        <SearchInput
          hasResults={this.showResults()}
          value={this.state.query}
          handleInputChange={this.handleInputChange}
        />
        <Suggestions
          places={this.state.queryResults}
          selectColor={this.props.selectColor}
          hasResults={this.showResults()}
          clickHandler={this.handleClick}
          cursorIdx={this.state.cursorIdx}
          getMouseInSuggestions={this.getMouseInSuggestions}
        />
      </SearchBoxWrapper>
    );
  }
}

export default SearchBox;
