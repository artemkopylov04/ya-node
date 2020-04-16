const { assert } = require('chai');

describe('settings', () => {
  it('should find settings button, then click it, then find cancel button', function () {
    return this.browser
      .url('http://localhost:4000/')
      .waitForVisible('[href="/settings"]', 3000)
      .click('[href="/settings"]')
      .waitForVisible('.form__btn_cancel', 3000)
      .getText('.form__btn_cancel')
      .then((res) => assert.equal(res, 'Cancel'));
  });

  it('should find 2 inputs, input, then find Save', function () {
    return this.browser
      .url('http://localhost:4000/settings')
      .waitForVisible('.form__input', 3000)
      .addValue('.form__input input', 'test')
      .waitForVisible('.form__btn_cancel', 6000)
      .getText('.form__btn_save')
      .then((res) => assert.equal(res, 'Save'));
  });
});
