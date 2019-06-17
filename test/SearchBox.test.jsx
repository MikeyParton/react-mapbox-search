import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-15";
import { SearchBox } from "../src";

Enzyme.configure({ adapter: new Adapter() });

describe("<SearchBox>", () => {
  const testProps = {
    token: "testToken",
    country: "US"
  };

  test("should render", () => {
    const component = Enzyme.mount(<SearchBox {...testProps} />);

    expect(component).not.toBe(undefined);
  });
});
