import { expect } from 'chai';
import FlashCardsPage from '../../_page/FlashCardsPage';
import LoginPage from '../../user/_page/LoginPage';
import { positive, pageTitle } from '../../_data/newCard.data';
import {admin, student} from '../../user/_data/user.data';
import axios from "axios";

describe('APPROVE CARD - DATABASE REQUESTS', () => {

  let flashCardId;

  it('should create new card and store its id', async() => {
    const response = await axios({
      method: 'post',
      url: 'https://server-stage.pasv.us/flash/card',
      headers: {
        Authorization: process.env.ADMIN_TOKEN,
      },
      data: {
        "flashGroupId": "5e673dd943724b003ca6e7d8",
        "question": positive.questionText,
        "answer": positive.answerText,
      },
    })
        .then(res => res)
        .catch(err => err);
    flashCardId = response.data.payload.flashCardId;
    expect(response.status).eq(200);
    expect(response.data.success).true;

  });

  it('should approve flash card', async() => {
    const response = await axios({
      method: 'post',
      url: `https://server-stage.pasv.us/flash/card/${flashCardId}/status`,
      headers: {
        Authorization: process.env.ADMIN_TOKEN,
      },
      data: {
        "status": "approved",
      },
    })
        .then(res => res)
        .catch(err => err);
    expect(response.status).eq(200);
    expect(response.data.success).true;
    expect(response.data.payload.message).eq("Flash Card updated");

  });

  it('should verify that card status is approved', async() => {
    const response = await axios({
      method: 'get',
      url: `https://server-stage.pasv.us/flash/card/${flashCardId}`,
      headers: {
        Authorization: process.env.ADMIN_TOKEN,
      },
    })
        .then(res => res)
        .catch(err => err);
    expect(response.status).eq(200);
    expect(response.data.status).eq("approved");

  });
});
