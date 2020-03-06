import { expect } from 'chai';
import { student } from '../../user/_data/user.data';
import LoginPage from '../../user/_page/LoginPage';
import Menu from '../../_page/Menu';
import GroupsPage from '../_page/GroupsPage';
import GroupRating from '../_page/GroupRating';

describe('GROUP RATING', () => {
  before('login as student and open Groups page from Home page', () => {
    LoginPage.login(student);
    Menu.groupLink.click();
    browser.waitUntil(() => GroupsPage.h1.getText() === 'Groups');
  });

  it('should click "Group4Test" link', () => {
    GroupsPage.group4TestLink.scrollIntoView();
    GroupsPage.group4TestLink.click();
    browser.waitUntil(() => GroupRating.h1.getText() === 'Group Group4Test');
  });

  it('should click Rating link', () => {
    GroupRating.ratingLink.click();
    GroupRating.ratingTable.waitForDisplayed(500);
  });

  it('should have `facebook` icon', () => {
    expect(GroupRating.facebookLink.getAttribute('href')).include('facebook');
    expect(GroupRating.facebookLink.getAttribute('target')).eq('_blank');
  });

  it('should have `LinkedIn` icon', () => {
    expect(GroupRating.LinkedInLink.getAttribute('href')).include('linkedin');
    expect(GroupRating.LinkedInLink.getAttribute('target')).eq('_blank');
  });

  it('should have `GitHub` icon', () => {
    expect(GroupRating.gitHubLink.getAttribute('href')).include('github');
    expect(GroupRating.gitHubLink.getAttribute('target')).eq('_blank');
  });

  it('should have `Codewars` icon', () => {
    expect(GroupRating.codewarsLink.getAttribute('href')).include('codewars');
    expect(GroupRating.codewarsLink.getAttribute('target')).eq('_blank');
  });

  it('should click `Name` columnheader and check order is ascending', () => {
    GroupRating.nameColumnHeader.click();
    expect(GroupRating.nameColumnHeader.getAttribute('class')).include('-sort-asc');
  });

  it('should click `Name` columnheader and check order is descending', () => {
    GroupRating.nameColumnHeader.click();
    expect(GroupRating.nameColumnHeader.getAttribute('class')).include('-sort-desc');
  });

  it('should click `D` columnheader and check order is ascending', () => {
    GroupRating.dColumnHeader.click();
    expect(GroupRating.dColumnHeader.getAttribute('class')).include('-sort-asc');
  });

  it('should click `D` columnheader and check order is descending', () => {
    GroupRating.dColumnHeader.click();
    expect(GroupRating.dColumnHeader.getAttribute('class')).include('-sort-desc');
  });

  it('should click `Honor` columnheader and check order is ascending', () => {
    GroupRating.honorColumnHeader.click();
    expect(GroupRating.honorColumnHeader.getAttribute('class')).include('-sort-asc');
  });

  it('should click `Honor` columnheader and check order is descending', () => {
    GroupRating.honorColumnHeader.click();
    expect(GroupRating.honorColumnHeader.getAttribute('class')).include('-sort-desc');
  });

  it('should click `Tasks` columnheader and check order is ascending', () => {
    GroupRating.tasksColumnHeader.click();
    expect(GroupRating.tasksColumnHeader.getAttribute('class')).include('-sort-asc');
  });

  it('should click `Tasks` columnheader and check order is descending', () => {
    GroupRating.tasksColumnHeader.click();
    expect(GroupRating.tasksColumnHeader.getAttribute('class')).include('-sort-desc');
  });

  it('should click `Trend` columnheader and check order is ascending', () => {
    GroupRating.trendColumnHeader.click();
    expect(GroupRating.trendColumnHeader.getAttribute('class')).include('-sort-asc');
  });

  it('should click `Trend` columnheader and check order is descending', () => {
    GroupRating.trendColumnHeader.click();
    expect(GroupRating.trendColumnHeader.getAttribute('class')).include('-sort-desc');
  });

  it('should click `Pulse` columnheader and check order is ascending', () => {
    GroupRating.pulseColumnHeader.click();
    expect(GroupRating.pulseColumnHeader.getAttribute('class')).include('-sort-asc');
  });

  it('should click `Pulse` columnheader and check order is descending', () => {
    GroupRating.pulseColumnHeader.click();
    expect(GroupRating.pulseColumnHeader.getAttribute('class')).include('-sort-desc');
  });

  it('should check if students go to the right place after sorting in `D` column', () => {
    const length = $$('//div[@class="rt-tr-group"]').length;
    for (let i = 1; i <= length; i++) {
      GroupRating.dColumnHeader.click();
      const actualName = $(`(${'//div[@class="rt-tr-group"]'})[${i}]//div[@class="rt-td"]//a[1]`).getText();
      GroupRating.dColumnHeader.click();
      const expectedNameAfterSort = $(`(${'//div[@class="rt-tr-group"]'})[${length+1-i}]//div[@class="rt-td"]//a[1]`).getText();
      expect(actualName).eq(expectedNameAfterSort);
    }
  });

  it('should check if students go to the right place after sorting in `honor` column', () => {
    const length = $$('//div[@class="rt-tr-group"]').length;
    for (let i = 1; i <= length; i++) {
      GroupRating.honorColumnHeader.click();
      const actualName = $(`(${'//div[@class="rt-tr-group"]'})[${i}]//div[@class="rt-td"]//a[1]`).getText();
      GroupRating.honorColumnHeader.click();
      const expectedNameAfterSort = $(`(${'//div[@class="rt-tr-group"]'})[${length+1-i}]//div[@class="rt-td"]//a[1]`).getText();
      expect(actualName).eq(expectedNameAfterSort);
    }
  });

  it('should check if students go to the right place after sorting in `tasks` column', () => {
    const length = $$('//div[@class="rt-tr-group"]').length;
    for (let i = 1; i <= length; i++) {
      GroupRating.tasksColumnHeader.click();
      const actualName = $(`(${'//div[@class="rt-tr-group"]'})[${i}]//div[@class="rt-td"]//a[1]`).getText();
      GroupRating.tasksColumnHeader.click();
      const expectedNameAfterSort = $(`(${'//div[@class="rt-tr-group"]'})[${length+1-i}]//div[@class="rt-td"]//a[1]`).getText();
      expect(actualName).eq(expectedNameAfterSort);
    }
  });

  it('should check if students go to the right place after sorting in `trend` column', () => {
    const length = $$('//div[@class="rt-tr-group"]').length;
    for (let i = 1; i <= length; i++) {
      GroupRating.trendColumnHeader.click();
      const actualName = $(`(${'//div[@class="rt-tr-group"]'})[${i}]//div[@class="rt-td"]//a[1]`).getText();
      GroupRating.trendColumnHeader.click();
      const expectedNameAfterSort = $(`(${'//div[@class="rt-tr-group"]'})[${length+1-i}]//div[@class="rt-td"]//a[1]`).getText();
      expect(actualName).eq(expectedNameAfterSort);
    }
  });

  it('should check if students go to the right place after sorting in `pulse` column', () => {
    const length = $$('//div[@class="rt-tr-group"]').length;
    for (let i = 1; i <= length; i++) {
      GroupRating.pulseColumnHeader.click();
      const actualName = $(`(${'//div[@class="rt-tr-group"]'})[${i}]//div[@class="rt-td"]//a[1]`).getText();
      GroupRating.pulseColumnHeader.click();
      const expectedNameAfterSort = $(`(${'//div[@class="rt-tr-group"]'})[${length+1-i}]//div[@class="rt-td"]//a[1]`).getText();
      expect(actualName).eq(expectedNameAfterSort);
    }
  });
});
