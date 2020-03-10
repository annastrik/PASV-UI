import RegistrationPage from '../_page/RegistrationPage';
import HomePage from '../../_page/HomePage';
import Notification from '../../_page/Notification';
import Menu from '../../_page/Menu';
import { urlData } from '../../_data/url.data';
import {
  newUserData,
  pageRegisterData,
  successfulNotificationData,
} from '../_data/userRegistration.data';
import axios from "axios";
import {expect} from "chai";

describe('USER REGISTRATION', () => {
  before(
    'should open Home Page, click button `Registration` and redirect to Registration Page',
    () => {
      HomePage.open();
      HomePage.registrationLink.click();
      browser.pause(1000);
    },
  );

  it('should registration page has correct header', () => {
    const actual = Menu.h1.getText();
    const expected = pageRegisterData.h1;
    expect(actual).eq(expected);
  });

  it('should have correct warning text', () => {
    const actual = RegistrationPage.p.getText();
    const expected = pageRegisterData.warningText;
    expect(actual).eq(expected);
  });

  it('should button `Submit` will be disabled by default', () => {
    const element = RegistrationPage.submitBtn;
    expect(element.isEnabled()).to.be.false;
  });

  it('should fill out `First Name` Field', () => {
    RegistrationPage.firstNameInput.setValue(newUserData.firstName);
  });

  it('should fill out `Last Name` Field', () => {
    RegistrationPage.lastNameInput.setValue(newUserData.lastName);
  });

  it('should fill out `Cell Phone Number` Field', () => {
    RegistrationPage.cellPhoneNumberInput.setValue(newUserData.phone);
  });

  it('should fill out `Email` field', () => {
    RegistrationPage.emailInput.setValue(newUserData.email);
  });

  it('should button `Submit` will be disabled without filling out all required fields', () => {
    const element = RegistrationPage.submitBtn;
    expect(element.isEnabled()).to.be.false;
  });

  it('should fill out Password field', () => {
    RegistrationPage.passwordInput.setValue(newUserData.password);
  });

  it('should fill out About field', () => {
    RegistrationPage.aboutInput.setValue(newUserData.about);
  });

  it('should fill out My goals field', () => {
    RegistrationPage.myGoalsInput.setValue(newUserData.goals);
  });

  it('should button `Submit` will be disabled without filling out last required field', () => {
    const element = RegistrationPage.submitBtn;
    expect(element.isEnabled()).to.be.false;
  });

  it('should choose English level from dropdown menu', () => {
    RegistrationPage.englishLevelOption.selectByVisibleText(newUserData.englishLevel);
  });

  it('should button `Submit` will be enabled when filling out all required fields', () => {
    const element = RegistrationPage.submitBtn;
    expect(element.isEnabled()).to.be.true;
  });

  it('should click button Submit after filling all fields', () => {
    RegistrationPage.submitBtn.click();
  });

  it('should wait until redirect to login page after submitting form', () => {
    browser.waitUntil(() => browser.getUrl() === urlData.loginUrl, 3000);
  });

  it('should get successful notification about user registration in the system', () => {
    const actual = Notification.title.getText();
    const expected = successfulNotificationData.successfulNotification;
    expect(actual).eq(expected);
  });

  it('should verify from database user by email', async() => {
    const response = await axios({
      method: 'get',
      url: `https://server-stage.pasv.us/user/email/${newUserData.email}`,
      headers: {
        Authorization: process.env.ADMIN_TOKEN,
      },
    })
        .then(res => res)
        .catch(err => err);
    console.log(response);
    expect(response.data.message).to.not.be.empty;
    expect(response.data).to.include.keys('payload');
    expect(response.data.payload._id).to.have.length.of.above(0);
    expect(response.data.payload._id.length).to.be.above(0);
    expect(response.data.success).true;
    expect(response.data.fail).false;
    expect(response.status).eq(200);
    expect(response.data.payload.name).eq(`${newUserData.firstName} ${newUserData.lastName}`);
  });

});
