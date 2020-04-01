export default class AppPage {

  open(path) {
    browser.url(path);
  }

  clickElement(locator) {
    locator.waitForClickable();
    locator.click();
  }

}
