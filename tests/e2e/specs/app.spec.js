describe("App screen", () => {
  it("Visits the app root url", async () => {
    cy.visit("/");
    cy.findByText("Search for places").should("exist");
  });
});
