import { shallow } from "enzyme";
import * as React from "react";
import sinon from "sinon";
import mockForms, { mockSingleFormArchive } from "src/_core/test/mock/mockForms";
import FormDetail from "../index";

describe("FormDetail should", () => {
  it("resolve that true is true", () => {
    expect(true).toBe(true);
  });

//   it("mount", () => {
//     // Arrange
//     sinon.spy(FormDetail.prototype, "componentDidMount");

//     // Act
//     shallow(<FormDetail />);

//     // Assert
//     expect(FormDetail.prototype.componentDidMount.calledOnce).toBe(true);

//     // Restore
//     FormDetail.prototype.componentDidMount.restore();
//   });

  it("render #FormDetailForm when from is passed as prop", () => {
	// Arrange
	  const expected = mockSingleFormArchive[0].detail
	  
    // Act
    const container = shallow(<FormDetail form={mockSingleFormArchive[0]} />);

    // Assert
	  expect(container.contains(expected)).toBe(true);
  });

  it("render #FormDetailNoForm when from is not passed as prop", () => {
    const container = shallow(<FormDetail />);
    container.find('[testid="FormDetailNoForm"]');

    // Assert
    expect(
      container.find('[testid="FormDetailNoFormSelected"]').length
    ).toBeGreaterThan(0);
  });
});
