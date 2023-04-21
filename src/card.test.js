import { render } from "@testing-library/react"; 
import Card from "./Card"



//SMOKE TEST
it("renders without crashing", function () {
    render(<Card />)
})

// SNAPSHOT TEST
it("matches snapshot", function () {
    const { asFragment } = render(<Card />)
    expect (asFragment()).toMatchSnapshot()
})