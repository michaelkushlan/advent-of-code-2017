import fs from 'fs'
import R from 'ramda'

import knotHash from '../day10/knot-hash'
import compose from '../utils/compose'
import promisify from '../utils/promisify'

const readFile = promisify(fs.readFile)

export default async function solution(fileName) {
  const stepsForward = 371
  const array = [0]
  let currentLoc = 0

  for (let i = 0; i < 50000000; i++) {
    currentLoc = (currentLoc + stepsForward) % (i+1)

    if(currentLoc === 0) console.log(i + 1)
    currentLoc++
  }

}

(async () => {
  const answer = await solution('./input.txt')

  console.log(answer)
})()