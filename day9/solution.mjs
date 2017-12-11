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

  let totalScore = 0
  let groupValue = 1
  let garbage = false
  let ignoreNext = false

  for(const char of stream) {
    if(char === '{' && !ignoreNext && !garbage) {
      totalScore += groupValue
      groupValue += 1
    }

    if(char === '}' && !ignoreNext && !garbage) {
      groupValue -= 1
    }

    if(char === '<' && !ignoreNext) {
      garbage = true
    }

    if(char === '>' && !ignoreNext && garbage) {
      garbage = false
    }

    if(char === '!' && !ignoreNext) {
      ignoreNext = true
    } else {
      ignoreNext = false
    }
  }

  return totalScore
}

(async () => {
  const answer = await solution('./input.txt')

  console.log(answer)
})()