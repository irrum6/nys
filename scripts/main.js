console.log(1);
let audio = document.getElementsByTagName("audio")[0];
audio.play();
audio.addEventListener('ended', () => audio.play());