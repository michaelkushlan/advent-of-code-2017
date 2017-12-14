import fs from 'fs'
import R from 'ramda'

import compose from '../utils/compose'
import promisify from '../utils/promisify'

const readFile = promisify(fs.readFile)

export default async function solution(input) {
  const stream = await compose(
    R.concat(R.__, [17, 31, 73, 47, 23]),
    R.map((c) => c.charCodeAt(0))
  )(input)

  const myArray = []
  for (let i = 0; i < 256; i++) {
    myArray.push(i)
  }

  let skipSize = 0
  let currentIndex = 0

  for(let round=0; round<64; round++) {
    for (const number of stream) {
      let subArray

      if (currentIndex + number >= myArray.length) {
        subArray = R.slice(currentIndex, myArray.length, myArray).concat(R.slice(0, number - (myArray.length - currentIndex), myArray))
      } else {
        subArray = R.slice(currentIndex, currentIndex + number, myArray)
      }

      const reversed = R.reverse(subArray)

      for (let i = 0; i < number; i++) {
        const ringIndex = (i + currentIndex) % myArray.length
        myArray[ringIndex] = reversed[i]
      }

      currentIndex = (currentIndex + number + skipSize) % myArray.length
      skipSize++
    }
  }

  const groups = R.splitEvery(16, myArray)

  let denseHash = []

  let hexStrings = []

  for(const group of groups) {
    const xOr = group.reduce((acc, curr) => {
      return acc ^ curr
    })

    denseHash.push(xOr)
    hexStrings.push(xOr.toString(16))
  }

  let answer = ''

  for(const hexString of hexStrings) {
    if(hexString.length === 1) {
      answer = answer + '0' + hexString
    } else {
      answer += hexString
    }
  }

  return answer
}