const {
    init: textableInit,
    Textable,
    TYPE_KEY: TEXT_TYPE_KEY,
    shutdown: textableShutdown
} = require('rsf-textable')
const {
    init: mattermostableInit,
    Mattermostable,
    TYPE_KEY: MATTERMOST_TYPE_KEY,
    shutdown: mattermostableShutdown
} = require('rsf-mattermostable')
const {
    init: telegramableInit,
    Telegramable,
    TYPE_KEY: TELEGRAM_TYPE_KEY,
    shutdown: telegramableShutdown
} = require('rsf-telegramable')

let twilio, telegram, mattermost
const init = (mattermostBotDetails = '', twilioConfig, telegramConfig) => {
    const initializers = []
    // MATTERMOST
    initializers.push(mattermostableInit(mattermostBotDetails))
    mattermost = true
    // TWILIO
    if (twilioConfig) {
        initializers.push(textableInit(twilioConfig))
        twilio = true
    }
    // TELEGRAM
    if (telegramConfig) {
        initializers.push(telegramableInit(telegramConfig))
        telegram = true
    }
    return Promise.all(initializers)
}
module.exports.init = init

const shutdown = async () => {
    console.log('rsf-contactable performing shutdown')
    const shutdowns = []
    shutdowns.push(mattermostableShutdown())
    if (twilio) {
        shutdowns.push(textableShutdown())
    }
    if (telegram) {
        shutdowns.push(telegramableShutdown())
    }
    await Promise.all(shutdowns)
    mattermost = false
    twilio = false
    telegram = false
}
module.exports.shutdown = shutdown

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