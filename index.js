const makeContactable = (person_config) => {
    const { Textable, TYPE_KEY: TEXT_TYPE_KEY } = require('rsf-textable')

    let Contactable
    switch (person_config.type) {
        case (TEXT_TYPE_KEY):
            Contactable = Textable
        // extend to different types here
        // hopefully email, first of all
    }
    return new Contactable(person_config.id, person_config.name)
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