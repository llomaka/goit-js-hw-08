import 'vimeo';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo.Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';
let pausedValue = localStorage.getItem(STORAGE_KEY);
if (!pausedValue) { pausedValue = 0 };
const pauseVideo = function ({ seconds, percent }) {
  if (percent < 1) {
    localStorage.setItem(STORAGE_KEY, seconds);
  } else {
    localStorage.setItem(STORAGE_KEY, 0);
  }
};
player.on('timeupdate', throttle(pauseVideo, 1000));
player.setCurrentTime(pausedValue).then(function(seconds) {
  seconds = pausedValue;
}).catch(function (error) {
  console.log(error);
});
player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});