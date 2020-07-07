import App from "@/App.vue";
import { renderWithDependencies } from "@tests/helpers";

describe("App.vue", () => {
  it("renders the component", () => {
    const { getByText } = renderWithDependencies(App);
    const mainText = getByText("Search for places");
    expect(mainText).toBeInTheDocument();
  });
});
