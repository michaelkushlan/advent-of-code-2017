import fs from 'fs'
import R from 'ramda'

import compose from '../utils/compose'
import promisify from '../utils/promisify'

const readFile = promisify(fs.readFile)

const anagramEquality = (text) => {
  return text.split('').sort().join('')
}

export default async function validPassphraseCount(fileName) {
  return compose(
    R.reduce((numValid, line) => {
      const passphraseList = R.split(' ', line)
      const uniqList = R.uniqBy(anagramEquality, passphraseList)

      return passphraseList.length === uniqList.length
        ? numValid + 1
        : numValid
    }, 0),
    R.split('\n'),
    R.toString,
    readFile
  )(fileName)
}

(async() => {
  const validPassphrases = await validPassphraseCount('./input.txt')
  console.log(validPassphrases)
})()