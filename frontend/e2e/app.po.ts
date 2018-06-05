import { browser, by, element, ElementArrayFinder } from 'protractor';

export class AppPage {
  
  navigateTo() {
    return browser.get('/');
  }

  // get paragraph sample
  getParagraphText() {
    return element(by.css('app-root nav mat-toolbar-row')).getText();
  }

  // ----Nav buttons----------------------------

  // get Home Button
  getHomeNavButton()
  {
    return element(by.css('#homeNavButton'));
  }

  // get postNavButton
  getPostNavButton()
  {
    return element(by.css('#postNavButton'));
  }

  // get postNavButton
  getMyPostNavButton()
  {
    return element(by.css('#myPostNavButton'));
  }

  // get notesNavButton
  getNotesNavButton()
  {
    return element(by.css('#notesNavButton'));
  }

  // get calandare --- TODO
  getCalendarNavButton()
  {
    return element(by.css('#calendarNavButton'));
  }

  // get mapNavButton
  getMapNavButton()
  {
    return element(by.css('#mapNavButton'));
  }

  // get change info button (welcome)
  getWelcomeNavButton()
  {
    return element(by.css('#welcomeNavButton'));
  }


  // Get login button
  getLoginNavButton()
  {
    return element(by.css('#loginNavButton'));
  }

  // get register button
  getRegisterNavButton()
  {
    return element(by.css('#registerNavButton'));
  }

  //get logout button
  getNavLogoutButton()
  {
    return element(by.css('#logoutNavButton'));
  }

// --------Registration Page --------------

  // get username field
  getUserNameField()
  {
    return element(by.css('#userNameField'));
  }

  getFirstNameField()
  {
    return element(by.css('#firstNameField'));
  }

  getLastNameField()
  {
    return element(by.css('#lastNameField'));
  }

  getEmailField()
  {
    return element(by.css('#emailField'));
  }
  
  getPasswordField()
  {
    return element(by.css('#passwordField'));
  }

  getConfirmPasswordField()
  {
    return element(by.css('#confirmPasswordField'));
  }

  getSubmitRegistrationButton()
  {
    return element(by.css('#submitRegistrationButton'));
  }

  // -------------------Login Page ----------------------------------------------

  getLoginEmail()
  {
    return element(by.css('#loginEmail'));
  }

  getLoginPassword()
  {
    return element(by.css('#loginPassword'));
  }

  getLoginButton()
  {
    return element(by.css('#loginButton'));
  }

  // -------Post specific page--------------------

  getNewMessageBox()
  {
    return element(by.css('#newMessageBox'));
  }

  getSubmitMessageButton()
  {
    return element(by.css('#submitMessageButton'));
  }

  getEditTextBox()
  {
    return element(by.css('#editTextBox'));
  }

  getUpdateButton()
  {
    return element(by.css('#updateButton'));
  }

  getDeleteButton()
  {
    return element(by.css('#deleteButton'));
  }
  
  findNewUserMessage(theUser)
  {
    return element(by.css("mat-card-content[ng-reflect-router-link='/messages," + theUser + "'] + mat-card-content")).getText();
  }

  getEditLink(theUser)
  {
    return element(by.css("mat-card-content[ng-reflect-router-link='/messages," + theUser + "'] ~ button"));
    //return element(by.css("mat-card-content[ng-reflect-router-link*='/edit/,']"));
  }

  getUserMessageHistoryLink(theUser)
  {
    return element(by.css("mat-card-content[ng-reflect-router-link='/messages," + theUser + "']"));
  }
  
  getMessageElement(theUser)
  {
    return element(by.css("mat-card-content[ng-reflect-router-link='/messages," + theUser + "'] + mat-card-content"));
  }

  // ---------Notes specific page---------------------
  getNoteTextBox()
  {
    return element(by.css('#NoteTextBox'));
  }

  getSubmitNote()
  {
    return element(by.css('#submitNote'));
  }

  findNewUserNote(theUser)
  {
    return element(by.css("mat-card-content[ng-reflect-router-link='/notes," + theUser + "'] + mat-card-content")).getText();
  }

  // ---------Calendar Specific Page -----------------


  // ----------- Map Specific Page -------------------
  

  //------------ Change info specific Page (welcome button)------------
  getFirstNameChange()
  {
    return element(by.css('#firstNameChange'));
  }

  getLastNameChange()
  {
    return element(by.css('#lastNameChange'));
  }

  getEmailChange()
  {
    return element(by.css('#emailChange'));
  }

  getPasswordChange()
  {
    return element(by.css('#passwordChange'));
  }

  getSaveUserButton()
  {
    return element(by.css('#saveUserButton'));
  }

  getDeleteUserButton()
  {
    return element(by.css('#deleteUserButton'));
  }


}

