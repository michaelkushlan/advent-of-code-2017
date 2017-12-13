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

  let hash = {}

  for(const line of stream) {
    const [value, depth] = line.split(': ')
    hash[value] = depth
  }

  const getSecurityLocation = (time, depth) => {
    const thing = time % (depth * 2)
    if(thing > depth) {
      return thing - ((thing - depth) * 2)
    }

    return thing
  }

  const LIMIT = 4000000

  let badHash = {}

  for(const key of Object.keys(hash)) {
    let depth = parseInt(hash[key]) - 1
    let offset = parseInt(key)

    let badLocation = 0
    while(getSecurityLocation(parseInt(key) + badLocation, parseInt(hash[key]) - 1) !== 0) {
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