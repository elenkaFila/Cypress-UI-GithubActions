import * as data from "../helpers/credentionals.json"
import * as login from "../locators/login.json"
import * as secure from "../locators/secure.json"

describe('Authorization on the-internet', () => {
  beforeEach('Начало теста', function () {
    cy.visit('/login'); // Зашли на сайт
    });
     
  it('Should open url after correct authorization', () => {
    //Вводим корректный email, пароль
    cy.get(login.input_username).type(data.login);
    cy.get(login.input_password).type(data.password);  
    //Нажимаем кнопку submit
    cy.get(login.button_submit).click();
    //Проверяем открылась ли другая страница
    cy.url().then(url => cy.log('Current URL is', url));
    cy.get(secure.alert).contains('You logged into a secure area!')
    cy.url().should('eq', Cypress.config().baseUrl + '/secure');
    cy.url().should('include', '/secure');
  });

    it('Should show alert on incorrect login', () => {
      // Вводим неправильный email и пароль
      cy.get(login.input_username).type('tom');
      cy.get(login.input_password).type(data.password);  
      //Нажимаем кнопку submit
      cy.get(login.button_submit).click();
      cy.get(login.alert).contains('Your username is invalidff!')
      cy.url().should('eq', Cypress.config().baseUrl + '/login');

  });

  it('Should show alert on incorrect password', () => {
    // Вводим неправильный email и пароль
    cy.get(login.input_username).type(data.login);
    cy.get(login.input_password).type('Super');  
    //Нажимаем кнопку submit
    cy.get(login.button_submit).click();
    cy.get(login.alert).contains('Your password is invalid!')
    cy.url().should('eq', Cypress.config().baseUrl + '/login');
  });

});
