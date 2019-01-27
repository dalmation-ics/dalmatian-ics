import { mount, shallow } from "enzyme";
import * as React from "react";
import sinon from "sinon";
import mockForms from "src/_core/test/mock/mockForms";
import { createStore, wrapWithProvider } from "src/_core/test/reduxTestUtils";
import FormList from "../index";

describe("FormList should", () => {
  it("resolve that true is true", () => {
    expect(true).toBe(true);
  });

// 	it("mount", () => {
// 	  console.log(FormList)
//     // Arrange
//     sinon.spy(FormList.prototype, "ComponentDidMount");

//     // Act
//     shallow(<FormList />);

//     // Assert
//     expect(FormList.prototype.componentDidMount.calledOnce).toBe(true);

//     // Restore
//     FormList.prototype.componentDidMount.restore();
//   });

  it("render #FormListNoData when no forms are provided", () => {
    // Arrange
    // Act
    const container = shallow(<FormList />);

    // Assert
    expect(container.find('[testid="FormListNoData"]').length).toBeGreaterThan(
      0
    );
  });

  it("render #FormList when forms are provided", () => {
    // Arrange
    // Act
    const container = shallow(<FormList forms={mockForms} />);

    // Assert
    expect(container.find('[testid="FormList"]').length).toBeGreaterThan(0);
  });

  it("highlights selected form with #FormListItemSelected", () => {
    // Arrange
    // Act
    const container = mount(
      <FormList
        forms={mockForms}
        selected={mockForms[mockForms.length - 1].id}
      />
    );

    // Assert
    expect(
      container.find('[testid="FormListItemSelected"]').length
    ).toBeGreaterThan(0);
  });
});

describe("have prop onSubmit that", () => {
  it("is not called by single clicking a list item", () => {
    // Arrange
    const spy = sinon.spy();
    const container = mount(<FormList forms={mockForms} onSubmit={spy} />);
    const formListUl = container.find('[testid="FormList"]').first();
    const targetIndex = mockForms.length - 1;

    // Act
    formListUl.childAt(targetIndex).simulate("click");

    // Assert
    expect(spy.calledOnce).toBe(false);
  });

  it("is called by double clicking a list item", () => {
    // Arrange
    const spy = sinon.spy();
    const container = mount(<FormList forms={mockForms} onSubmit={spy} />);
    const formListUl = container.find('[testid="FormList"]').first();
    const targetIndex = mockForms.length - 1;

    // Act
    formListUl.childAt(targetIndex).simulate("doubleclick");

    // Assert
    expect(spy.calledOnce).toBe(true);
  });

  it("provides selected form id", () => {
    // Arrange
    const spy = sinon.spy();
    const container = mount(<FormList forms={mockForms} onSubmit={spy} />);
    const formListUl = container.find('[testid="FormList"]').first();
    const targetIndex = mockForms.length - 1;

    // Act
    formListUl.childAt(targetIndex).simulate("doubleclick");

    // Assert
    expect(spy.calledOnce).toBe(true);
    expect(spy.getCall(0).args[0]).toBe(mockForms[targetIndex].id);
  });
});

describe("have prop onSelect that", () => {
  it("provides selected form id", () => {
    // Arrange
    const spy = sinon.spy();
    const container = mount(<FormList forms={mockForms} onSelect={spy} />);
    const formListUl = container.find('[testid="FormList"]').first();
    const targetIndex = mockForms.length - 1;

    // Act
    formListUl.childAt(targetIndex).simulate("click");

    // Assert
    expect(spy.calledOnce).toBe(true);
    expect(spy.getCall(0).args[0]).toBe(mockForms[targetIndex].id);
  });
});
