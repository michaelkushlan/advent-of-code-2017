import fs from 'fs'
import R from 'ramda'

import compose from '../utils/compose'
import promisify from '../utils/promisify'

const readFile = promisify(fs.readFile)

function* processStream(stream, progId, initialValue) {
  let firstPart, secondPart, thirdPart, f, number, num2, num3, number2, number3
  let sound
  let recovered
  let myQueue = initialValue ? [initialValue] : []

  let registers = { p: progId }

  for (let i = 0; i < stream.length; i++) {
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
      case 'snd':
        secondPart = instruction.split(' ')[1]
        num2 = parseInt(secondPart)
        sound = isNaN(num2)
          ? registers[secondPart]
          : num2

        recovered = yield sound
        if(recovered) {
          myQueue.push(recovered)
        }

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
        if(myQueue.length === 0) {
          recovered = yield
        } else {
          recovered = myQueue.shift()
        }

        secondPart = instruction.split(' ')[1]

        registers[secondPart] = recovered
        break
      case 'jgz':
        [f, secondPart, thirdPart] = instruction.split(' ')

        num2 = parseInt(secondPart)
        num3 = parseInt(thirdPart)

        number2 = !isNaN(num2) ? num2 : registers[secondPart]
        number3 = !isNaN(num3) ? num3 : registers[thirdPart]

        if (number2 > 0) {
          i = i + number3 - 1
        }
        break
    }
  }
}

export default async function solution(fileName) {
  const stream = await compose(
    R.split('\n'),
    R.toString,
    readFile
  )(fileName)

  let prog_0 = processStream(stream, 0)
  let firstValue = prog_0.next().value

  let prog_1 = processStream(stream, 1, firstValue)

  let sent = 0
  let value, value2
  let next = { done: false }
  let next2 = { done: false }

  while(true) {
    if(!next.done) {
      next = prog_0.next(value2)
    }

    if(!next2.done) {
      next2 = prog_1.next(value)
    }

    value = next.value
    value2 = next2.value

    if(value2) sent++

    if(!value && !value2) break
  }

  console.log('total sent by prog 1: ', sent)
  return 'finished'
}

(async () => {
  const answer = await solution('./input.txt')

  console.log(answer)
})()