import { IconButton, TextField } from "@mui/material";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import TmsTextInput from "./index";

Enzyme.configure({ adapter: new Adapter() });

const mockOnEnter = jest.fn();
const mockOnChange = jest.fn();

// const _savedValue = '|%skel|%';
const _savedValue = "%skel%";

const iTmsTextInputProps: any = {
  label: "Shipment ID",
  placeholder: "Enter Shipment ID",
  onEnter: mockOnEnter,
  dataField: "shipmentNumber",
  onChange: mockOnChange,
};

describe.only("Testing Text Input", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<TmsTextInput {...iTmsTextInputProps} />);
    expect(wrapper.exists()).toBe(true);
  });
  /*
  it("tests the Keypress Event is triggered by Enter Key", async () => {
    // let spy =  jest.spyOn(Foo.prototype, 'btnClick')
    //   .mockImplementation(() => 8)
    const wrapper = mount(<TmsTextInput {...iTmsTextInputProps} />);
    const input = wrapper.find(TextField);
    input.simulate("change", {
      target: { value: "1,2,3,4" },
      preventDefault: jest.fn(() => {}),
    });
    input.simulate("keypress", { key: "Enter" });
    expect(input.length).toBe(1);
  });

  it("tests the OnChange Event", async () => {
    // let spy =  jest.spyOn(Foo.prototype, 'btnClick')
    //   .mockImplementation(() => 8)
    const wrapper = shallow(<TmsTextInput {...iTmsTextInputProps} />);
    const input = wrapper.find(TextField);
    input.simulate("change", {
      target: { value: "1,2,3,4" },
      preventDefault: jest.fn(() => {}),
    });
    // input.simulate('keypress', { key: 'Enter' });
    expect(input.length).toBe(1);
  });

  it("tests the Keypress Event is triggered by Enter Key a value does not have comma separator", () => {
    // let spy =  jest.spyOn(TmsTextInput, "onEnterHandler")
    //   .mockImplementation(() => 8)
    const wrapper = shallow(<TmsTextInput {...iTmsTextInputProps} />);
    const input = wrapper.find(TextField);
    input.simulate("Change", {
      target: { value: "abc" },
      preventDefault: jest.fn(() => {}),
    });
    input.simulate("keypress", { key: "Enter" });
    expect(input.length).toBe(1);

    input.simulate("Change", {
      target: { value: "" },
      preventDefault: jest.fn(() => {}),
    });
    input.simulate("keypress", { key: "Enter" });
    expect(input.length).toBe(1);
  });

  it("tests the paste Event is triggered", () => {
    const getData = (txt: string) => {
      if (txt === "TEXT") {
        return "1\n2,3,4\n";
      } else {
        return "12,3,4";
      }
    };
    const wrapper = mount(<TmsTextInput {...iTmsTextInputProps} />);
    const input = wrapper.find(TextField);
    // input.simulate('change', { target:{value: "1,2,3,4" }});
    input.simulate("paste", {
      target: { value: "1,2,3,4" },
      clipboardData: { getData },
    });
    expect(input.length).toBe(1);
  });

  it("tests the click on IconButton", () => {
    const wrapper = mount(<TmsTextInput {...iTmsTextInputProps} />);
    const input = wrapper.find(IconButton);
    input.simulate("click", {});
    expect(input.length).toBe(1);
  });*/
});
