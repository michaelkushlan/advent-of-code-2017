import fs from 'fs'
import R from 'ramda'

import compose from '../utils/compose'
import promisify from '../utils/promisify'

const readFile = promisify(fs.readFile)

export default async function bottomProgram(fileName) {
  const dependencyList = await compose(
    R.reduce((depArray, line) => {
      const dependency = line.split('->')

      const key = dependency[0].split(' ')[0]
      const weight = parseInt(dependency[0].split(' ')[1].replace('(', '').replace(')', ''))

      dependency.length === 1 
      ? depArray.push({
        deps: [],
        key,
        weight
      })
      : depArray.push({
        deps: dependency[1].trim().split(', '),
        key,
        weight
      })

      return depArray
    }, []),
    R.split('\n'),
    R.toString,
    readFile
  )(fileName)

  for(const dependency of dependencyList) {
    let bottomProgram = true
    for(const otherDependency of dependencyList) {
      if(R.contains(dependency.key, otherDependency.deps)) bottomProgram = false
    }

    if(bottomProgram) return dependency.key
  }
}

(async() => {
  const answer = await bottomProgram('./input.txt')
  console.log(answer)
})()