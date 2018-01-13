import fs from 'fs'
import R from 'ramda'

import compose from '../utils/compose'
import promisify from '../utils/promisify'

const readFile = promisify(fs.readFile)

const LEFT = 'left'
const RIGHT = 'right'
const UP = 'up'
const DOWN = 'down'

export default async function solution(fileName, numIterations) {
  const stream = await compose(
    R.split('\n'),
    R.toString,
    readFile
  )(fileName)

  let myObject = {}

  for(let i=0; i<stream.length; i++) {
    for(let j=0; j<stream[i].length; j++) {
      if(!myObject[i]) myObject[i] = {}
      myObject[i][j] = stream[i][j]
    }
  }

  let indexX = Math.floor(stream.length / 2)
  let indexY = indexX

  let burstCount = 0
  let direction = UP

  for(let i=0; i<numIterations; i++) {
    if(!myObject[indexX]) {
      myObject[indexX] = []
    }

    if(myObject[indexX][indexY] === '#') {
      switch(direction) {
        case UP:
          direction = RIGHT
          break
        case DOWN:
          direction = LEFT
          break
        case LEFT:
          direction = UP
          break
        case RIGHT:
          direction = DOWN
          break
      }

      myObject[indexX][indexY] = 'F'
    } else if (myObject[indexX][indexY] === 'F') {
      switch (direction) {
        case UP:
          direction = DOWN
          break
        case DOWN:
          direction = UP
          break
        case LEFT:
          direction = RIGHT
          break
        case RIGHT:
          direction = LEFT
          break
      }

      myObject[indexX][indexY] = '.'
    } else if (myObject[indexX][indexY] === 'W') {
      burstCount++
      myObject[indexX][indexY] = '#'
    } else {
      switch (direction) {
        case UP:
          direction = LEFT
          break
        case DOWN:
          direction = RIGHT
          break
        case LEFT:
          direction = DOWN
          break
        case RIGHT:
          direction = UP
          break
      }

      myObject[indexX][indexY] = 'W'
    } 

    switch(direction) {
      case UP:
        indexX -= 1
        break
      case DOWN:
        indexX += 1
        break
      case LEFT:
        indexY -= 1
        break
      case RIGHT:
        indexY += 1
        break
    }
    // printMap(myObject)
    // console.log()
  }


  return burstCount
}

function printMap(tmp) {
  let keys = Object.keys(tmp)
  keys.sort((a, b) => parseInt(a) - parseInt(b))

  for(const key of keys) {
    let k = Object.keys(tmp[key])
    k.sort((a, b) => parseInt(a) - parseInt(b))

    let str = ''
    for(const kk of k) {
      str += tmp[key][kk]
    }

    console.log(str)
  }
}

(async() => {
  const answer = await solution('./input.txt', 10000000)

  console.log(answer)
})()