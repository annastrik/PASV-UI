import {expect}  from 'chai';
import LoginPageNewVersion from '../_page/LoginPageNewVersion';
import ProfilePageNewVersion from '../_page/ProfilePageNewVersion';
import {student, loginInvalidEmail1, loginWrongEmail, loginWrongPassword} from  '../_data/user.data.new.version';
import {profilePageElements} from  '../_data/profile.data.new.version';
import {loginPageElements, errorMessages} from  '../_data/login.data.new.version';

describe('LOGIN POSITIVE, LOGOUT, LOGIN NEGATIVE', () => {
    before('open Login page and verify it is the right page', () => {
        LoginPageNewVersion.open();
    });

    it('should login and verify you are on the right page', () => {
        LoginPageNewVersion.sumbitLogin(student.email, student.password);
        //expect(ProfilePageNewVersion.title).eq(profilePageElements.title); - in real world, when page titles are different
        expect(ProfilePageNewVersion.heading).eq(profilePageElements.heading);
    });

    it('should get positive login notification', () => {
        expect(ProfilePageNewVersion.notification.includes(profilePageElements.successLoginMsg)).true;
    });

    it('should logout and verify you are on the right page', () => {
        ProfilePageNewVersion.sumbitLogout();
        //expect(LoginPageNewVersion.title).eq(loginPageElements.title); - in real world, when page titles are different
        expect(LoginPageNewVersion.heading).eq(loginPageElements.heading);
    });

    it('should try to login with wrong email and get failed message', () => {
        browser.refresh();
        LoginPageNewVersion.sumbitLogin(loginWrongEmail.email, student.password);
        expect(LoginPageNewVersion.heading).eq(loginPageElements.heading);
        expect(LoginPageNewVersion.notification.includes(errorMessages.authFailed)).true;
    });

    it('should try to login with wrong password and get failed message', () => {
        browser.refresh();
        LoginPageNewVersion.sumbitLogin(student.email, loginWrongPassword.password);
        expect(LoginPageNewVersion.heading).eq(loginPageElements.heading);
        expect(LoginPageNewVersion.notification.includes(errorMessages.authFailed)).true;
    });

    it('should try to login with invalid email and get failed message', () => {
        browser.refresh();
        LoginPageNewVersion.sumbitInvalidEmail(loginInvalidEmail1.email, student.password);
        expect(LoginPageNewVersion.heading).eq(loginPageElements.heading);
        expect(LoginPageNewVersion.invalidEmailNotification.includes(errorMessages.invalidEmail)).true;
    });
});
