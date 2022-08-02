import Posts from './posts';
import GeoLocation from './geo';
import Popup from './popup';

export default class Timeline {
  constructor(container) {
    if (typeof document !== 'undefined') {
      this.container = container;
      this.posts = new Posts();
    }
  }

  init() {
    if (typeof localStorage !== 'undefined') {
      if (localStorage.posts === undefined) {
        this.posts.save([
          {
            text: 'post',
            time: '11.11.2011 10:54',
            coords: '[55.755246, 37.617779]'
          }
        ]);
      }
    }

    if (typeof document !== 'undefined') {
      document.addEventListener('DOMContentLoaded', () => {
        this.addAll(document.querySelector('.timeline'), this.posts.load());

        this.input = this.container.querySelector('.input');
        this.input.parentNode.addEventListener('submit', (e) => {
          this.onSubmit(e);
        });
      });
    }
  }

  add(parent, payload) {
    if (typeof document !== 'undefined') {
      const item = document.createElement('div');
      item.classList.add('post');
      item.innerHTML = `
        <p class='label'>text:</p>
        <p class='text'>${payload.text}</p>
        <p class='label'>time:</p>
        <p class='time'>${payload.time}</p>
        <p class='label'>coords:</p>
        <p class='coords'>${payload.coords}</p>
      `;
      parent.appendChild(item);
    }
  }

  addAll(parent, arr) {
    arr.forEach((item) => this.add(parent, item));
  }

  getAllPosts() {
    const all = [];
    if (typeof document !== 'undefined') {
      const posts = [...document.querySelectorAll('.post')];
      posts.forEach((item) => {
        all.push({
          text: item.querySelector('.text').textContent,
          time: item.querySelector('.time').textContent,
          coords: item.querySelector('.coords').textContent
        });
      });
    }
    return all;
  }

  createDate() {
    this.date = new Date();
    this.dailyFormatter = new Intl.DateTimeFormat('ru', {
      hour: 'numeric',
      minute: 'numeric'
    });
    this.yearFormatter = new Intl.DateTimeFormat('ru', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
    return `${this.yearFormatter.format(
      this.date
    )} ${this.dailyFormatter.format(this.date)}`;
  }

  onError() {
    const { value } = this.input;
    const popup = new Popup();
    popup.showPopup();
    document.addEventListener('valid', () => {
      if (popup.value) {
        popup.hidePopup();
        const post = {
          text: value,
          time: this.createDate(),
          coords: popup.value
        };
        this.add(document.querySelector('.timeline'), post);
        this.posts.save(this.getAllPosts());
      }
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { value } = this.input;
    const geoLoc = new GeoLocation();
    geoLoc.getGeo().then(
      () => {
        const post = {
          text: value,
          time: this.createDate(),
          coords: geoLoc.coordsText
        };
        this.add(document.querySelector('.timeline'), post);
        this.posts.save(this.getAllPosts());
      },
      () => {
        this.onError();
      }
    );
  }
}
