import fs from 'fs'
import R from 'ramda'

import compose from '../utils/compose'
import promisify from '../utils/promisify'

const readFile = promisify(fs.readFile)

export default async function solution(fileName) {
  const stream = await compose(
    R.toString,
    readFile
  )(fileName)

  let totalGarbage = 0

  let garbage = false
  let ignoreNext = false

  for (const char of stream) {
    if(garbage && !ignoreNext) {
      totalGarbage += 1
    }

    if (char === '<' && !ignoreNext) {
      garbage = true
    }

    if (char === '>' && !ignoreNext && garbage) {
      garbage = false
      totalGarbage -= 1
    }

    if (char === '!' && !ignoreNext && garbage) {
      ignoreNext = true
      totalGarbage -= 1
    } else {
      ignoreNext = false
    }
  }

  return totalGarbage
}

(async () => {
  const answer = await solution('./input.txt')

  console.log(answer)
})()