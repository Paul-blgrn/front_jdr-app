describe('Login Test', () => {
    it('should log in successfully', () => {
      const email = 'test@example.com';
      const password = 'testPassword';
  
      cy.login(email, password);  // Utiliser la commande personnalisée pour le login
      
      // Vérification après login
      cy.window().then((window) => {
        // Vérifie que le token d'authentification est bien stocké
        expect(window.localStorage.getItem('authToken')).to.not.be.null;
        // Vérifie que l'utilisateur est bien stocké
        expect(window.localStorage.getItem('user')).to.not.be.null;
      });
    });
  });