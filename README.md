# rsf-contactable

The primary handler for mapping different configuration types to different Contactable carrier implementations


Supported carrier Contactable implementations so far: 
- [rsf-textable](https://github.com/rapid-sensemaking-framework/rsf-textable): `phone` -> `Textable`, will speak to and listen to someone at a given phone number, via [Twilio](https://www.twilio.com/) APIs
- [rsf-mattermostable](https://github.com/rapid-sensemaking-framework/rsf-mattermostable): `mattermost` -> `Mattermostable`, will speak and listen to someone at a given username at a given Mattermost server
- [rsf-telegramable](https://github.com/rapid-sensemaking-framework/rsf-telegramable): `telegram` -> `Telegramable`, will speak and listen to someone at a given username on Telegram