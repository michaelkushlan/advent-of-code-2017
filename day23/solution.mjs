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

  let firstPart, secondPart, num2, num3, number2, number3, f, thirdPart
  let registers = { a: 1 }

  let count = 0

  for (let i = 0; i < stream.length; i++) {
    count++
    let instruction = stream[i]

    firstPart = instruction.split(' ')[0]

    secondPart = instruction.split(' ')[1]
    num2 = parseInt(secondPart)
    if (isNaN(num2)) {
      if (!registers[secondPart]) {
        registers[secondPart] = 0
      }
    }

    switch (firstPart) {
      case 'set':
        [f, secondPart, thirdPart] = instruction.split(' ')

        num3 = parseInt(thirdPart)

        registers[secondPart] = isNaN(num3)
          ? registers[thirdPart]
          : num3
        break
      case 'sub':
        [f, secondPart, thirdPart] = instruction.split(' ')

        num3 = parseInt(thirdPart)

        registers[secondPart] = isNaN(num3)
          ? registers[secondPart] - registers[thirdPart]
          : registers[secondPart] - num3
        break
      case 'mul':
        [f, secondPart, thirdPart] = instruction.split(' ')

        num3 = parseInt(thirdPart)

        registers[secondPart] = isNaN(num3)
          ? registers[secondPart] * registers[thirdPart]
          : registers[secondPart] * num3
        break
      case 'jnz':
        [f, secondPart, thirdPart] = instruction.split(' ')

        num2 = parseInt(secondPart)
        num3 = parseInt(thirdPart)

        number2 = !isNaN(num2) ? num2 : registers[secondPart]
        number3 = !isNaN(num3) ? num3 : registers[thirdPart]

        if (number2 !== 0) {
          i = i + number3 - 1
        }
        break
    }

    console.log(i)
    if(count % 1000 === 0 ) {
      console.log(registers)
    }
  }

  return registers
}

(async () => {
  const answer = await solution('./input.txt')

  console.log(answer)
})()