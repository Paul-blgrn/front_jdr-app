describe('LoginForm Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/'); // Url par defaut
    });
  
    it('should render the login form', () => {
      // on vérifie que les champs de saisie (Email, Mot de passe) 
      // et le bouton de connexion sont présents
      cy.get('input[placeholder="Entrez votre E-mail"]').should('exist');
      cy.get('input[placeholder="Entrez votre mot de passe"]').should('exist');
      cy.get('button').contains('Confirmer').should('exist');
    });
  
    it('should display an error message if login fails', () => {
      // On simule un échec de login en fournissant de mauvaises informations
      cy.intercept('POST', '/auth/login', {
        statusCode: 422,
        body: { error: 'Login failed. Please try again.' },
      }).as('loginRequest');
  
      // On renseigne le formulaire avec des données incorrectes
      cy.get('input[placeholder="Entrez votre E-mail"]').type('wrongemail@example.com');
      cy.get('input[placeholder="Entrez votre mot de passe"]').type('wrongpassword');
  
      // On soumet le formulaire
      cy.get('form').submit();
  
      // On vérifie que le message d'erreur est affiché
      cy.wait('@loginRequest');
      cy.get('div')
        .should('contain.text', 'Login failed. Please try again.')
        .and('be.visible');
    });
  
    it('should redirect to home page upon successful login', () => {
      // On simule une réponse réussie de l'API login
      cy.intercept('POST', '/auth/login', {
        statusCode: 200,
        body: { user: { id: 1, name: 'John Doe' } },
      }).as('loginRequest');
  
      // On renseigne le formulaire avec des informations valides
      cy.get('input[placeholder="Entrez votre E-mail"]').type('12345678@test.fr');
      cy.get('input[placeholder="Entrez votre mot de passe"]').type('12345678');
  
      // On soumet le formulaire
      cy.get('form').submit();
  
      // On vérifie la redirection vers la page d'accueil
      cy.wait('@loginRequest');
      // On vérifie que l'utilisateur est redirigé
      cy.url().should('include', '/');
    });
  });