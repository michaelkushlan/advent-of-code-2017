import fs from 'fs'
import R from 'ramda'

import compose from '../utils/compose'
import promisify from '../utils/promisify'

const readFile = promisify(fs.readFile)

export default async function steps(fileName) {
  const intArray = await compose(
    R.map(parseInt),
    R.split('\n'),
    R.toString,
    readFile
  )(fileName)

  let currentIndex = 0

  let steps = 0

  while(currentIndex < intArray.length) {
    const oldIndex = currentIndex

    currentIndex = currentIndex + intArray[currentIndex]
    if(intArray[oldIndex] > 2) {
      intArray[oldIndex] -= 1
    } else {
      intArray[oldIndex] += 1
    }


    steps += 1
  }

  return steps
}