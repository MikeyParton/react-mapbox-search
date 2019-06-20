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
    const { queryResults, inputFocused } = this.state;
    return queryResults.length > 0 && inputFocused;
  };

  async sendQuery() {
    const { token, country } = this.props;
    try {
      const queryResults = await getResults(this.state.query, token, country);
      if (queryResults.error) throw Error(queryResults.error);
      this.setState({ queryResults: queryResults.response.features });
    } catch (e) {
      console.log("Error connecting to MapBox api, check internet / api token");
    }
  }

  handleClick = ({ event, location }) => {
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

    const keyIsLetter = event.keyCode >= 65 && event.keyCode <= 90;
    const keyIsBackspace = event.keyCode == 8;
    if ((keyIsLetter || keyIsBackspace) && this.state.cursorIdx !== 0) {
      this.setState({ cursorIdx: 0 });
    }
    const { queryResults, cursorIdx } = this.state;
    switch (event.keyCode) {
      case 38: {
        // up arrow pressed
        event.preventDefault();
        if (this.showResults() && cursorIdx > 0)
          this.setState(prevState => ({ cursorIdx: prevState.cursorIdx - 1 }));
        break;
      }
      case 40: {
        // down arrow pressed
        event.preventDefault();
        if (this.showResults() && cursorIdx < queryResults.length - 1)
          this.setState(prevState => ({ cursorIdx: prevState.cursorIdx + 1 }));
        break;
      }

      case 13: {
        // enter pressed
        event.preventDefault();
        if (this.showResults()) {
          document.activeElement.blur();
          this.handleClick({
            location: queryResults[cursorIdx]
          });
        }
        break;
      }
    }
  };

  getMouseInSuggestions = bool => {
    const { cursorIdx } = this.state;

    this.setState(prevState => {
      if (prevState !== bool) {
        this.setState({ getMouseInSuggestions: bool });
      }
    });

    if (bool && cursorIdx !== 0) {
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
    const {
      queryResults,
      query,
      cursorIdx,
      getMouseInSuggestions
    } = this.state;
    return (
      <SearchBoxWrapper
        onMouseLeave={this.handleMouseLeave}
        onKeyDown={this.handleArrowKeys}
        onMouseEnter={this.handleMouseEnter}
      >
        <SearchInput
          hasResults={this.showResults()}
          value={query}
          handleFocus={this.handleFocus}
          handleBlur={this.handleBlur}
          searchHint={this.props.searchHint}
          handleInputChange={this.handleInputChange}
        />
        <Suggestions
          places={queryResults}
          selectColor={this.props.selectColor}
          hasResults={this.showResults()}
          clickHandler={this.handleClick}
          cursorIdx={cursorIdx}
          mouseInSuggestions={getMouseInSuggestions}
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
  country: PropTypes.string,

  /**
   *  callback function when user clicks suggestion, provides location object and click event object (when mouse click) as arguments
   */
  callback: PropTypes.func,

  /**
   *  color of currently selected suggestion
   */
  selectColor: PropTypes.string,

  /**
   *  hint text for input
   */
  searchHint: PropTypes.string
};

SearchBox.defaultProps = {
  country: undefined,
  selectColor: "#58a",
  callback: undefined,
  searchHint: "Search"
};

export default SearchBox;
