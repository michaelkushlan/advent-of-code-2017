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

  const options = []
  for(const line of stream) {
    let [value1, value2] = line.split('/')
    options.push([parseInt(value1), parseInt(value2)])
  }

  let bridges = []
  
  function bridgeStrength(matchValue, connector, options, connectionList) {
    let currentStrength = connector[0] + connector[1]

    let newConnection

    let newStrength
    let maxNewStrength = 0

    let match = false
    for(let i=0; i<options.length; i++) {
      if(matchValue === options[i][0] || matchValue === options[i][1]) {
        let newValue = matchValue === options[i][0] ? options[i][1] : options[i][0]

        newStrength = bridgeStrength(newValue, options[i], R.remove(i, 1, options), [...connectionList, options[i]])
        if(newStrength > maxNewStrength) maxNewStrength = newStrength
      }
    }

    if(!match) {
      let connectionListSum = R.reduce((acc, curr) => acc + curr[0] + curr[1], 0, connectionList)
      
      bridges.push({ length: connectionList.length, strength: connectionListSum })
    }

    return currentStrength + maxNewStrength
  }

  bridgeStrength(0 , [0, 0], options, [])

  bridges.sort((a, b) => b.length - a.length)

  return bridges[0]
}

(async () => {
  const answer = await solution('./input.txt')

  console.log(answer)
})()