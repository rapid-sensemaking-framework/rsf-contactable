const { init: textableInit, Textable, TYPE_KEY: TEXT_TYPE_KEY } = require('rsf-textable')
const { init: mattermostableInit, Mattermostable, TYPE_KEY: MATTERMOST_TYPE_KEY } = require('rsf-mattermostable')
const { init: telegramableInit, Telegramable, TYPE_KEY: TELEGRAM_TYPE_KEY } = require('rsf-telegramable')

const init = (mattermostBotDetails = '', twilioConfig, telegramConfig) => {
    // MATTERMOST
    mattermostableInit(mattermostBotDetails)
    // TWILIO
    if (twilioConfig) textableInit(twilioConfig)
    // TELEGRAM
    if (telegramConfig) telegramableInit(telegramConfig)
}
module.exports.init = init

const makeContactable = (personConfig) => {
    let Contactable
    switch (personConfig.type) {
        case (TEXT_TYPE_KEY):
            Contactable = Textable
            break
        case (MATTERMOST_TYPE_KEY):
            Contactable = Mattermostable
            break
        case (TELEGRAM_TYPE_KEY):
            Contactable = Telegramable
            break
        // extend to different types here
        // hopefully email, first of all
    }
    return new Contactable(personConfig.id, personConfig.name)
}
module.exports.makeContactable = makeContactable


const newMockMakeContactable = (spyCreator) => {
    return person_config => {
        let listenCb = () => { }
        const newC = {
            id: person_config.id,
            speak: spyCreator(),
            listen: (cb) => {
                // override listenCb
                listenCb = cb
            },
            stopListening: () => {
                listenCb = () => { }
            },
            // force call to listenCb
            trigger: text => listenCb(text)
        }
        return newC
    }
}
module.exports.newMockMakeContactable = newMockMakeContactable