import {expect}  from 'chai';
import LoginPageNewVersion from '../_page/LoginPageNewVersion';
import ProfilePageNewVersion from '../_page/ProfilePageNewVersion';
import {student, loginInvalidEmail1, loginWrongEmail, loginWrongPassword} from  '../_data/user.data.new.version';
import {profilePageElements} from  '../_data/profile.data.new.version';
import {loginPageElements, errorMessages} from  '../_data/login.data.new.version';

describe('LOGIN NEGATIVE', () => {
    before('open Login page and verify it is the right page', () => {
        LoginPageNewVersion.open();
    });

    it('should try to login with WRONG EMAIL', () => {
        LoginPageNewVersion.sumbitLogin(loginWrongEmail.email, student.password);
        expect(LoginPageNewVersion.heading).eq(loginPageElements.heading);
        expect(LoginPageNewVersion.notification.includes(errorMessages.authFailed)).true;
    });

    it('should try to login with WRONG PASSWORD', () => {
        browser.refresh();
        LoginPageNewVersion.sumbitLogin(student.email, loginWrongPassword.password);
        expect(LoginPageNewVersion.heading).eq(loginPageElements.heading);
        expect(LoginPageNewVersion.notification.includes(errorMessages.authFailed)).true;
    });

    it('should try to login with INVALID EMAIL', () => {
        browser.refresh();
        LoginPageNewVersion.sumbitInvalidEmail(loginInvalidEmail1.email, student.password);
        expect(LoginPageNewVersion.heading).eq(loginPageElements.heading);
        expect(LoginPageNewVersion.invalidEmailNotification.includes(errorMessages.invalidEmail)).true;
    });
});
