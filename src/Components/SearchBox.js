import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Suggestions from "./Suggestions";
import SearchInput from "./SearchInput";
import getResults from "../utils/helpers";

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
      getMouseInSuggestions: false,
      inputFocused: false
    };
  }

  handleInputChange = event => {
    this.setState({ query: event.target.value }, () => {
      this.sendQuery();
    });
  };

  showResults = () => {
    return this.state.queryResults.length > 0 && this.state.inputFocused;
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

  handleClick = ({ event, location }) => {
    console.log("handleClick");
    this.setState({
      query: location.place_name,
      cursorIdx: 0,
      getMouseInSuggestions: false
    });
    if (this.props.callback) {
      this.props.callback({ location, event });
    }
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
          document.activeElement.blur();
          this.handleClick({
            location: this.state.queryResults[this.state.cursorIdx]
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

  handleFocus = () => {
    this.setState({ inputFocused: true });
  };

  handleBlur = () => {
    this.setState({ inputFocused: false });
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
          handleFocus={this.handleFocus}
          handleBlur={this.handleBlur}
          handleInputChange={this.handleInputChange}
        />
        <Suggestions
          places={this.state.queryResults}
          selectColor={this.props.selectColor}
          hasResults={this.showResults()}
          clickHandler={this.handleClick}
          cursorIdx={this.state.cursorIdx}
          mouseInSuggestions={this.state.getMouseInSuggestions}
          getMouseInSuggestions={this.getMouseInSuggestions}
        />
      </SearchBoxWrapper>
    );
  }
}

SearchBox.propTypes = {
  /**
   *  token for MapBox api
   */
  token: PropTypes.string.isRequired,

  /**
   *  ISO 3166-1 country code for MapBox api to narrow search
   */
  country: PropTypes.string.isRequired,

  /**
   *  callback function when user clicks suggestion, provides location object and click event object (when mouse click) as arguments
   */
  callback: PropTypes.func,

  /**
   *  color of currently selected suggestion
   */

  selectColor: PropTypes.string
};

SearchBox.defaultProps = {
  selectColor: "#58a",
  callback: undefined
};

export default SearchBox;
