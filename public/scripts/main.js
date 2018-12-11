let audios = document.getElementsByTagName("audio");
let len = audios.length;
let index = () => Math.floor(Math.random() * len);
for (let i = 0; i < len; i++) {
    audios[i].addEventListener('ended', () => {
        audios[index()].play();
    });
}
document.querySelector('button').addEventListener('click', () => audios[index()].play());