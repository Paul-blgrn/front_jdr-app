describe('Afficher des boards', () => {
    beforeEach(() => {
      // Visiter la page des boards
      cy.visit('http://localhost:3000/boards');  // Remplacer par l'URL de la page des boards si nécessaire
  
      // Simuler la connexion de l'utilisateur
      // Remplacer par l'authentification réelle ou un mock si nécessaire
      cy.login('testUser', 'testPassword');
    });
  
    it('devrait afficher les boards créés de l\'utilisateur', () => {
      // Vérifier que la section des boards créés est affichée
      cy.get('.board-title').contains('Mes boards créés').should('be.visible');
  
      // Vérifier que les boards créés sont affichés dans la liste
      cy.get('.board-list .board-card').should('have.length.greaterThan', 0);
  
      // Vérifier le contenu d'un board (par exemple le nom, la description et la capacité)
      cy.get('.board-list .board-card').first().within(() => {
        cy.get('.board-name h2').should('not.be.empty'); // Vérifier que le nom du board n'est pas vide
        cy.get('.board-description p').should('not.be.empty'); // Vérifier que la description n'est pas vide
        cy.get('.board-capacity p').should('not.be.empty'); // Vérifier que la capacité n'est pas vide
      });
    });
  
    it('devrait afficher les boards rejoints par l\'utilisateur', () => {
      // Vérifier que la section des boards rejoints est affichée
      cy.get('.board-title').contains('Boards Rejoints').should('be.visible');
  
      // Vérifier que les boards rejoints sont affichés dans la liste
      cy.get('.board-list .board-card').should('have.length.greaterThan', 0);
  
      // Vérifier le contenu d'un board rejoint
      cy.get('.board-list .board-card').first().within(() => {
        cy.get('.board-name h2').should('not.be.empty'); // Vérifier que le nom du board n'est pas vide
        cy.get('.board-description p').should('not.be.empty'); // Vérifier que la description n'est pas vide
        cy.get('.board-capacity p').should('not.be.empty'); // Vérifier que la capacité n'est pas vide
      });
    });
  
    it('devrait afficher la pagination des boards créés', () => {
      // Vérifier que la pagination des boards créés est visible
      cy.get('.pagination-container').should('be.visible');
  
      // Vérifier que les boutons de pagination existent
      cy.get('.pagination-container').find('button').should('have.length.greaterThan', 1);
    });
  
    it('devrait afficher la pagination des boards rejoints', () => {
      // Vérifier que la pagination des boards rejoints est visible
      cy.get('.pagination-container').should('be.visible');
  
      // Vérifier que les boutons de pagination existent
      cy.get('.pagination-container').find('button').should('have.length.greaterThan', 1);
    });
  
    it('devrait permettre de changer de page pour les boards créés', () => {
      // Vérifier la pagination
      cy.get('.pagination-container button').contains('Next').click();
  
      // Vérifier que la page des boards créés change
      cy.url().should('include', 'page=2'); // Assurez-vous que la pagination fonctionne correctement
    });
  
    it('devrait permettre de changer de page pour les boards rejoints', () => {
      // Vérifier la pagination des boards rejoints
      cy.get('.pagination-container button').contains('Next').click();
  
      // Vérifier que la page des boards rejoints change
      cy.url().should('include', 'page=2'); // Assurez-vous que la pagination fonctionne correctement
    });
  
    it('devrait afficher un message lorsque l\'utilisateur n\'a pas de boards créés', () => {
      // Simuler un cas où l'utilisateur n'a pas de boards créés
      cy.intercept('GET', '/api/boards/created', { body: [] }).as('getBoards');
      
      // Visiter la page des boards
      cy.visit('/boards');
      
      // Vérifier que le message "Vous n'avez pas de boards créés" est affiché
      cy.get('.no-boards').contains("Vous n'avez pas de boards créés").should('be.visible');
    });
  
    it('devrait afficher un message lorsque l\'utilisateur n\'a pas de boards rejoints', () => {
      // Simuler un cas où l'utilisateur n'a pas de boards rejoints
      cy.intercept('GET', '/api/boards/joined', { body: [] }).as('getBoards');
      
      // Visiter la page des boards
      cy.visit('/boards');
      
      // Vérifier que le message "Vous n'avez pas de boards rejoints" est affiché
      cy.get('.no-boards').contains("Vous n'avez pas de boards rejoints").should('be.visible');
    });
  });