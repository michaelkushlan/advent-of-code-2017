import fs from 'fs'
import R from 'ramda'

import compose from '../utils/compose'
import promisify from '../utils/promisify'

const readFile = promisify(fs.readFile)

export default async function blockDistribution(fileName) {
  const hash = {}

  const dataArray = await compose(
    R.map(parseInt),
    (data) => data[0].split('\t'),
    R.split('\n'),
    R.toString,
    readFile
  )(fileName)

  let cycle = 0

  while(true) {
    let maxIndex = dataArray.indexOf(Math.max(...dataArray))

    let blocks = dataArray[maxIndex]
    dataArray[maxIndex] = 0

    let start = maxIndex + 1
    while(blocks > 0) {
      if(start === dataArray.length) { start = 0 }

      dataArray[start] += 1
      blocks -= 1
      start++

    }

    if(hash[dataArray.toString()]) return { cycle, start: hash[dataArray.toString()] }
    
    hash[dataArray.toString()] = cycle
    cycle++
  }
}