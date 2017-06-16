import _regeneratorRuntime from 'babel-runtime/regenerator';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var buildQuery = function buildQuery(query, token) {
  var country = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

  var base_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
  var no_country = '' + base_url + query + '.json?access_token=' + token;
  var with_country = '' + base_url + query + '.json?country=' + country + '&access_token=' + token;
  return country ? with_country : no_country;
};

export var getResults = function () {
  var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(query, token) {
    var country = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    var path, testPath, queryResults;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(query === '')) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', {
              response: {
                features: []
              }
            });

          case 2:
            _context.prev = 2;
            path = buildQuery(query, token, country
            // Mapbox API returns an object which comes
            // with a .json() method which asynchronously
            // executes the query
            );
            _context.next = 6;
            return fetch(path, {
              headers: {
                'Content-Type': 'application/json'
              }
            }
            // Handle error if response is bad
            );

          case 6:
            testPath = _context.sent;

            if (testPath.ok) {
              _context.next = 9;
              break;
            }

            throw Error(testPath.statusText

            // Execute query
            );

          case 9:
            _context.next = 11;
            return testPath.json();

          case 11:
            queryResults = _context.sent;
            return _context.abrupt('return', {
              response: queryResults
            });

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](2);
            return _context.abrupt('return', { error: _context.t0 });

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 15]]);
  }));

  return function getResults(_x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
import _regeneratorRuntime from 'babel-runtime/regenerator';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  width: 100%;\n  height: 42px;\n\n  svg {\n    position: absolute;\n    left: 15px;\n    top: 50%;\n    transform: translate(0, -50%);\n    fill: ', ';\n  }\n'], ['\n  width: 100%;\n  height: 42px;\n\n  svg {\n    position: absolute;\n    left: 15px;\n    top: 50%;\n    transform: translate(0, -50%);\n    fill: ', ';\n  }\n']);

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Suggestions from './Suggestions';
import SearchInput from './SearchInput';
import { getResults } from './Helpers';

var SearchBoxWrapper = styled.div(_templateObject, function (props) {
  return props.theme.colors.gray;
});

var SearchBox = function (_React$Component) {
  _inherits(SearchBox, _React$Component);

  function SearchBox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SearchBox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SearchBox.__proto__ || Object.getPrototypeOf(SearchBox)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      query: '',
      queryResults: []
    }, _this.handleInputChange = function (event) {
      _this.setState({ query: event.target.value }, function () {
        _this.sendQuery();
      });
    }, _this.hasResults = function () {
      return _this.state.queryResults.length > 0;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SearchBox, [{
    key: 'sendQuery',
    value: function () {
      var _ref2 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee() {
        var _props, token, country, queryResults;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _props = this.props, token = _props.token, country = _props.country;
                _context.prev = 1;
                _context.next = 4;
                return getResults(this.state.query, token, country);

              case 4:
                queryResults = _context.sent;

                if (!queryResults.error) {
                  _context.next = 7;
                  break;
                }

                throw Error(queryResults.error);

              case 7:
                this.setState({ queryResults: queryResults.response.features });
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context['catch'](1);

                console.log('error');

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 10]]);
      }));

      function sendQuery() {
        return _ref2.apply(this, arguments);
      }

      return sendQuery;
    }()
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        SearchBoxWrapper,
        null,
        React.createElement(SearchInput, {
          hasResults: this.hasResults(),
          value: this.state.query,
          handleInputChange: this.handleInputChange
        }),
        React.createElement(Suggestions, {
          places: this.state.queryResults,
          hasResults: this.hasResults()
        })
      );
    }
  }]);

  return SearchBox;
}(React.Component);

export { SearchBox };
var _templateObject = _taggedTemplateLiteral(['\n  width: 100%;\n  height: 100%;\n'], ['\n  width: 100%;\n  height: 100%;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  height: 100%;\n  width: 100%;\n  text-indent: 40px;\n  font-size: 15px;\n  border: 1px solid #979797;\n  border-radius: 3px;\n  ', '\n  ', '\n'], ['\n  height: 100%;\n  width: 100%;\n  text-indent: 40px;\n  font-size: 15px;\n  border: 1px solid #979797;\n  border-radius: 3px;\n  ', '\n  ', '\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import styled from 'styled-components';
import FaSearch from 'react-icons/lib/fa/search';

var SearchInputWrapper = styled.div(_templateObject);

var SearchInput = styled.input(_templateObject2, function (props) {
  return props.hasResults && 'border-bottom-left-radius: 0;';
}, function (props) {
  return props.hasResults && 'border-bottom-right-radius: 0;';
});

export default (function (_ref) {
  var query = _ref.query,
      handleInputChange = _ref.handleInputChange,
      hasResults = _ref.hasResults;
  return React.createElement(
    SearchInputWrapper,
    null,
    React.createElement(FaSearch, null),
    React.createElement(SearchInput, {
      hasResults: hasResults,
      placeholder: 'Search',
      value: query,
      onChange: handleInputChange
    })
  );
});
var _templateObject = _taggedTemplateLiteral(['\n  font-size: 18px;\n  padding: 1rem 1.5rem 1rem 1.5rem;\n  cursor: pointer;\n  width: 100%;\n\n  &:hover {\n    color: white;\n    background-color: #58a;\n  }\n'], ['\n  font-size: 18px;\n  padding: 1rem 1.5rem 1rem 1.5rem;\n  cursor: pointer;\n  width: 100%;\n\n  &:hover {\n    color: white;\n    background-color: #58a;\n  }\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import styled from 'styled-components';

var SuggestionWrapper = styled.div(_templateObject);

export default (function (_ref) {
  var place_name = _ref.place_name;
  return React.createElement(
    SuggestionWrapper,
    null,
    place_name
  );
});
var _templateObject = _taggedTemplateLiteral(['\n  position: relative;\n  display: ', ';\n  z-index: 9999;\n  background-color: #fff;\n  border: 1px solid #ccc;\n  border-top: none;\n  border-color: #979797;\n  border-bottom-left-radius: 3px;\n  border-bottom-right-radius: 3px;\n'], ['\n  position: relative;\n  display: ', ';\n  z-index: 9999;\n  background-color: #fff;\n  border: 1px solid #ccc;\n  border-top: none;\n  border-color: #979797;\n  border-bottom-left-radius: 3px;\n  border-bottom-right-radius: 3px;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  padding-top: 10px;\n  width: 100%;\n'], ['\n  padding-top: 10px;\n  width: 100%;\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import styled from 'styled-components';
import Suggestion from './Suggestion';

var SuggestionsBox = styled.span(_templateObject, function (_ref) {
  var hasResults = _ref.hasResults;
  return hasResults ? 'flex' : 'none';
});

var SuggestionsList = styled.div(_templateObject2);

export default (function (_ref2) {
  var places = _ref2.places,
      hasResults = _ref2.hasResults;
  return React.createElement(
    SuggestionsBox,
    { hasResults: hasResults },
    React.createElement(
      SuggestionsList,
      null,
      places.map(function (place) {
        return React.createElement(Suggestion, Object.assign({ key: place.id }, place));
      })
    )
  );
});
export { SearchBox } from './SearchBox';
export { getResults } from './Helpers';
