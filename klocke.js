const secondHand = document.querySelector(".second-hand");
const minHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");
const lyd = document.querySelector(".lyd")
function setDate() {
  const now = new Date();
  const second = now.getSeconds();
  const secondsDegrees = (second / 60) * 360 + 90;
  secondHand.style.transform = "rotate(" + secondsDegrees + "deg)";
const mini = now.getMinutes();
  const minutesDegrees = (mini/60*360) +((second/60)*6)+ 90;
  minHand.style.transform = "rotate(" + minutesDegrees + "deg)";
  const hour = now.getHours();
  const hoursDegrees = (hour/12*360) +((mini/60)*30)+ 90;
  hourHand.style.transform = "rotate(" + hoursDegrees + "deg)";
  console.log(lyd);
lyd.currentTime = 0;
lyd.play()
}
setInterval(setDate, 1000);
setDate();