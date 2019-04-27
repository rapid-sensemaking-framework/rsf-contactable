# rsf-contactable

The primary handler for mapping different configuration types to different Contactable carrier implementations


Supported carrier Contactable implementations so far: 
- `phone` -> `Textable`, will speak to and listen to someone at a given phone number, via [Twilio](https://www.twilio.com/) APIs


## API

### `makeContactable(personConfig) -> result: Contactable`

The primary mapping function from configuration to real implementation of a Contactable

`personConfig`: `PersonConfig`, ...
`PersonConfig.type`: `String`, the type of Contactable to map this person into, e.g. 'phone'
`PersonConfig.id`: `String`, the FULL identifying information required to contact this person via the given `type`
`PersonConfig.name`: `String`, optional, a name of the person

`result`: `Contactable`, an instance of an object/class with methods `.speak(text)` and `.listen(callback)` such that bi-directional communication is possible


### `newMockMakeContactable(spyCreator) -> result: Contactable`

A helper function for doing test driven development of `rsf-x` modules, which creates a function which can create mocked Contactables

`spyCreator`: a function creator, which is used to create the `speak` function of the Contactable, so that it can be inspected for what it gets called with

Adds an extra function to a Contactable called `.trigger(text)` which can be used to simulate input from a person.