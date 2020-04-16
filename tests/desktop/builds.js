const axios = require('axios');
const { assert } = require('chai');

describe('Builds page', async () => {
  beforeEach(async () => {
    await axios.post('http://localhost:4000/api/settings', {
      repoName: 'artemkopylov04/ya-node',
      buildCommand: 'npm run build',
      mainBranch: 'master',
      period: 13,
    });
  });

  it('should show empty builds', function () {
    return this.browser
      .url('http://localhost:4000/')
      .waitForVisible('.history', 6000)
      .then(assert.isTrue);
  });

  it('run build', function () {
    return this.browser
      .url('http://localhost:4000/')
      .waitForVisible('.icon_play', 6000)
      .click('.icon_play')
      .setValue('.form__input input', 'd0b1ec98a59258a62a20c9c4310ed86153330394')
      .click('.form__btn_save')
      .waitForVisible('.card__commit-message_extended_true', 6000)
      .isExisting('.card__commit-message_extended_true')
      .then(assert.isTrue);
  });
});
