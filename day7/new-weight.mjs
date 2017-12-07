import fs from 'fs'
import numbers from 'numbers'
import R from 'ramda'

import compose from '../utils/compose'
import promisify from '../utils/promisify'

const readFile = promisify(fs.readFile)

export default async function newWeight(fileName) {
  const dataArray = await compose(
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

  const depHash = R.indexBy(R.prop('key'), dataArray)
  const weightHash = {}

  const buildWeightHash = function(key) {
    const dep = depHash[key]
    if(dep.deps.length === 0) {
      weightHash[key] = dep.weight
      
      return dep.weight
    }

    const weight = dep.weight + R.reduce((acc, curr) => acc + buildWeightHash(curr), 0, dep.deps)
    weightHash[key] = weight

    return weight
  }

  for(const data of dataArray) {
    if(!weightHash[data.key]) buildWeightHash(data.key)
  }

  for(const data of dataArray) {
    if(data.deps.length !== 0) {
      const { unbalanced } = R.reduce((acc, curr) => {
        if(acc.unbalanced) return { unbalanced: true }
        if(weightHash[curr] !== acc.weight) return { unbalanced: true }
        return acc
      }, { unbalanced: false, weight: weightHash[data.deps[0]] }, data.deps)

      if(unbalanced) {
        const unbalancedDeps = data.deps.map((dep) => ({ name: dep, weight: weightHash[dep] }))
        
        const mode = numbers.statistic.mode(R.pluck('weight', unbalancedDeps))

        for(const unbalancedDep of unbalancedDeps) {
          if(unbalancedDep.weight !== mode) {
            const weightDiff = mode - unbalancedDep.weight
            return depHash[unbalancedDep.name].weight + weightDiff
          }
        }
      }
    }
  }
}

(async () => {
  const answer = await newWeight('./input.txt')

  console.log(answer)
})()