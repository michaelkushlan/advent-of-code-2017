import R from 'ramda'

export default function distance(number) {
  let nearestOddSquareRt = R.compose(
    (number) => number % 2 ? number : number + 1,
    Math.ceil,
    Math.sqrt,
  )(number)

  let goingDown = true
  let distance = nearestOddSquareRt - 1

  let nearestOddSquare = Math.pow(nearestOddSquareRt, 2)
  
  while(nearestOddSquare > number) {
    nearestOddSquare -= Math.floor(nearestOddSquareRt / 2)
    goingDown = !goingDown
  }

  const diff = number - nearestOddSquare

  if(goingDown)
    return nearestOddSquareRt - 1 - diff
  return nearestOddSquareRt - 1 - Math.floor(nearestOddSquareRt / 2) + diff
}