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

  context('when valid types are called before calling init', function () {
    it('should throw an error', () => {
      try {
        makeContactable({ type: 'phone', id: '+12223334444' })
      } catch (e) {
        expect(e.toString()).to.equal('Error: init has not been called')
      }
    })
  })
})

// uncomment and run for manual testing

// const which = {
//   doTelegram: true
// }
// const config = {
//   telegramable: { socketUrl: 'wss://rsf-telegram-bot.herokuapp.com' }
// }
// init(which, config).then(() => {
//   const tg_username = process.env.TEST_TG_USERNAME
//   console.log('making a contactable type telegram with username: ' + tg_username)
//   const a = makeContactable({ type: 'telegram', id: tg_username })
//   console.log('listening for (and logging) all user messages')
//   a.listen((message) => {
//     console.log('received message: ' + message)
//   })
//   console.log('sending message "hello!" to user')
//   a.speak('hello!')
//   console.log('waiting ten seconds to allow manual testing')
//   console.log('try sending a message back')
//   setTimeout(async () => {
//     await shutdown()
//   }, 10000)
// })