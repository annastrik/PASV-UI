import AppPage from '../../_page/AppPage';
import {expect} from 'chai';
import {loginPageElements} from  '../_data/login.data.new.version';

class LoginPageNewVersion extends AppPage {

  get title() {
    return browser.getTitle();
  }

  get heading() {
    return $('//h1').getText();
  }

  get emailInput() {
    return $('//input[@name="email"]');
  }

  get passwordInput() {
    return $('//input[@name="password"]');
  }

  get forgotPasswordLink() {
    return $('//a[@qa="forgot-password-link"]');
  }

  get submitBtn() {
    return $('//button[@type="submit"]');
  }

  get notification() {
    return $('//h4[@class="notification-title"]').getText();
  }

  get invalidEmailNotification(){
    return $('//div[@class="invalid-feedback"]').getText();
  }

  sumbitLogin(email, password) {
    this.emailInput.setValue(email);
    this.passwordInput.setValue(password);
    super.clickElement(this.submitBtn);
  }

  sumbitInvalidEmail(email, password) {
    this.emailInput.setValue(email);
    this.passwordInput.setValue(password);
  }

  open() {
    super.open('https://stage.pasv.us/user/login');
    expect(this.title).eq(loginPageElements.title);
    expect(this.heading).eq(loginPageElements.heading);
  }
}

export default new LoginPageNewVersion();
