let audios = document.getElementsByTagName("audio");
let len = audios.length;
let index = () => Math.floor(Math.random() * len);
for (let i = 0; i < len; i++) {
    audios[i].addEventListener('ended', () => audios[index()].play());
}
document.querySelector('button').addEventListener('click', (e) => {
    audios[index()].play();
    e.target.disabled = true;
});

//setup counter and count to next year
const toDate = new Date(new Date().getUTCFullYear() + 1, 0, 1);

const int = window.setInterval(() => {
    let diff = toDate - Date.now();
    if (diff < 0) {
        window.clearInterval(int);
        return;
    } else {
        //for better accuracy do not use floored results  in consequent calculation
        let seconds = Math.floor(diff / 1000);
        let minutes = Math.floor((diff / 1000) / 60);
        let hours = Math.floor((diff / 1000) / 3600);
        let days = Math.floor((diff / 1000) / 86400);

        seconds = seconds - (minutes * 60);
        minutes = minutes - (hours * 60);
        hours = hours - (days * 24);

        document.getElementById('dd').textContent = days;
        document.getElementById('hh').textContent = hours;
        document.getElementById('mm').textContent = minutes;
        document.getElementById('ss').textContent = seconds;
    }
}, 1000);
