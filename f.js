function getRand(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }


function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}