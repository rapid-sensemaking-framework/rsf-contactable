"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var rsf_textable_1 = require("rsf-textable");
var rsf_mattermostable_1 = require("rsf-mattermostable");
var rsf_telegramable_1 = require("rsf-telegramable");
var twilio, telegram, mattermost;
var init = function (contactableSpecifyInit, contactableInitConfig) {
    var doMattermost = contactableSpecifyInit.doMattermost, doText = contactableSpecifyInit.doText, doTelegram = contactableSpecifyInit.doTelegram;
    var mattermostable = contactableInitConfig.mattermostable, textable = contactableInitConfig.textable, telegramable = contactableInitConfig.telegramable;
    var initializers = [];
    // MATTERMOST
    if (doMattermost) {
        initializers.push(rsf_mattermostable_1.init(mattermostable));
        mattermost = true;
    }
    // TWILIO
    if (doText) {
        initializers.push(rsf_textable_1.init(textable));
        twilio = true;
    }
    // TELEGRAM
    if (doTelegram) {
        initializers.push(rsf_telegramable_1.init(telegramable));
        telegram = true;
    }
    return Promise.all(initializers);
};
exports.init = init;
var shutdown = function () { return __awaiter(void 0, void 0, void 0, function () {
    var shutdowns;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('rsf-contactable performing shutdown');
                shutdowns = [];
                if (mattermost) {
                    shutdowns.push(rsf_mattermostable_1.shutdown().then(function () {
                        mattermost = false;
                    }));
                }
                if (twilio) {
                    shutdowns.push(rsf_textable_1.shutdown().then(function () {
                        twilio = false;
                    }));
                }
                if (telegram) {
                    shutdowns.push(rsf_telegramable_1.shutdown().then(function () {
                        telegram = false;
                    }));
                }
                return [4 /*yield*/, Promise.all(shutdowns)];
            case 1:
                _a.sent();
                console.log('rsf-contactable shutdown completed successfully');
                return [2 /*return*/];
        }
    });
}); };
exports.shutdown = shutdown;
var makeContactable = function (personConfig) {
    switch (personConfig.type) {
        case (rsf_textable_1.TYPE_KEY):
            return new rsf_textable_1.Textable(personConfig.id, personConfig.name);
        case (rsf_mattermostable_1.TYPE_KEY):
            return new rsf_mattermostable_1.Mattermostable(personConfig.id, personConfig.name);
        case (rsf_telegramable_1.TYPE_KEY):
            return new rsf_telegramable_1.Telegramable(personConfig.id, personConfig.name);
        default:
            var errorString = '';
            var validTypes = [rsf_textable_1.TYPE_KEY, rsf_mattermostable_1.TYPE_KEY, rsf_telegramable_1.TYPE_KEY];
            errorString += "Invalid type key for ContactableConfig: " + JSON.stringify(personConfig) + ".";
            errorString += " Valid types are " + validTypes.join(', ') + ".";
            throw new Error(errorString);
        // extend to different types here
        // hopefully email, first of all
    }
};
exports.makeContactable = makeContactable;
var newMockMakeContactable = function (spyCreator) {
    var defaultListen = function (text) { };
    return function (person_config) {
        var listenCb = defaultListen;
        var newC = {
            id: person_config.id,
            speak: spyCreator(),
            listen: function (cb) {
                // override listenCb
                listenCb = cb;
            },
            stopListening: function () {
                listenCb = defaultListen;
            },
            // force call to listenCb
            trigger: function (text) { return listenCb(text); }
        };
        return newC;
    };
};
exports.newMockMakeContactable = newMockMakeContactable;
