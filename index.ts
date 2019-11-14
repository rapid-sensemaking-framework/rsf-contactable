import {
  ContactableSpecifyInit, ContactableInitConfig, ContactableConfig, Contactable
} from 'rsf-types'

import {
  init as textableInit,
  Textable,
  TYPE_KEY as TEXT_TYPE_KEY,
  shutdown as textableShutdown
} from 'rsf-textable'

import {
  init as mattermostableInit,
  Mattermostable,
  TYPE_KEY as MATTERMOST_TYPE_KEY,
  shutdown as mattermostableShutdown
} from 'rsf-mattermostable'

import {
  init as telegramableInit,
  Telegramable,
  TYPE_KEY as TELEGRAM_TYPE_KEY,
  shutdown as telegramableShutdown
} from 'rsf-telegramable'

let twilio: boolean, telegram: boolean, mattermost: boolean
const init = (
  contactableSpecifyInit: ContactableSpecifyInit,
  contactableInitConfig: ContactableInitConfig
) => {
  const { doMattermost, doText, doTelegram } = contactableSpecifyInit
  const { mattermostable, textable, telegramable } = contactableInitConfig
  const initializers = []
  // MATTERMOST
  if (doMattermost) {
    initializers.push(mattermostableInit(mattermostable))
    mattermost = true
  }
  // TWILIO
  if (doText) {
    initializers.push(textableInit(textable))
    twilio = true
  }
  // TELEGRAM
  if (doTelegram) {
    initializers.push(telegramableInit(telegramable))
    telegram = true
  }
  return Promise.all(initializers)
}

const shutdown = async (): Promise<void> => {
  console.log('rsf-contactable performing shutdown')
  const shutdowns = []
  if (mattermost) {
    shutdowns.push(mattermostableShutdown().then(() => {
      mattermost = false
    }))
  }
  if (twilio) {
    shutdowns.push(textableShutdown().then(() => {
      twilio = false
    }))
  }
  if (telegram) {
    shutdowns.push(telegramableShutdown().then(() => {
      telegram = false
    }))
  }
  await Promise.all(shutdowns)
  console.log('rsf-contactable shutdown completed successfully')
}

const makeContactable = (personConfig: ContactableConfig): Contactable => {
  switch (personConfig.type) {
    case (TEXT_TYPE_KEY):
      return new Textable(personConfig.id, personConfig.name)
    case (MATTERMOST_TYPE_KEY):
      return new Mattermostable(personConfig.id, personConfig.name)
    case (TELEGRAM_TYPE_KEY):
      return new Telegramable(personConfig.id, personConfig.name)
    // extend to different types here
    // hopefully email, first of all
  }
}


const newMockMakeContactable = (spyCreator) => {
  const defaultListen = (text: string) => { }
  return (person_config: ContactableConfig) => {
    let listenCb = defaultListen
    const newC = {
      id: person_config.id,
      speak: spyCreator(),
      listen: (cb: (text: string) => void) => {
        // override listenCb
        listenCb = cb
      },
      stopListening: () => {
        listenCb = defaultListen
      },
      // force call to listenCb
      trigger: (text: string) => listenCb(text)
    }
    return newC
  }
}

export {
  init,
  shutdown,
  makeContactable,
  newMockMakeContactable
}