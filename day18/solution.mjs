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

  let firstPart, secondPart, thirdPart, f, number, num2, num3, number2, number3
  let sound = 0
  let recovered = 0

  let registers = {}

  for(let i=0; i<stream.length; i++) {
    let instruction = stream[i]

    firstPart = instruction.split(' ')[0]

    secondPart = instruction.split(' ')[1]
    num2 = parseInt(secondPart)
    if(isNaN(num2)) {
      if(!registers[secondPart]) {
        registers[secondPart] = 0
      }
    }

    switch(firstPart) {
      case 'snd':
        secondPart = instruction.split(' ')[1]
        num2 = parseInt(secondPart)
        sound = isNaN(num2)
          ? registers[secondPart]
          : num2
        break
      case 'set':
        [f, secondPart, thirdPart] = instruction.split(' ')

        num3 = parseInt(thirdPart)

        registers[secondPart] = isNaN(num3)
          ? registers[thirdPart]
          : num3
        break
      case 'add':
        [f, secondPart, thirdPart] = instruction.split(' ')

        num3 = parseInt(thirdPart)

        registers[secondPart] = isNaN(num3)
          ? registers[secondPart] + registers[thirdPart]
          : registers[secondPart] + num3
        break
      case 'mul':
        [f, secondPart, thirdPart] = instruction.split(' ')

        num3 = parseInt(thirdPart)

        registers[secondPart] = isNaN(num3)
          ? registers[secondPart] * registers[thirdPart]
          : registers[secondPart] * num3
        break
      case 'mod':
        [f, secondPart, thirdPart] = instruction.split(' ')

        num3 = parseInt(thirdPart)

        registers[secondPart] = !isNaN(num3)
          ? registers[secondPart] % num3
          : registers[secondPart] % registers[thirdPart]
        break
      case 'rcv':
        secondPart = instruction.split(' ')[1]

        num2 = parseInt(secondPart)

        number = !isNaN(num2) ? num2 : registers[secondPart]
        if(number !== 0) {
          return sound
        }
        break
      case 'jgz':
        [f, secondPart, thirdPart] = instruction.split(' ')

        num2 = parseInt(secondPart)
        num3 = parseInt(thirdPart)

        number2 = !isNaN(num2) ? num2 : registers[secondPart]
        number3 = !isNaN(num3) ? num3 : registers[thirdPart]

        if(number2 > 0) {
          i = i + number3 - 1
        }
        break
    }
  }

  return recovered
}

(async () => {
  const answer = await solution('./input.txt')

  console.log(answer)
})()