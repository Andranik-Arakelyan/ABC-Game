export function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

export function getRandomFromRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
