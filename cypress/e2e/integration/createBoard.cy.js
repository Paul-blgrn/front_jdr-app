describe('Login and Create Board Tests', () => {
    beforeEach(() => {
      // Réinitialisation de l'état avant chaque test
      cy.clearCookies();
      cy.visit('http://localhost:3000'); // Remplacez par votre URL de connexion
    });
  
    it('should log in and navigate to /boards via user action', () => {
      // Récupérer le CSRF token avant de se connecter
      cy.request('GET', '/auth/sanctum/csrf-cookie').then((response) => {
        // Vérifier que le cookie XSRF-TOKEN existe
        cy.getCookie('XSRF-TOKEN').should('exist');
      });

      cy.intercept('POST', '/auth/login', {
        statusCode: 200,
        body: { user: { id: 1, name: 'John Doe' }, token: "token" },
      }).as('loginRequest');
  
      // Remplir et soumettre le formulaire de connexion
      cy.get('input[placeholder="Entrez votre E-mail"]').type('user@example.com');
      cy.get('input[placeholder="Entrez votre mot de passe"]').type('password123');
      cy.get('form').submit();
  
      // Vérifier que la connexion a réussi
      cy.wait('@loginRequest').then((interception) => {
        // Extraire le token de la réponse et le stocker dans Cypress.env()
        const token = interception.response.body.token;
        Cypress.env('authToken', token);  // Stockage du token pour l'utiliser plus tard
      });

      cy.url().should('include', '/');
      cy.getCookie('XSRF-TOKEN').should('exist'); 

      // Vérifier que le menu est visible
      cy.get('div').contains('Mes Tables').should('be.visible'); // Vérifiez que le bouton "Mes Tables" est affiché
      cy.get('div').contains('Mes Templates').should('be.visible'); // Vérifiez que le bouton "Mes Templates" est affiché
      cy.get('div').contains('Deconnexion').should('be.visible'); // Vérifiez que le bouton "Mes Templates" est affiché
  
      // Cliquer sur le bouton "Mes Tables"
      cy.contains('Mes Tables').click(); // Simule un clic sur le bouton
      cy.url().should('include', '/boards'); // Vérifier que l'URL a changé
      cy.contains('Créer un Board').should('be.visible'); // Vérifier que le contenu de la page est correct
    });
  
    it('should create a new board after logging in', () => {
        // Utiliser le token stocké précédemment
        const token = Cypress.env('authToken');
    
        // Récupérer le CSRF token avant de créer le board
        cy.getCookie('XSRF-TOKEN').then((cookie) => {
            cy.intercept('POST', '/auth/login', {
                statusCode: 200,
                body: { user: { id: 1, name: 'John Doe' }, token: token },
            }).as('loginRequest');
          // Mock de l'API de création de board
          cy.intercept('POST', '/api/boards/add', (req) => {
            // Ajouter le CSRF token et l'Authorization dans l'en-tête de la requête
            req.headers['X-XSRF-TOKEN'] = cookie; // Utiliser le cookie XSRF-TOKEN ici
            req.headers['Authorization'] = `Bearer ${token}`; // Utiliser le token stocké dans Cypress.env()
            
            req.reply({
              statusCode: 201,
              body: {
                board: {
                  name: 'New Board Name',
                  description: 'This is a description for the new board with more than 20 characters',
                  capacity: 3,
                },
              },
            });
          }).as('createBoardRequest');
    
          // Se connecter
          cy.get('input[placeholder="Entrez votre E-mail"]').type('user@example.com');
          cy.get('input[placeholder="Entrez votre mot de passe"]').type('password123');
          cy.get('form').submit();
          cy.wait('@loginRequest');
    
          // Vérifier que l'utilisateur est redirigé vers l'accueil
          cy.url().should('include', '/');
          cy.getCookie('XSRF-TOKEN').should('exist'); 
    
          // Naviguer vers la page des boards via le menu
          cy.contains('Mes Tables').click(); 
          cy.url().should('include', '/boards');
    
          // Simuler un clic sur le menu "créer un board"
          cy.contains('Créer un Board').click();
    
          // Remplir le formulaire de création de board
          cy.get('input[type="text"][placeholder="Entrez un nom"]').type('New Board Name');
          cy.get('input[type="textarea"][placeholder="Entrez une courte description"]').type('This is a description for the new board with more than 20 characters');
          cy.get('input[type="range"]').invoke('val', 3).trigger('input');
          cy.get('button').contains('Confirmer').click();
    
          // Vérifier que le board a été créé
          cy.wait('@createBoardRequest');
          cy.url().should('include', '/boards');
          cy.getCookie('XSRF-TOKEN').should('exist'); 
        });
      });
  });