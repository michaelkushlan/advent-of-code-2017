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

  let rulesHash = {}

  function flipV(key) {
    const myArray = key.split('/')
    if(myArray.length === 2) {
      return [ myArray[1], myArray[0] ].join('/')
    } else {
      return [ myArray[2], myArray[1], myArray[0] ].join('/')
    }
  }

    const myArray = key.split('/')
    if(myArray.length === 2) {
      return [
        myArray[1][0] + myArray[0][0],
        myArray[1][1] + myArray[0][1]
      ].join('/')
    } else {
      return [
        myArray[2][0] + myArray[1][0] + myArray[0][0],
        myArray[2][1] + myArray[1][1] + myArray[0][1],
        myArray[2][2] + myArray[1][2] + myArray[0][2],
      ].join('/')
    }
  }

  for(const rule of stream) {
    let [key, value] = rule.split(' => ')

    
    for(let i=0; i<4; i++) {
      let vertFlip = flipV(key)

      rulesHash[key] = value
      rulesHash[vertFlip] = value

      key = rotate(key)
    }
  }

  let pattern = ['.#.', '..#', '###']

  let newPattern

  for(let i=0; i<5; i++) {
    if(pattern.length % 2 === 0) {
      newPattern = []
      let j = 0
      let z = 0
      while(j < pattern.length) {
        newPattern.push('', '', '')

        let k = 0
        while(k < pattern.length) {
          let rule = [
            pattern[j][k] + pattern[j][k + 1],
            pattern[j + 1][k] + pattern[j + 1][k + 1]
          ].join('/')
          
          let value = rulesHash[rule].split('/')
          
          newPattern[z] += value[0]
          newPattern[z+1] += value[1]
          newPattern[z+2] += value[2]

          k += 2
        }
        
        j+= 2
        z+= 3
      }
    } else {
      newPattern = []
      let j = 0
      let z = 0
      while(j < pattern.length) {
        newPattern.push('', '', '', '')
        let k = 0
        while(k < pattern.length) {
          let rule = [
            pattern[j][k] + pattern[j][k + 1] + pattern[j][k + 2],
            pattern[j + 1][k] + pattern[j + 1][k + 1] + pattern[j + 1][k + 2],
            pattern[j + 2][k] + pattern[j + 2][k + 1] + pattern[j + 2][k + 2]
          ].join('/')

          let value = rulesHash[rule].split('/')

          newPattern[z] += value[0]
          newPattern[z+1] += value[1]
          newPattern[z+2] += value[2]
          newPattern[z+3] += value[3]

          k += 3
        }

        j += 3
        z += 4
      }
    }

    pattern = newPattern
  }

  return pattern.join('').split('#').length - 1
}

(async() => {
  const answer = await solution('./input.txt')

  console.log(answer)
})()