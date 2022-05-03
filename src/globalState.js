import { atom } from "recoil";

const localStorageEffect = key => ({setSelf, onSet}) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
    }
  
    onSet((newValue, _, isReset) => {
        isReset
            ? localStorage.removeItem(key)
            : localStorage.setItem(key, JSON.stringify(newValue));
    });
};
  
export const themeState = atom({
    key: 'theme',
    default: 'moodle-light',
    effects: [
        localStorageEffect('theme'),
    ]
});

export const modeState = atom({
    key: 'mode',
    default: 'search',
    effects: [
        localStorageEffect('mode'),
    ]
});

export const showIncorrectAnswersState = atom({
    key: 'showIncorrectAnswers',
    default: false,
    effects: [
        localStorageEffect('showIncorrectAnswers'),
    ]
});

export const menuOpenedState = atom({
    key: 'menuOpened',
    default: false
});

export const searchedStringState = atom({
    key: 'searchedString',
    default: ''
});