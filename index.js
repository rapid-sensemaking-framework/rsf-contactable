const tx, { Textable, TYPE_KEY: TEXT_TYPE_KEY } = require('rsf-textable')
const mm, { Mattermostable, TYPE_KEY: MATTERMOST_TYPE_KEY } = require('rsf-mattermostable')

const init = (mattermostBotDetails = '', twilioConfig) => {
    // MATTERMOST
    mm.init(mattermostBotDetails)
    // TWILIO
    if (twilioConfig) tx.init(twilioConfig)
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
            // force call to listenCb
            trigger: text => listenCb(text)
        }
        return newC
    }
}
module.exports.newMockMakeContactable = newMockMakeContactable