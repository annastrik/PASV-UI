import { expect } from 'chai';
import Menu from '../../_page/Menu';
import FlashCardsPage from '../../_page/FlashCardsPage';
import LoginPage from '../../user/_page/LoginPage';
import { student } from '../../user/_data/user.data';
import CardsTrainingPage from '../_page/CardsTrainingPage';

let nrOfCards;

describe('CARDS TRAINING', () => {
  before('login as student and open Cards page from Home page', () => {
    LoginPage.login(student);
    Menu.cardsLink.click();
    browser.waitUntil(() => FlashCardsPage.h1.getText() === 'FlashCards', 2000);
  });

  it('should find `Test Group` group and click', () => {
    FlashCardsPage.linkToGroup.scrollIntoView();
    FlashCardsPage.linkToGroup.click();
    browser.waitUntil(() => CardsTrainingPage.groupTitle.getText() === 'TestGroup', 100);
  });

  it('should check number of cards in a group from CompactView page', () => {
    FlashCardsPage.compactViewLink.waitForDisplayed();
    FlashCardsPage.compactViewLink.click();
    $('//div[@class="pb-1 mb-1 border-bottom"]').waitForDisplayed();
    nrOfCards = CardsTrainingPage.cardsList.length;
  });

  it('should click `Training` link', () => {
    FlashCardsPage.trainingLink.waitForDisplayed();
    FlashCardsPage.trainingLink.click();
    browser.pause(500);
  });

  it('should click `I Know` until StartTraining button is displayed and click on it', () => {
    while (!CardsTrainingPage.startTrainingBtn.isDisplayed()) {
        CardsTrainingPage.iKnowBtnClick();
        browser.pause(700);
      }
      CardsTrainingPage.startTrainingClick();
  });

  it('should check if `I know` button is displayed', () => {
    CardsTrainingPage.iKnowBtn.waitForDisplayed();
  });

  it('should check if `Show answer` button is displayed', () => {
    CardsTrainingPage.showAnswerBtn.waitForDisplayed();
  });

  it('should check if `Get random next` button is displayed', () => {
    CardsTrainingPage.getRandomBtn.waitForDisplayed();
  });

  it('should click `Show answer` button and check if answer is displayed', () => {
    CardsTrainingPage.showAnswerBtnClick();
    CardsTrainingPage.answerTxt.waitForDisplayed();
  });

  it('should click `Get Random` button and wait for action buttons for display', () => {
    CardsTrainingPage.getRandomBtnClick();
    CardsTrainingPage.iKnowBtn.waitForDisplayed();
  });

  it('should click `I know` until FlashGroup finished and check values in Progress Bar', () => {
    for (let i = 0; i < nrOfCards; i++) {
      expect(CardsTrainingPage.progressBar.getAttribute('aria-valuenow')).eq(
        Math.floor((100 / nrOfCards) * i).toString(),
      );
      CardsTrainingPage.iKnowBtnClick();
      browser.pause(700);
    }
  });

  it('should check if `Start training` button is enabled', () => {
    CardsTrainingPage.startTrainingBtn.waitForEnabled();
  });
});
