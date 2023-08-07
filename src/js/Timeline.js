/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
export default class Timeline {
  constructor() {
    this.container = document.querySelector('body');
    this.form = null;
    this.time = null;
    this.latitude = null;
    this.longitude = null;
  }

  init() {
    this.form = document.createElement('form');
    this.form.classList.add('form-chat');
    this.form.innerHTML = `<div class="posts"></div>
      <div class="form-control">
      <input class="input" type="text">
      </div>`;
    this.container.insertAdjacentElement('afterbegin', this.form);
    this.form.addEventListener('submit', this.createPost.bind(this));
  }

  createPost(e) {
    e.preventDefault();
    const { value } = this.form.querySelector('.input');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.time = this.dateToString(position.timestamp);
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.createForm(value, this.time, this.latitude, this.longitude);
      }, (error) => {
        console.log(error);
        this.createFormRequest();
        const form = this.container.querySelector('.form-request');
        form.querySelector('.btn-ok').addEventListener('click', (ev) => {
          ev.preventDefault();
          this.latitude = this.getCoords(form.querySelector('input').value).latitude;
          this.longitude = this.getCoords(form.querySelector('input').value).longitude;
          this.time = this.dateToString(new Date());
          this.container.firstChild.remove();
          this.createForm(value, this.time, this.latitude, this.longitude);
        });
        form.querySelector('.btn-close').addEventListener('click', (event) => {
          event.preventDefault();
          this.container.firstChild.remove();
        });
      });
    }
    this.form.querySelector('.input').value = '';
  }

  getCoords(value) {
    if (value.match(/[^0-9[\]-\s.,]/g)) {
      throw new Error('Неправильные координаты');
    }
    const geo = value.replace(/[[\]\s+]/g, '');
    return {
      latitude: Number(geo.split(',')[0]),
      longitude: Number(geo.split(',')[1]),
    };
  }

  createForm(value, time, longitude, latitude) {
    const post = document.createElement('div');
    post.classList.add('post');
    post.innerHTML = `<p class="text">${value} <span class="time">${time}</span></p>
        <span>[${latitude}, ${longitude}]</span>`;
    const posts = this.form.querySelector('.posts');
    posts.insertAdjacentElement('afterbegin', post);
  }

  createFormRequest() {
    const formRequest = document.createElement('div');
    formRequest.classList.add('form-request');
    formRequest.innerHTML = `<p>Что-то пошло не так</p>
      <p>К сожалению, нам не удалось определить ваше местоположение,
      пожалуйста, дайте разрешение на использование геолокации,
      либо введите координаты вручную.</p>
      <p>Широта и долгота через запятую</p>
      <input type="text">
      <div class="btns">
        <button class="btn btn-close">Отмена</button>
        <button class="btn btn-ok">Ок</button>
      </div>`;
    this.container.insertAdjacentElement('afterbegin', formRequest);
  }

  dateToString() {
    const date = new Date();
    const result = date.toLocaleString('ru-Ru', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
    return result.replace(/[,%]/g, '');
  }
}
