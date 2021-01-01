const _query = (s) => document.body.querySelector(s);
const _all = (s) => document.body.querySelectorAll(s);

let audios = _all("audio");
let len = audios.length;
let rand = () => Math.floor(Math.random() * len);
let chosen = audios[rand()];
let play = true;

for (let i = 0; i < len; i++) {
    audios[i].addEventListener('ended', () => {
        chosen = audios[rand()];
        chosen.play();
    });
}

_query('button').addEventListener('click', (e) => {
    if (play) {
        chosen.play();
        play = false;
    } else {
        play = true;
        chosen.pause();
    }
    e.target.classList.toggle('go');
    e.target.classList.toggle('pause');
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

//
var date= new Date();

let load = true;
if(window.location.search.includes("tree")){
    load = false;
}
if (date.getMonth() === 0 && date.getDate() < 15 && load) {
    _query('#tree').style.display = "none";
    _query('#canvasbox').style.display = "flex";
    _query('#canvasbox').style.zIndex = 1;
    _query('#navbar').classList.toggle('absolute');

    _all('.counter').forEach(c=>c.style.display = "none");

    let canvas = _query('#imager');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let context = canvas.getContext('2d');

    const MAX_FIREWORKS = 5;
    const MAX_SPARKS = 50;

    const reset_firework = (fw) => {
        fw.x = Math.floor(Math.random() * canvas.width);
        fw.y = canvas.height;
        fw.age = 0;
        fw.phase = 'fly';
    }

    const explode_firework = (fw) => {
        fw.sparks.forEach((spark) => {
            for (let i = 0; i < 10; i++) {
                let trailAge = fw.age + i;
                let x = fw.x + spark.vx * trailAge;
                let y = fw.y + spark.vy * trailAge + spark.weight * trailAge * spark.weight * trailAge;
                let fade = i * 20 - fw.age * 2;
                let r = Math.floor(spark.red * fade);
                let g = Math.floor(spark.green * fade);
                let b = Math.floor(spark.blue * fade);
                context.beginPath();
                context.fillStyle = `rgba(${r},${g},${b},1)`;
                context.rect(x, y, 4, 4);
                context.fill();
            }
        });
        fw.age++;
        if (fw.age > 100) {
            reset_firework(fw);
        }
    }

    const fly_fireworks = (fw,index) => {
        fw.y = fw.y - 10;
        for (let spark = 0; spark < 15; spark++) {
            context.beginPath();
            context.fillStyle = 'rgba(' + index * 50 + ',' + spark * 17 + ',0,1)';
            context.rect(fw.x + Math.random() * spark - spark / 2, fw.y + spark * 4, 4, 4);
            context.fill();
        }
        if (Math.random() < .001 || fw.y < 200) fw.phase = 'explode';
    }

    let fireworks = [];

    for (let i = 0; i < MAX_FIREWORKS; i++) {
        let firework = { sparks: [] };
        for (let n = 0; n < MAX_SPARKS; n++) {
            let spark = {
                vx: Math.random() * 5 + 1,
                vy: Math.random() * 5 + 1,
                weight: Math.random() * .3 + .03,
                red: Math.floor(Math.random() * 2),
                green: Math.floor(Math.random() * 2),
                blue: Math.floor(Math.random() * 2)
            };
            if (Math.random() > .5) spark.vx = -spark.vx;
            if (Math.random() > .5) spark.vy = -spark.vy;
            firework.sparks.push(spark);
        }
        fireworks.push(firework);
        reset_firework(firework);
    }
    window.requestAnimationFrame(letfireworks);    

    function letfireworks() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        fireworks.forEach((firework, index) => {
            if (firework.phase == 'explode') {
                explode_firework (firework);
                return;
            }
            fly_fireworks(firework,index);            
        });
        window.requestAnimationFrame(letfireworks);
    }
}else {
    window.setInterval(() => {
        document.body.querySelectorAll('ellipse').forEach(e => {
            let r = Math.floor(Math.random() * 255); let g = Math.floor(Math.random() * 255); let b = Math.floor(Math.random() * 255); let color = `rgb(${r},${g},${b}`; e.style.fill = color; e.style.stroke = color;
        })
    }, 300);      
}
// 