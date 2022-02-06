import 'vimeo';

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo.Player(iframe);
const pauseVideo = function ({ seconds, percent }) {
  if (percent < 1) {
    localStorage.setItem('videoplayer-current-time', seconds);
  } else {
    localStorage.setItem('videoplayer-current-time', 0);
  }
};
player.on('timeupdate', pauseVideo);
player.setCurrentTime(localStorage.getItem('videoplayer-current-time')).then(function(seconds) {
  seconds = localStorage.getItem('videoplayer-current-time');
}).catch(function (error) {
  console.log(error);
});
player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});