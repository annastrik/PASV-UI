import AppPage from '../../_page/AppPage';
import {expect} from 'chai';

class ProfilePageNewVersion extends AppPage {

    get title() {
        return browser.getTitle();
    }

    get heading() {
        return $('//h3').getText();
    }

    get navigationDropdown() {
        return $('//a[@class="dropdown-toggle nav-link"]');
    }

    get logoutBtn() {
        return $('//button[contains(text(),"Logout")]');
    }

    get notification() {
        return $('//h4[@class="notification-title"]').getText();
    }

    sumbitLogout() {
        super.clickElement(this.navigationDropdown);
        super.clickElement(this.logoutBtn);
    }

}

export default new ProfilePageNewVersion();
