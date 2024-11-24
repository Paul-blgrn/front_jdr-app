// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
  // Step 1: Retrieve CSRF Token from Cookie
  const csrfToken = getCookie('XSRF-TOKEN');

  if (!csrfToken) {
    throw new Error('CSRF token is missing from the cookies');
  }

  // Step 2: Make Login Request with CSRF Token
  cy.request({
    method: 'POST',
    url: 'http://localhost:8000/auth/login',
    headers: {
      "Content-type": "application/json",
      "X-Requested-With": 'XMLHttpRequest',
      'Accept': 'application/json',
      'Authorization': `Bearer ${csrfToken}`,
      'X-CSRF-TOKEN': csrfToken,
    },
    body: {
      email,
      password,
    },
    withCredentials: true, // Allow cookies to be sent with the request
  }).then((loginResponse) => {
    if (loginResponse.status === 200 || loginResponse.status === 204) {
      cy.log('Connexion réussie');
      return loginResponse.body.auth_token; // Assuming `auth_token` is in the response body
    } else {
      cy.log('Échec de la connexion', loginResponse);
      throw new Error('Échec de la connexion');
    }
  });
});

function getCookie(name) {
  if (typeof name !== 'string' || name.trim() === '') {
      throw new Error('Le nom du cookie doit être une chaîne non vide.');
  }

  const cookieName = encodeURIComponent(name) + "=";
  const cookies = document.cookie ? document.cookie.split(';') : [];

  for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName)) {
          return decodeURIComponent(cookie.substring(cookieName.length));
      }
  }
  return null;
}