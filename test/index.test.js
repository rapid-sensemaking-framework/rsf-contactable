const { expect } = require('chai')
const sinon = require('sinon')
const { init, shutdown, makeContactable } = require('../index')

describe('makeContactable', () => {
  context('when an invalid type is passed', function () {
    it('should throw an error', () => {
      try {
        makeContactable({ type: 'jungle', id: 'cat' })
      } catch (e) {
        expect(e.toString()).to.equal('Error: Invalid type key for ContactableConfig: {"type":"jungle","id":"cat"}. Valid types are phone, mattermost, telegram.')
      }
    })
  })
})

/*

      const which = {
        doTelegram: true
      }
      const config = {
        telegramable: { socketUrl: 'wss://rsf-telegram-bot.herokuapp.com' }
      }
      await init(which, config)

*/