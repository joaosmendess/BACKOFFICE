Cypress.Commands.add('setAuthToken', () => {
    cy.request('POST', 'http://localhost:8989/api/auth/login', {
      userName: 'joao.mendes',
      password: 'password123'
    }).then((response) => {
      window.localStorage.setItem('token', response.body.token);
    });
  });
  