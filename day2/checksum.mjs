import fs from 'fs'
import R from 'ramda'

import compose from '../utils/compose'
import promisify from '../utils/promisify'

const findMinMax = (acc, value) => {
  if(!acc.min) {
    return { min: value, max: value}
  }

  if(value < acc.min) {
    return { min: value, max: acc.max }
  }

  if(value > acc.max) {
    return { min: acc.min, max: value }
  }

  return acc
}

const toInt = R.compose(
  parseInt,
  R.trim
)

const maxDiff = R.compose(
  (values) => values.max - values.min,
  R.reduce(findMinMax, {}),
  R.map(toInt),
  R.split('\t')
)
const readFile = promisify(fs.readFile)

const sumLines = R.reduce((acc, line) => acc + maxDiff(line), 0)

export default async function checkSum(fileName) {
  return compose(
    sumLines,
    R.split('\n'),
    R.toString,
    readFile
  )(fileName)
}
