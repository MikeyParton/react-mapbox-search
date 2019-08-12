import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-15";
import SearchBox from "../src/Components/SearchBox";
import SearchInput from "../src/Components/SearchInput";
import Suggestions from "../src/Components/Suggestions";
import Suggestion from "../src/Components/Suggestion";

Enzyme.configure({ adapter: new Adapter() });

describe("<SearchBox>", () => {
  const testProps = {
    token: "testToken",
    country: "US"
  };

  const mockResults = {
    response: {
      features: [
        {
          id: "Test1",
          place_name: "test1"
        },
        {
          id: "test2",
          place_name: "test2"
        },
        {
          id: "test3",
          place_name: "test3"
        },
        {
          id: "test4",
          place_name: "test4"
        },
        {
          id: "test5",
          place_name: "test5"
        }
      ]
    }
  };

  SearchBox.__Rewire__("getResults", jest.fn().mockResolvedValue(mockResults));

  test("should render", () => {
    const component = Enzyme.mount(<SearchBox {...testProps} />);
    expect(component).not.toBe(undefined);
  });

  test("dropdown should appear when input focused and text input", done => {
    const component = Enzyme.mount(<SearchBox {...testProps} />);
    const input = component.find(SearchInput).find("input");
    expect(component.state().queryResults.length).toBe(0);
    input.simulate("focus");
    input.simulate("change", { target: { value: "BU" } });
    setImmediate(() => {
      expect(component.state().inputFocused).toBe(true);
      expect(component.state().queryResults.length).toBe(5);
      component.update();
      expect(
        component
          .find(Suggestions)
          .first()
          .prop("hasResults")
      ).toBe(true);
      done();
    });
  });

  test("selected item should change down when pressing down arrow key", done => {
    const component = Enzyme.mount(<SearchBox {...testProps} />);
    const input = component.find(SearchInput).find("input");
    input.simulate("focus");
    input.simulate("change", { target: { value: "BU" } });
    setImmediate(() => {
      component.childAt(0).simulate("keydown", { keyCode: 40 });
      expect(component.state().cursorIdx).toBe(1);
      done();
    });
  });

  test("selected item should change up when pressing up arrow key", done => {
    const component = Enzyme.mount(<SearchBox {...testProps} />);
    const input = component.find(SearchInput).find("input");
    input.simulate("focus");
    input.simulate("change", { target: { value: "BU" } });
    setImmediate(() => {
      component.childAt(0).simulate("keydown", { keyCode: 40 });
      component.childAt(0).simulate("keydown", { keyCode: 38 });
      expect(component.state().cursorIdx).toBe(0);
      done();
    });
  });

  test("selected item should be chosen when hit enter key, callback called", done => {
    const cb = jest.fn();
    const component = Enzyme.mount(<SearchBox {...testProps} callback={cb} />);
    const input = component.find(SearchInput).find("input");
    input.simulate("focus");
    input.simulate("change", { target: { value: "BU" } });
    setImmediate(() => {
      component.childAt(0).simulate("keydown", { keyCode: 13 });
      expect(component.find(SearchInput).prop("value")).toBe(
        mockResults.response.features[0].place_name
      );
      expect(cb).toHaveBeenCalled();
      done();
    });
  });

  test("selected item should be chosen when clicked with mouse, callback called", done => {
    const cb = jest.fn();
    const component = Enzyme.mount(<SearchBox {...testProps} callback={cb} />);
    const input = component.find(SearchInput).find("input");
    input.simulate("focus");
    input.simulate("change", { target: { value: "BU" } });
    setImmediate(() => {
      component.update();
      component
        .find(Suggestion)
        .first()
        .simulate("mousedown");
      expect(component.find(SearchInput).prop("value")).toBe(
        mockResults.response.features[0].place_name
      );
      expect(cb).toHaveBeenCalled();
      done();
    });
  });
});
