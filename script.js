let time = 60 * 60;

function updateTimer() {

let h = Math.floor(time/3600);
let m = Math.floor((time%3600)/60);
let s = time%60;

document.getElementById("countdown").innerHTML =
String(h).padStart(2,"0")+":"+
String(m).padStart(2,"0")+":"+
String(s).padStart(2,"0");

if(time>0) time--;

}

setInterval(updateTimer,1000);
updateTimer();