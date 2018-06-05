import { browser, ElementArrayFinder } from 'protractor';
import { AppPage } from './app.po';

var time = new Date().getTime();
var specialUser = 'special' + time;
var specialUserEmail = time + '@special.org';
var newUser = 'user' + time;
var newUserEmail = time + '@email.com';
var newUserEmail2 = time + '@bitcoins.net';
var pass = '9g5lk_Fl_P25791134';
var pass2 = '53-BatmanVSsuperMan-1256';
var message1 = '';
var message2 = '';
var specialMessage = '';

describe('frontend App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
  

  // First User will register
  it('should go to register page and register specialUser', () => {
    browser.sleep(2000);
    page.navigateTo();
    page.getRegisterNavButton().click();
    page.getUserNameField().sendKeys(specialUser);
    page.getEmailField().sendKeys(specialUserEmail);
    page.getFirstNameField().sendKeys('Collin');
    page.getLastNameField().sendKeys('Miller');
    page.getPasswordField().sendKeys(pass);
    page.getConfirmPasswordField().sendKeys(pass);
    page.getSubmitRegistrationButton().click();
  });
  
  // post a message and logout
  it('should post message for specialUser and logout', () => {
    specialMessage = 'Hello I am ' + specialUser;
    browser.sleep(5000);
    page.getPostNavButton().click();
    page.getNewMessageBox().sendKeys(specialMessage);
    page.getSubmitMessageButton().click();
    page.getNavLogoutButton().click();
  });

  // 2nd User will register
  it('should go to register page and register newUser', () => {
    browser.sleep(5000);
    page.getRegisterNavButton().click();
    page.getUserNameField().sendKeys(newUser);
    page.getEmailField().sendKeys(newUserEmail);
    page.getFirstNameField().sendKeys('James');
    page.getLastNameField().sendKeys('Tam');
    page.getPasswordField().sendKeys(pass);
    page.getConfirmPasswordField().sendKeys(pass);
    page.getSubmitRegistrationButton().click();
  });

  // post a message
  it('should post message', () => {
    message1 = 'Hello I am ' + newUser;
    browser.sleep(5000);
    page.getPostNavButton().click();
    page.getNewMessageBox().sendKeys(message1);
    page.getSubmitMessageButton().click();
  });

  // Check to see if our message is there
  it('should read message and see if correct', () => {
    browser.sleep(2000);
    expect(page.findNewUserMessage(newUser)).toEqual(message1);
  });

  // Check own history of message
  it('should read personal message history and see if correct', () => {
    page.getMyPostNavButton().click();
    browser.sleep(2000);
    expect(page.findNewUserMessage(newUser)).toEqual(message1);
  });

  // Should edit message
  it('should edit message', () => {
    message2 = newUser + ' made edits to message.';

    page.getPostNavButton().click();
    page.getEditLink(newUser).click();
    page.getEditTextBox().clear().then(function() {
      page.getEditTextBox().sendKeys(message2);
    })
    page.getUpdateButton().click();
  });

  // Check to see if our message is there
  it('should read message edit and see if correct', () => {
    browser.sleep(5000);
    expect(page.findNewUserMessage(newUser)).toEqual(message2);
  });

  // should delete message and check message
  it('should delete message', () => {
    page.getEditLink(newUser).click();
    page.getDeleteButton().click();
    browser.sleep(5000);
    expect(page.getMessageElement(newUser).isPresent()).toBeFalsy();
  });


  // should check special user's history of message
  it('should check specialUser history of messages', () => {
    page.getUserMessageHistoryLink(specialUser).click();
    expect(page.findNewUserMessage(specialUser)).toEqual(specialMessage);
  });
  
  // post a note
  it('post a note', () => {
    page.getNotesNavButton().click();
    page.getNoteTextBox().sendKeys(newUser + ' is writing a note.');
    page.getSubmitNote().click();
  });
      
  // Check to see if our note is still there
  it('should read user note and see if correct', () => {
    browser.sleep(2000);
    expect(page.findNewUserNote(newUser)).toEqual(newUser + ' is writing a note.');
  });
  
  // Change name, email, and password
  it('should change first name, last name, email, and password', () => {
    page.getWelcomeNavButton().click();

    page.getFirstNameChange().clear().then(function() {
      page.getFirstNameChange().sendKeys('Anthony');
    })
    page.getLastNameChange().clear().then(function() {
      page.getLastNameChange().sendKeys('Stark');
    })
    page.getEmailChange().clear().then(function() {
      page.getEmailChange().sendKeys(newUserEmail2);
    })
    page.getPasswordChange().clear().then(function() {
      page.getPasswordChange().sendKeys(pass2);
    })

    page.getSaveUserButton().click();
  });

  // logout then login
  it('should logout and login again', () => {
    page.getNavLogoutButton().click();
    page.getLoginNavButton().click();
    page.getLoginEmail().sendKeys(newUserEmail2);
    page.getLoginPassword().sendKeys(pass2);
    page.getLoginButton().click();
    browser.sleep(5000);
  });

  // Check calendar link
  it('should go to calendar page', () => {
    page.getCalendarNavButton().click();
  });

  // check map link
  it('should go to maps page', () => {
    page.getMapNavButton().click();
  });

  // Trying to register incorrectly - no username
  it('should not register user due to no username', () => {
    page.getNavLogoutButton().click();
    browser.sleep(2000);
    page.navigateTo();
    page.getRegisterNavButton().click();
    browser.sleep(2000);
    page.getEmailField().sendKeys('fake@email.com');
    page.getFirstNameField().sendKeys('Fake');
    page.getLastNameField().sendKeys('Name');
    page.getPasswordField().sendKeys('fakepass');
    page.getConfirmPasswordField().sendKeys('fakepass').then(function() {
      page.getSubmitRegistrationButton().click();
    });
    browser.sleep(2000);
    expect(page.getSubmitRegistrationButton().isPresent()).toBeTruthy();
    browser.sleep(2000);
  });

  // Trying to register incorrectly - no email
  it('should not register user due to no email', () => {
    page.navigateTo();
    page.getRegisterNavButton().click();
    browser.sleep(2000);
    page.getUserNameField().sendKeys('fake_user');
    page.getFirstNameField().sendKeys('Fake');
    page.getLastNameField().sendKeys('Name');
    page.getPasswordField().sendKeys('fakepass');
    page.getConfirmPasswordField().sendKeys('fakepass').then(function() {
      page.getSubmitRegistrationButton().click();
    });
    browser.sleep(2000);
    expect(page.getSubmitRegistrationButton().isPresent()).toBeTruthy();
    browser.sleep(2000);
  });

    // Trying to register incorrectly - mismatch passwords
    it('should not register user due to mismatch passwords', () => {
      page.navigateTo();
      page.getRegisterNavButton().click();
      browser.sleep(2000);
      page.getEmailField().sendKeys('fake@email.com');
      page.getUserNameField().sendKeys('fake_user');
      page.getFirstNameField().sendKeys('Fake');
      page.getLastNameField().sendKeys('Name');
      page.getPasswordField().sendKeys('fakepass');
      page.getConfirmPasswordField().sendKeys('fakepass22').then(function() {
        page.getSubmitRegistrationButton().click();
      });
      browser.sleep(2000);
      expect(page.getSubmitRegistrationButton().isPresent()).toBeTruthy();
      browser.sleep(2000);
    });

});