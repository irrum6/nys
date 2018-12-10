let audios = document.getElementsByTagName("audio");
let len = audios.length;
for (let i = 0; i < len; i++) {
    audios[i].addEventListener('ended', () => {
        if (i + 1 < len) {
            audios[i + 1].play();
        } else {
            audios[0].play();
        }
    });
}
document.querySelector('button').addEventListener('click', () => audios[0].play());