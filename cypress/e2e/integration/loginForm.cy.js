describe('LoginForm Component', () => {
    beforeEach(() => {
      // Ici, vous pouvez lancer votre application (si nécessaire, ou simulateur de backend si vous testez un formulaire connecté à une API)
      cy.visit('http://localhost:3000/'); // Remplacez par l'URL de votre formulaire de login
    });
  
    it('should render the login form', () => {
      // Vérifier que les champs de saisie (Email, Mot de passe) et le bouton de connexion sont présents
      cy.get('input[placeholder="Entrez votre E-mail"]').should('exist');
      cy.get('input[placeholder="Entrez votre mot de passe"]').should('exist');
      cy.get('button').contains('Confirmer').should('exist');
    });
  
    it('should display an error message if login fails', () => {
      // Simuler un échec de login en fournissant de mauvaises informations
      cy.intercept('POST', '/auth/login', {
        statusCode: 422,
        body: { error: 'Login failed. Please try again.' },
      }).as('loginRequest');
  
      // Remplir le formulaire avec des données incorrectes
      cy.get('input[placeholder="Entrez votre E-mail"]').type('wrongemail@example.com');
      cy.get('input[placeholder="Entrez votre mot de passe"]').type('wrongpassword');
  
      // Soumettre le formulaire
      cy.get('form').submit();
  
      // Vérifier que le message d'erreur est affiché
      cy.wait('@loginRequest');
      cy.get('div')
        .should('contain.text', 'Login failed. Please try again.') // Vérifiez si le message est dans cet élément
        .and('be.visible');
    });
  
    it('should redirect to home page upon successful login', () => {
      // Simuler une réponse réussie de l'API login
      cy.intercept('POST', '/auth/login', {
        statusCode: 200,
        body: { user: { id: 1, name: 'John Doe' } },
      }).as('loginRequest');
  
      // Remplir le formulaire avec des informations valides
      cy.get('input[placeholder="Entrez votre E-mail"]').type('12345678@test.fr');
      cy.get('input[placeholder="Entrez votre mot de passe"]').type('12345678');
  
      // Soumettre le formulaire
      cy.get('form').submit();
  
      // Vérifier la redirection vers la page d'accueil
      cy.wait('@loginRequest');
      cy.url().should('include', '/'); // Vérifier que l'utilisateur est redirigé vers la page d'accueil
    });
  });