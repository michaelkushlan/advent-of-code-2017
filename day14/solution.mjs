import fs from 'fs'
import hexToBinary from 'hex-to-binary'
import R from 'ramda'

import knotHash from '../day10/knot-hash'
import compose from '../utils/compose'
import promisify from '../utils/promisify'

const readFile = promisify(fs.readFile)

export default async function solution(fileName) {
  let sum = 0
  const myList = []
  for(let i=0; i<128; i++) {
    const kH = await knotHash('flqrgnkx-' + i)
    const bin = hexToBinary(kH)

    myList.push(bin)
  }

  let visitedHash = {}
  let region = 0

  const explode = (i, j) => {
    const unique = i + '-' + j
    if(visitedHash[unique]) return

    visitedHash[unique] = true

    if(myList[i] && myList[i][j+1] === '1') explode(i, j+1)
    if(myList[i] && myList[i][j-1] === '1') explode(i, j-1)
    if(myList[i+1] && myList[i + 1][j] === '1') explode(i+1, j)
    if(myList[i-1] && myList[i - 1][j] === '1') explode(i-1, j)
  }

  for(let i=0; i<128; i++) {
    for(let j=0; j<128; j++) {
      if(visitedHash[i + '-' + j]) {}
      else {
        if(myList[i][j] === '1') {
          explode(i, j)
          region++
        }
      }
    }
  }

  return region
}


(async () => {
  const answer = await solution('./input.txt')

  console.log(answer)
})()