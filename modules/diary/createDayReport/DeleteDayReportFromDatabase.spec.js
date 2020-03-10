import LoginPage from '../../user/_page/LoginPage';
import LogoutPage from '../../user/_page/LogoutPage';
import CreateDayReportPage from '../_page/CreateDayReportPage';
import { student } from '../../user/_data/user.data';
import {
  createDayReport,
  hoursStudiedInputs,
  howWasYourDayInputs,
  instructionsToCheckMarks
} from '../_data/createDayReport.data';
import axios from "axios";
import {expect} from "chai";

describe('DELETE DAY REPORT', () => {
  let diaryId;
  it('should create daily report', async() => {
    const response = await axios({
      method: 'post',
      url: 'https://server-stage.pasv.us/diary',
      headers: {
        Authorization: process.env.ADMIN_TOKEN,
      },
      data: {
        "description": howWasYourDayInputs[4],
        "labels": ["help_classmates", "understood_everything"],
        "morale": "8",
        "hours": hoursStudiedInputs[4]
      },
    })
        .then(res => res)
        .catch(err => err);
    diaryId = response.data.payload.diaryId;
    expect(response.status).eq(200);
    expect(response.data.success).true;
  });

  it('should delete diary report', async() => {
    const response = await axios({
      method: 'delete',
      url: `https://server-stage.pasv.us/diary/${diaryId}`,
      headers: {
        Authorization: process.env.ADMIN_TOKEN,
      },
    })
        .then(res => res)
        .catch(err => err);
    expect(response.status).eq(200);
    expect(response.data.message).eq("Diary deleted");
    expect(response.data.success).true;
  });

});
