import fs from 'fs'
import R from 'ramda'

import compose from '../utils/compose'
import promisify from '../utils/promisify'

const readFile = promisify(fs.readFile)

export default async function solution(fileName) {
  const hash = {}

  const dataArray = await compose(
    R.split('\n'),
    R.toString,
    readFile
  )(fileName)

  for(const line of dataArray) {
    hash[line.split(' ')[0]] = 0
  }

  let maxValue = 0

  let alterRegister = function(change, key, hash, amount) {
    if (change === 'inc') hash[key] += parseInt(amount)
    else hash[key] -= parseInt(amount)

    if (hash[key] > maxValue) maxValue = hash[key]
  }

  for(const line of dataArray) {
    const things = line.split(' ')
    const [key, change, amount, asdf, key2, condition, conditionValue] = things

    switch(condition) {
      case '>':
        if(hash[key2] > parseInt(conditionValue)) {
          alterRegister(change, key, hash, amount, maxValue)
        }
        break
      case '<':
        if (hash[key2] < parseInt(conditionValue)) {
          alterRegister(change, key, hash, amount, maxValue)
        }
        break
      case '>=':
        if (hash[key2] >= parseInt(conditionValue)) {
          alterRegister(change, key, hash, amount, maxValue)
        }
        break
      case '<=':
        if (hash[key2] <= parseInt(conditionValue)) {
          alterRegister(change, key, hash, amount, maxValue)
        }
        break
      case '==':
        if (hash[key2] === parseInt(conditionValue)) {
          alterRegister(change, key, hash, amount, maxValue)
        }
        break
      case '!=':
        if (hash[key2] !== parseInt(conditionValue)) {
          alterRegister(change, key, hash, amount, maxValue)
        }
        break
      }
  }

  let finalMaxValue = -Infinity

  for(const key of Object.keys(hash)) {
    if(hash[key] > finalMaxValue) finalMaxValue = hash[key]
  }

  return { maxValue, finalMaxValue }
}

(async() => {
  const answer = await solution('./input.txt')

  console.log(answer)
})()