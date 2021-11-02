import React from "react";
import { render, screen } from "@testing-library/react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Filter } from ".";

Enzyme.configure({ adapter: new Adapter() });

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
const props = {
  handleFilteredData: () => {},
};

describe.only("Testing App", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Filter {...props} />);
    expect(wrapper.exists()).toBe(true);
  });
});
