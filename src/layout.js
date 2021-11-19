const engKeyboard = [
    ['§', '±'], ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'],
    ['8', '*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], ['Backspace'], ['Tab'], ['q'], ['w'], ['e'],
    ['r'], ['t'], ['y'], ['u'], ['i'], ['o'], ['p'], ['[', '{'], [']', '}'], ['Del'], ['Caps Lock'], ['a'], ['s'], ['d'],
    ['f'], ['g'], ['h'], ['j'], ['k'], ['l'], [';', ':'], ["'", '"'], ['\\', '|'], ['Enter'], ['Shift'], ['`', '~'], ['z'],
    ['x'], ['c'], ['v'], ['b'], ['n'], ['m'], [',', '<'], ['.', '>'], ['/', '?'], ['ArrowUp'], ['Shift'], ['fn'], ['Ctrl'],
    ['Alt'], ['Cmd'], ['Space'], ['Cmd'], ['Alt'], ['ArrowLeft'], ['ArrowDown'], ['ArrowRight'],
];

const hunKeyboard = [
    ['0', '§'], ['1', '\''], ['2', '"'], ['3', '+'], ['4', '!'], ['5', '%'], ['6', '/'], ['7', '='], ['8', '('], ['9', ')'],
    ['ö'], ['ü'], ['ó'], ['Backspace'], ['Tab'], ['q'], ['w'], ['e'], ['r'], ['t'], ['z'], ['u'], ['i'], ['o'], ['p'],
    ['ő'], ['ú'], ['Del'], ['Caps Lock'], ['a'], ['s'], ['d'], ['f'], ['g'], ['h'], ['j'], ['k'], ['l'], ['é'], ['á'], ['ű'],
    ['Enter'], ['Shift'], ['í'], ['y'], ['x'], ['c'], ['v'], ['b'], ['n'], ['m'], [',', '?'], ['.', ':'], ['-', '_'],
    ['ArrowUp'], ['Shift'], ['fn'], ['Ctrl'], ['Alt'], ['Cmd'], ['Space'], ['Cmd'], ['Alt'], ['ArrowLeft'], ['ArrowDown'],
    ['ArrowRight'],
];

const keys = [
    'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8',
    'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR',
    'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Del',
    'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL',
    'Semicolon', 'Quote', 'Backslash', 'Enter', 'ShiftLeft', 'IntlBackslash', 'KeyZ', 'KeyX',
    'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
    'Fn', 'ControlLeft', 'AltLeft', 'MetaLeft', 'Space', 'MetaRight', 'AltRight', 'ArrowLeft',
    'ArrowDown', 'ArrowRight',
];
// export { engKeyboard };

const layout = {};

keys.forEach((key, index) => {
    layout[key] = { eng: engKeyboard[index], hun: hunKeyboard[index] };
});

export default layout;
