const { clear } = require("console");

const btnStart = document.querySelector('[data-start]')
const btnStop = document.querySelector('[data-stop]')
const body = document.querySelector('body')
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let int
btnStop.setAttribute("disabled", "disabled")
btnStart.addEventListener('click', startClick)
btnStop.addEventListener('click', stopClick)
function startClick() {
  btnStart.setAttribute("disabled", "disabled")
  btnStop.removeAttribute("disabled")
  if (btnStart.hasAttribute("disabled")) {
      int = setInterval(()=> {
      body.style.backgroundColor = `${getRandomHexColor()}`;
  },2000)
  }
}
function stopClick() {
  btnStop.setAttribute("disabled", "disabled")
  btnStart.removeAttribute("disabled")
  clearInterval(int)
}