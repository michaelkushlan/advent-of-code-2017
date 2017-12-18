import fs from 'fs'
import R from 'ramda'

import knotHash from '../day10/knot-hash'
import compose from '../utils/compose'
import promisify from '../utils/promisify'

const readFile = promisify(fs.readFile)

export default async function solution(fileName) {
  let genAValue = 679
  let genBValue = 771

  const genA = 16807
  const genB = 48271
  const number = 2147483647

  let sum = 0

  for(let i=0; i<5000000; i++) {
    while(true) {
      genAValue = (genAValue * genA) % number
      if(genAValue % 4 === 0) break
    }
    while(true) {
      genBValue = (genBValue * genB) % number
      if(genBValue % 8 === 0) break
    }

    let binA = genAValue % 65536
    let binB = genBValue % 65536

    if(binA === binB) sum += 1
  }

  return sum
}


(async () => {
  const answer = await solution('./input.txt')

  console.log(answer)
})()