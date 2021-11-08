import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Filter } from "./Filter";

Enzyme.configure({ adapter: new Adapter() });

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe.only("Testing App", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });
  it("should test handleFilteredData ", () => {
    const wrapper = shallow(<App />);
    const filter = wrapper.find(Filter);
    if (filter.prop("handleFilteredData")) {
      filter.prop("handleFilteredData")([]);
    }
    expect(wrapper.exists()).toBe(true);
  });
});
