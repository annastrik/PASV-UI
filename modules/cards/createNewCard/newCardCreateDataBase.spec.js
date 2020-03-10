import { expect } from 'chai';
import FlashCardsPage from '../../_page/FlashCardsPage';
import LoginPage from '../../user/_page/LoginPage';
import { positive, pageTitle } from '../../_data/newCard.data';
import { student } from '../../user/_data/user.data';
import axios from "axios";
import {hoursStudiedInputs, howWasYourDayInputs} from "../../diary/_data/createDayReport.data";

describe('CREATE NEW CARD -- POSITIVE', () => {
  before('should login as a student', () => {
    LoginPage.login(student);
  });

  it('should create new card', () => {
    FlashCardsPage.open();
    FlashCardsPage.groupName.click();
    FlashCardsPage.waitingForApproval.click();
    FlashCardsPage.createNewCardBtn.click();
    browser.pause(1000);
    FlashCardsPage.question.setValue(positive.questionText);
    FlashCardsPage.answer.setValue(positive.answerText);
    browser.pause(1000);
    FlashCardsPage.createBtn.click();
    browser.pause(1000);
  });

  let flashCardId;

  it('should create new card and store its id', async() => {
    const response = await axios({
      method: 'post',
      url: 'https://server-stage.pasv.us/flash/card',
      headers: {
        Authorization: process.env.ADMIN_TOKEN,
      },
      data: {
        "flashGroupId": "5e669eff70a41a003c435c33",
        "question": positive.questionText,
        "answer": positive.answerText,
      },
    })
        .then(res => res)
        .catch(err => err);
    console.log(response);
    flashCardId = response.data.payload.flashCardId;
    console.log(flashCardId);
    expect(response.status).eq(200);
    expect(response.data.success).true;

  });

  it('should verify from database that card is created', async() => {
    const response = await axios({
      method: 'get',
      url: `https://server-stage.pasv.us/flash/card/${flashCardId}`,
      headers: {
        Authorization: process.env.ADMIN_TOKEN,
      },
    })
        .then(res => res)
        .catch(err => err);
    console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr " + response.data.description);
    expect(response.status).eq(200);
    expect(response.data.question).eq(positive.questionText);
    expect(response.data.answer).eq(positive.answerText);
    // expect(response.data.owner.name).eq("Admin PASV");

  });

});

