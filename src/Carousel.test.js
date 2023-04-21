import React from "react";
import { render, fireEvent, queryByTestId } from "@testing-library/react";
import Carousel from "./Carousel";


it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});


// SMOKE TEST
it("renders without crashing", function () {
  render(<Carousel />)
})

// SNAPSHOT TEST
it("matches snapshot", function () {
  const { asFragment } = render(<Carousel />)
  expect(asFragment()).toMatchSnapshot();
})


// LEFT ARROW TESTING
it("works when you click on the left arrow", function () {
  const { getByTestId, queryByAltText } = render(<Carousel />);

  const rightArrow = getByTestId("right-arrow");
  fireEvent.click(rightArrow);
  
  const leftArrow = getByTestId("left-arrow");
  fireEvent.click(leftArrow);

  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});



//ARROWS HIDING
it("hides and shows arrows", function() {
  const { getByTestId } = render(<Carousel />);
  const leftArrow = getByTestId("left-arrow");
  const rightArrow = getByTestId("right-arrow");

  // LEFT ARROW SHOWS AND RIGHT DOES NOT 
  expect(leftArrow).toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");

  // BOTH APPEAR
  fireEvent.click(getByTestId("right-arrow"));

// RIGHT ARROW SHOWS AND LEFT DOES NOT
  expect(leftArrow).not.toHaveClass("hidden");
 expect(rightArrow).not.toHaveClass("hidden");

  
  // RIGHT DISAPPEARS AFTER GOING FORWARD AGAIN
  fireEvent.click(rightArrow);
 expect(leftArrow).not.toHaveClass("hidden");
 expect(rightArrow).toHaveClass("hidden");

});