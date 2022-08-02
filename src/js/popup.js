import Validate from './validate';

export default class Popup {
  constructor() {
    this.popup = document.querySelector('.popup');
    this.btn = document.querySelector('.popup__btn');
    this.input = document.querySelector('.popup__input');
    this.opened = false;
    this.value = null;
  }

  showPopup() {
    this.opened = true;
    this.popup.classList.add('visible');
    this.btn.addEventListener('click', () => this.onClick());
  }

  hidePopup() {
    this.opened = false;
    this.popup.classList.remove('visible');
    this.btn.removeEventListener('click', () => this.onClick());
  }

  onClick() {
    /* eslint-disable consistent-return */
    const { value } = this.input;
    const validate = new Validate(value);
    const validity = validate.check();
    if (validity === false) return false;
    if (validity === true) {
      const event = new Event('valid');
      document.dispatchEvent(event);
      this.value = value;
    }
    return true;
  }
}
