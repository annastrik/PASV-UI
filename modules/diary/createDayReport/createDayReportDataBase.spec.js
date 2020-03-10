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
import {newUserData} from "../../user/_data/userRegistration.data";
import {expect} from "chai";

describe('CREATE DAY REPORT', () => {
  before('should login as STUDENT, navigate to Day Report page', () => {
    LoginPage.login(student);
    CreateDayReportPage.diaryLink.click();
  });

  it('should create Day Report', () => {
    CreateDayReportPage.createNewDayReport();
  });

  let diaryId;

  it('should create Day Report as API', async() => {
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
    console.log(response);
    diaryId = response.data.payload.diaryId;
    console.log(diaryId);
    expect(response.status).eq(200);
    expect(response.data.success).true;

  });

  it('should verify from database that diary is created', async() => {
    const response = await axios({
      method: 'get',
      url: `https://server-stage.pasv.us/diary/${diaryId}`,
      headers: {
        Authorization: process.env.ADMIN_TOKEN,
      },
    })
        .then(res => res)
        .catch(err => err);
    console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr " + response.data.description);
    expect(response.status).eq(200);
    expect(response.data.description).eq(howWasYourDayInputs[4]);
    expect(response.data.owner.name).eq("Admin PASV");

  });


});
