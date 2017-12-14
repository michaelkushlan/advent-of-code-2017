import fs from 'fs'
import R from 'ramda'

import compose from '../utils/compose'
import promisify from '../utils/promisify'

const readFile = promisify(fs.readFile)

export default async function solution(fileName) {
  const stream = await compose(
    R.split('\n'),
    R.toString,
    readFile
  )(fileName)

  let scannerHash = {}

  for(const line of stream) {
    const [value, depth] = line.split(': ')
    scannerHash[value] = depth
  }

  const getSecurityLocation = (time, depth) => {
    const location = time % (depth * 2)
    if(location > depth) {
      return location - ((location - depth) * 2)
    }

    return location
  }

  const LIMIT = 4000000

  let badHash = {}

  for(const key of Object.keys(scannerHash)) {
    let depth = parseInt(scannerHash[key]) - 1
    let offset = parseInt(key)

    let badLocation = 0
    while(getSecurityLocation(parseInt(key) + badLocation, parseInt(scannerHash[key]) - 1) !== 0) {
      badLocation++
    }

    while( badLocation < LIMIT) {
      badHash[badLocation] = true

      badLocation += depth * 2
    }
  }

  for(let i = 0; i < LIMIT; i++) {
    if(!badHash[i]) {
      return i
    }
  }

  return 'none'
}


(async () => {
  const answer = await solution('./input.txt')

  console.log(answer)
})()