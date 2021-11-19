import layout from './layout.js';

class Keyboard {
    constructor (layout, language) {
        this.layout = layout;
        this.language = language;
        this.value = '';
        this.capsLock = false;
        this.shift = false;
        this.cursorPosition = null;
        this.ctrl = false;
        this.leftAlt = false;
    }

    initDisplay() {
        const body = document.querySelector('body');

        const display = document.createElement('textarea');
        display.setAttribute('class', 'display');
        display.addEventListener('click', () => {
            this.cursorPosition = display.selectionEnd;
        });

        body.appendChild(display);
    }

    updateDisplay() {
        document.querySelector('.display').textContent = this.value;
    }

    addToText(btnValue) {
        if (this.cursorPosition === null) {
            this.value += btnValue;
        } else {
            this.value = this.value.slice(0, this.cursorPosition)
                + btnValue + this.value.slice(this.cursorPosition);
            this.cursorPosition += btnValue.length;
        }

        this.updateDisplay();
    }

    useShift() {
        this.shift = !this.shift;
        const btnsContainer = document.querySelector('.btns-container');
        btnsContainer.childNodes.forEach((btn) => {
            const currentbtn = btn;
            const current = this.layout[btn.name][this.language];
            if (current[1]) {
                if (currentbtn.innerText === current[0]) {
                    currentbtn.innerText = current[1];
                } else {
                    currentbtn.innerText = current[0];
                }
            } else if (currentbtn.innerText.length === 1) {
                if (currentbtn.innerText === currentbtn.innerText.toLowerCase()) {
                    currentbtn.innerText = currentbtn.innerText.toUpperCase();
                } else {
                    currentbtn.innerText = currentbtn.innerText.toLowerCase();
                }
            }
        });
    }

    useBackspace() {
        if (this.cursorPosition === 0) {
            return;
        }

        if (this.cursorPosition !== null) {
            this.value = this.value.slice(0, this.cursorPosition - 1)
                + this.value.slice(this.cursorPosition);
            if (this.cursorPosition > 0) {
                this.cursorPosition -= 1;
            }
        } else {
            this.value = this.value.slice(0, -1);
        }

        this.updateDisplay();
    }

    useDel() {
        if (this.cursorPosition !== null) {
            this.value = this.value.slice(0, this.cursorPosition)
                + this.value.slice(this.cursorPosition + 1);
            this.updateDisplay();
        }
    }

    useCapsLock() {
        this.capsLock = !this.capsLock;

        const capsLock = document.querySelector('[name = "CapsLock"]');
        const btnsContainer = document.querySelector('.btns-container');

        const changeLetterUpperLower = (btn, layout, lang) => {
            const inBtn = btn;
            if (inBtn.innerHTML.length === 1 && layout[btn.name][lang].length === 1) {
                if (inBtn.innerText === inBtn.innerText.toLowerCase()) {
                    inBtn.innerText = inBtn.innerText.toUpperCase();
                } else {
                    inBtn.innerText = inBtn.innerText.toLowerCase();
                }
            }
        };

        if (this.capsLock) {
            capsLock.classList.add('active');
            btnsContainer.childNodes.forEach((btn) => {
                changeLetterUpperLower(btn, this.layout, this.language);
            });
        } else {
            capsLock.classList.remove('active');
            btnsContainer.childNodes.forEach((btn) => {
                changeLetterUpperLower(btn, this.layout, this.language);
            });
        }
    }

    switchLanguage() {
        if (!!this.ctrl && !!this.altLeft) {
            if (this.language === 'eng') {
                this.language = 'hun';
            } else {
                this.language = 'eng';
            }

            localStorage.setItem('language', this.language);

            const btnsContainer = document.querySelector('.btns-container');
            btnsContainer.childNodes.forEach((btn) => {
                if (btn.innerText.length === 1) {
                    btn.innerText = this.layout[btn.name][this.language][0];
                }
            });
        }
    }

    initKeyboard() {
        const body = document.querySelector('body');
        const createIconHTML = (iconName) => `<i class="material-icons">${iconName}</i>`;

        const btnsContainer = document.createElement('div');
        btnsContainer.setAttribute('class', 'btns-container');

        Object.keys(this.layout).forEach((key) => {
            const btn = document.createElement('button');
            const value = this.layout[key][this.language][0];

            btn.innerText = value;
            btn.setAttribute('class', key.toLowerCase());
            btn.setAttribute('name', key);

            switch (value) {
                case 'Backspace':
                    btn.addEventListener('click', () => {
                        this.useBackspace();
                    });
                    break;

                case 'Shift':
                    btn.addEventListener('mousedown', () => {
                        this.useShift(true);
                    });

                    btn.addEventListener('mouseup', () => {
                        this.useShift(false);
                    });
                    break;

                case 'Tab':
                    btn.addEventListener('click', () => {
                        this.addToText('   ');
                    });
                    break;

                case 'Del':
                    btn.addEventListener('click', () => {
                        this.useDel();
                    });
                    break;

                case 'Caps Lock':
                    btn.addEventListener('click', () => {
                        this.useCapsLock();
                    });
                    break;

                case 'Enter':
                    btn.addEventListener('click', () => {
                        this.addToText('\n');
                    });
                    break;

                case 'ArrowUp':
                    btn.innerHTML = createIconHTML('arrow_drop_up');
                    btn.addEventListener('click', () => {
                        this.addToText('↑');
                    });
                    break;

                case 'ArrowLeft':
                    btn.innerHTML = createIconHTML('arrow_left');
                    btn.addEventListener('click', () => {
                        this.addToText('←');
                    });
                    break;

                case 'ArrowDown':
                    btn.innerHTML = createIconHTML('arrow_drop_down');
                    btn.addEventListener('click', () => {
                        this.addToText('↓');
                    });
                    break;

                case 'ArrowRight':
                    btn.innerHTML = createIconHTML('arrow_right');
                    btn.addEventListener('click', () => {
                        this.addToText('→');
                    });
                    break;

                case 'Space':
                    btn.innerText = ' ';
                    btn.addEventListener('click', () => {
                        this.addToText(' ');
                    });
                    break;

                case 'Alt':
                    break;

                case 'Ctrl':
                    break;

                case 'Cmd':
                    break;

                case 'fn':
                    break;

                default:
                    btn.addEventListener('click', () => {
                        this.addToText(btn.innerText);
                    });
            }
            btnsContainer.appendChild(btn);
        });

        body.appendChild(btnsContainer);

        document.body.addEventListener('keydown', (event) => {
            event.preventDefault();
            const currentBtn = document.querySelector(`[name = "${event.code}"]`);

            currentBtn.classList.add('active');

            switch (currentBtn.name) {
                case 'ShiftLeft':
                    this.useShift();
                    break;

                case 'ShiftRight':
                    this.useShift();
                    break;

                case 'Backspace':
                    this.useBackspace();
                    break;

                case 'Tab':
                    this.addToText('   ');
                    break;

                case 'Del':
                    this.useDel();
                    break;

                case 'CapsLock':
                    this.useCapsLock();
                    break;

                case 'Enter':
                    this.addToText('\n');
                    break;

                case 'ArrowUp':
                    this.addToText('↑');
                    break;

                case 'ArrowLeft':
                    this.addToText('←');
                    break;

                case 'ArrowDown':
                    this.addToText('↓');
                    break;

                case 'ArrowRight':
                    this.addToText('→');
                    break;

                case 'Space':
                    this.addToText(' ');
                    break;

                case 'ControlLeft':
                    this.ctrl = true;
                    this.switchLanguage();
                    break;

                case 'AltLeft':
                    this.altLeft = true;
                    this.switchLanguage();
                    break;

                case 'AltRight':
                    break;

                case 'MetaLeft':
                    break;

                case 'MetaRight':
                    break;

                default:
                    this.addToText(currentBtn.innerText);
            }
        });

        document.body.addEventListener('keyup', (event) => {
            event.preventDefault();
            const currentBtn = document.querySelector(`[name = "${event.code}"]`);
            currentBtn.classList.remove('active');

            switch (currentBtn.name) {
                case 'ShiftLeft':
                    this.useShift();
                    break;

                case 'ShiftRight':
                    this.useShift();
                    break;
                case 'CapsLock':
                    this.useCapsLock();
                    break;

                case 'ControlLeft':
                    this.ctrl = false;
                    break;

                case 'AltLeft':
                    this.altLeft = false;
                    break;

                default:
            }
        });
    }
}

let keyBoard;

if (localStorage.getItem('language')) {
    keyBoard = new Keyboard(layout, localStorage.getItem('language'));
} else {
    keyBoard = new Keyboard(layout, 'eng');
}

keyBoard.initDisplay();
keyBoard.initKeyboard();

const body = document.querySelector('body');
const userManual = document.createElement('p');
userManual.setAttribute('class', 'usermanual');

userManual.innerText = 'The keyboard was created in the MacOs operating system\n'
    + 'To switch the language, the combination: left ctrl + left alt';

body.appendChild(userManual);
