import React from "react";
import { shallow } from "enzyme";
import Loader from "../";

describe("<Loader />", () => {
  it("should render", () => {
    const wrapper = shallow(<Loader active={true} />);
    expect(wrapper.length).toEqual(1);
  });
});
