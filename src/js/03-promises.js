import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.form')
form.addEventListener('submit', onsubmit)
function onsubmit(e) {
  e.preventDefault()
  let firstDelay = Number(form.delay.value)
  const stepDelay = Number(form.step.value)
  const amountPromises = Number(form.amount.value)
  for (let i = 0; i < amountPromises; i += 1){
    createPromise(i, firstDelay)
  .then(({ position, delay }) => {
    setTimeout(() => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
        clickToClose: true,
      });
    }, delay)
  })
  .catch(({ position, delay }) => {
    setTimeout(() => {
      Notify.success(`❌ Rejected promise ${position} in ${delay}ms`, {
      clickToClose: true,
    });
    }, delay)
  });
    firstDelay += stepDelay
  }
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
    resolve({position,delay})
  } else {
    reject({position,delay})
  }
  })

}