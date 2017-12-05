import R from 'ramda'

export default function distance(number) {
  let nearestOddSquareRt = R.compose(
    (number) => number % 2 ? number : number + 1,
    Math.ceil,
    Math.sqrt,
  )(number)

  const diff = Math.pow(nearestOddSquareRt, 2) - number

  const distanceFromCornerToCenter = nearestOddSquareRt - 1
  const distanceFromAxesToCenter = distanceFromCornerToCenter / 2

  const distanceFromCornerToNumber = diff % distanceFromCornerToCenter

  return distanceFromCornerToNumber >= distanceFromAxesToCenter
    ? distanceFromAxesToCenter + distanceFromCornerToNumber - distanceFromAxesToCenter
    : distanceFromCornerToCenter - distanceFromCornerToNumber
}

(() => {
  console.log(distance(277678))
})()