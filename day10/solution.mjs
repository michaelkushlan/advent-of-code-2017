import fs from 'fs'
import R from 'ramda'

import compose from '../utils/compose'
import promisify from '../utils/promisify'

const readFile = promisify(fs.readFile)

export default async function solution(fileName) {
  const stream = await compose(
    R.map(parseInt),
    R.split(','),
    R.toString,
    readFile
  )(fileName)

  const myArray = []
  for(let i = 0; i<256; i++) {
    myArray.push(i)
  }

  let skipSize = 0
  let currentIndex = 0

  for(const number of stream) {
    let subArray

    if(currentIndex + number >= myArray.length) {
      subArray = R.slice(currentIndex, myArray.length, myArray).concat(R.slice(0, number - (myArray.length - currentIndex), myArray))
    } else {
      subArray = R.slice(currentIndex, currentIndex + number, myArray)
    }

    const reversed = R.reverse(subArray)

    for(let i = 0; i < number; i++) {
      const ringIndex = (i + currentIndex) % myArray.length
      myArray[ringIndex] = reversed[i]
    }

    currentIndex = (currentIndex + number + skipSize) % myArray.length
    skipSize++
  }

  return myArray[0] * myArray[1]
}


(async () => {
  const answer = await solution('./input.txt')

  console.log(answer)
})()