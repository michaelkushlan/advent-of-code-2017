import fs from 'fs'
import R from 'ramda'

import compose from '../utils/compose'
import promisify from '../utils/promisify'

const LEFT = 'left'
const RIGHT = 'right'
const UP = 'up'
const DOWN = 'down'

const readFile = promisify(fs.readFile)

export default async function solution(fileName) {
  const stream = await compose(
    R.split('\n'),
    R.toString,
    readFile
  )(fileName)

  let myArray = []
  let lineLength

  
  for(let j=0; j<stream.length; j++) {
    myArray[j] = []
    
    let line = stream[j]
    lineLength = line.length

    for(let i=0; i<lineLength; i++) {
      myArray[j][i] = line[i]
    }
  }

  console.log(myArray)
  let i = 0
  let j = 0

  let direction = RIGHT

  while(true) {
    if(myArray[0][i] !== ' ') break
    i++
  }

  direction = DOWN

  let exit = false

  let letters = []
  function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  let prevI = i
  let prevJ = j

  let totalCount = 1

  while(true) {
    if(prevI !== i || prevJ !== j) {
      prevI = i
      prevJ = j
      totalCount += 1
    }

    if(isLetter(myArray[j][i])) letters.push(myArray[j][i])

    switch(direction) {
      case DOWN:
        if(j + 1 < myArray.length && myArray[j + 1][i] !== ' ') {
          j++
        } else {
          if(i - 1 >= 0 && myArray[j][i - 1] !== ' ') {
            direction = LEFT
          }
          else if(i + 1 < lineLength && myArray[j][i + 1] !== ' ') {
            direction = RIGHT
          } else {
            exit = true
          }
        }
        break
      case RIGHT:
        if (i + 1 < lineLength && myArray[j][i + 1] !== ' ') {
          i++
        } else {
          if (j + 1 < myArray.length && myArray[j + 1][i] !== ' ') {
            direction = DOWN
          }
          else if (j - 1 >= 0 && myArray[j - 1][i] !== ' ') {
            direction = UP
          } else {
            exit = true
          }
        }
        break
      case UP:
        if (j - 1 >= 0 && myArray[j - 1][i] !== ' ') {
          j--
        } else {
          if (i - 1 >= 0 && myArray[j][i - 1] !== ' ') {
            direction = LEFT
          }
          else if (i + 1 < lineLength && myArray[j][i + 1] !== ' ') {
            direction = RIGHT
          } else {
            exit = true
          }
        }
        break
      case LEFT:
        if (i - 1 >= 0 && myArray[j][i - 1] !== ' ') {
          i--
        } else {
          if (j + 1 < myArray.length && myArray[j + 1][i] !== ' ') {
            direction = DOWN
          }
          else if (j - 1 >= 0 && myArray[j - 1][i] !== ' ') {
            direction = UP
          } else {
            exit = true
          }
        }
        break
    }

    if(exit) break
  }

  return totalCount
}

(async () => {
  const answer = await solution('./input.txt')

  console.log(answer)
})()