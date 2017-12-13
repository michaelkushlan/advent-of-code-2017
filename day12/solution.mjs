import fs from 'fs'
import R from 'ramda'

import compose from '../utils/compose'
import promisify from '../utils/promisify'

const readFile = promisify(fs.readFile)

export default async function solution(fileName) {
  const depHash = {}

  const visitedHash = {}

  const stream = await compose(
    R.split('\n'),
    R.toString,
    readFile
  )(fileName)

  for(const line of stream) {
    const value = line.split(' <-> ')

    depHash[parseInt(value[0])] = R.map(parseInt, value[1].split(', '))
  }

  let group = []

  let programChain = (program, hash) => {
    visitedHash[program] = true
    if(hash[program]) return
    hash[program] = true

    for(const dep of depHash[program]) {
      programChain(dep, hash)
    }

    return hash
  }

  for(const key of Object.keys(depHash)) {
    if(visitedHash[key]) {}
    else {
      visitedHash[key] = true

      group.push(programChain(key, {}))
    }
  }

  return R.uniq(group).length
}


(async () => {
  const answer = await solution('./input.txt')

  console.log(answer)
})()