import fs from 'fs'
import R from 'ramda'

import compose from './compose'
import promisify from './promisify'

const toInt = R.compose(
  parseInt,
  R.trim
)

const evenDivisors = R.compose(
  (orderedValues) => {
    for(let i=0; i<orderedValues.length; i++) {
      for(let j=0; j<orderedValues.length; j++) {
        if(i !== j && orderedValues[i] % orderedValues[j] === 0) {
          return R.max(orderedValues[i],orderedValues[j]) / R.min(orderedValues[i], orderedValues[j])
        }
      }
    }
  },
  R.sort(R.subtract),
  R.map(toInt),
  R.split('\t')
)

const readFile = promisify(fs.readFile)

export default function checksum(fileName) {
  return compose(
    R.reduce((acc, line) => acc + evenDivisors(line), 0),
    R.split('\n'),
    R.toString,
    readFile
  )(fileName)
}
