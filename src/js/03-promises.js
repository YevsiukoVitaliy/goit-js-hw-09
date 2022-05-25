import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.form')
form.addEventListener('submit', onsubmit)
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
    if (shouldResolve) {
    resolve({position,delay})
  } else {
    reject({position,delay})
  }
  },delay)})

}
function onsubmit(e) {
  e.preventDefault()
  const firstDelay = Number(form.delay.value)
  const stepDelay = Number(form.step.value)
  const amountPromises = Number(form.amount.value)
  let delayItem = firstDelay
  if (delayItem <= 0) {
    return
  }
  for (let i = 0; i < amountPromises; i += 1){
    let positionItem = i + 1
    createPromise(positionItem, delayItem)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
      clickToClose: true,
    })
  })
  .catch(({ position, delay }) => {
    Notify.success(`❌ Rejected promise ${position} in ${delay}ms`,{
      clickToClose: true,
    });
  });
    positionItem += stepDelay
  }
}
