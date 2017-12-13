import fs from 'fs'
import R from 'ramda'

import compose from '../utils/compose'
import promisify from '../utils/promisify'

const readFile = promisify(fs.readFile)

export default async function solution(fileName) {
  const stream = await compose(
    R.split(','),
    R.toString,
    readFile
  )(fileName)

  let x = 0
  let y = 0
  let maxDistance = 0

  for(const direction of stream) {
    switch(direction) {
      case 's':
        y -= 1
        break
      case 'n':
        y += 1
        break
      case 'ne':
        y += .5
        x += 1
        break
      case 'se':
        y -= .5
        x += 1
        break
      case 'sw':
        y -= .5
        x -= 1
        break
      case 'nw':
        y += .5
        x -= 1
        break
    }

    let xydistance = Math.abs(x) + Math.abs(y)
    let distanceSaved = (Math.abs(x) / 2) > y
      ? y
      : (Math.abs(x) / 2)

    let distance = xydistance - distanceSaved

    if(distance > maxDistance) maxDistance = distance
  }

  return maxDistance

}


(async () => {
  const answer = await solution('./input.txt')

  console.log(answer)
})()