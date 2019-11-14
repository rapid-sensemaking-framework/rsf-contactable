import { ContactableSpecifyInit, ContactableInitConfig, ContactableConfig, Contactable } from 'rsf-types';
declare const init: (contactableSpecifyInit: ContactableSpecifyInit, contactableInitConfig: ContactableInitConfig) => Promise<any[]>;
declare const shutdown: () => Promise<void>;
declare const makeContactable: (personConfig: ContactableConfig) => Contactable;
declare const newMockMakeContactable: (spyCreator: any) => (person_config: ContactableConfig) => {
    id: string;
    speak: any;
    listen: (cb: (text: string) => void) => void;
    stopListening: () => void;
    trigger: (text: string) => void;
};
export { init, shutdown, makeContactable, newMockMakeContactable };
