import fs from 'fs'
import R from 'ramda'

import compose from '../utils/compose'
import promisify from '../utils/promisify'

const readFile = promisify(fs.readFile)

export default async function solution(fileName) {
  let state = 'a'

  let tape = []
  let i = 0
  for (let j = 0; j < 12629077; j++) {
    switch(state) {
      case 'a':
        if(tape[i] !== 1) {
          tape[i] = 1
          i++
          state = 'b'
        } else {
          tape[i] = 0
          i--
          state = 'b'
        }
        break
      case 'b':
        if(tape[i] !== 1) {
          tape[i] = 0
          i++
          state = 'c'
          break
        } else {
          tape[i] = 1
          i--
          state = 'b'
        }
        break
      case 'c':
        if (tape[i] !== 1) {
          tape[i] = 1
          i++
          state = 'd'
          break
        } else {
          tape[i] = 0
          i--
          state = 'a'
        }
        break
      case 'd':
        if (tape[i] !== 1) {
          tape[i] = 1
          i--
          state = 'e'
          break
        } else {
          tape[i] = 1
          i--
          state = 'f'
        }
        break
      case 'e':
        if (tape[i] !== 1) {
          tape[i] = 1
          i--
          state = 'a'
          break
        } else {
          tape[i] = 0
          i--
          state = 'd'
        }
        break
      case 'f':
        if (tape[i] !== 1) {
          tape[i] = 1
          i++
          state = 'a'
          break
        } else {
          tape[i] = 1
          i--
          state = 'e'
        }
        break
    }
  }

  let sum = 0
  for(const num of Object.keys(tape)) {
    sum += tape[num]
  }

  return sum
}

(async () => {
  const answer = await solution()

  console.log(answer)
})()