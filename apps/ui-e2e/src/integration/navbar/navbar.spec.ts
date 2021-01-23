describe('ui: Navbar component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=navbar--primary&knob-menu&knob-actions'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to ui!');
    });
});
