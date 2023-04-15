export function shuffle(array) {
  let currentIndex = array.length
  while (currentIndex) {
    // Pick a remaining element.
    const randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }
  return array
}
