import fs from 'fs'
import R from 'ramda'

import knotHash from '../day10/knot-hash'
import compose from '../utils/compose'
import promisify from '../utils/promisify'

const readFile = promisify(fs.readFile)

export default async function solution(fileName) {
  const stream = await compose(
    R.split(','),
    R.toString,
    readFile
  )(fileName)

  let myArray = []

  for(let i=0; i<16; i++) {
    myArray.push(String.fromCharCode(97 + i))
  }

  let trueCycle

  for(let i=0; i<40; i++) {
    for(const move of stream) {
      if(move[0] === 's') {
        const numToMove = parseInt(move.replace('s',''))
        for(let i=0; i<numToMove; i++) {
          const elem = myArray.pop()
          myArray.unshift(elem)
        }
      }
      if(move[0] === 'x') {
        const [pos1, pos2] = move.replace('x', '').split('/')
        const temp = myArray[pos1]
        myArray[pos1] = myArray[pos2]
        myArray[pos2] = temp
      }
      if(move[0] === 'p') {
        const [prog1, prog2] = move.replace('p', '').split('/')

        const pos1 = myArray.indexOf(prog1)
        const pos2 = myArray.indexOf(prog2)

        const temp = myArray[pos1]
        myArray[pos1] = myArray[pos2]
        myArray[pos2] = temp
      }
    }

    if(myArray.join('') === original.join('')) {
      trueCycle = i + 1
      break
    }
  }

  console.log(trueCycle)

  let tmp = []

  for(let i=0; i<16; i++) {
    let cycleLength = 0
    let currProgram = original[i]
    while(true) {
      let position = myArray.indexOf(currProgram)
      currProgram = original[position]
      cycleLength++
      if(position === i) break
    }

    let count = 0
    let positionFinal = i

    let stepsIntoCycle = 1000000000 % cycleLength
    console.log(stepsIntoCycle)
    while(count < stepsIntoCycle) {
      positionFinal = myArray.indexOf(currProgram)
      currProgram = original[positionFinal]
      count++
    }

    tmp[positionFinal] = original[i]
  }

  console.log(tmp.join(''))
}


(async () => {
  const answer = await solution('./input.txt')

  console.log(answer)
})()