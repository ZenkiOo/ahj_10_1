import Timeline from './timeline';

// eslint-disable-next-line
console.log('app.js included');
const container = document.querySelector('.container');
const timeline = new Timeline(container);
timeline.init();
