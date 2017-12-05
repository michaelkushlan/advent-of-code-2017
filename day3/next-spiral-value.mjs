import R from 'ramda'

const RIGHT = 'right'
const LEFT = 'left'
const UP = 'up'
const DOWN = 'down'

export default function nextSpiralValue(number) {
  const spiralValues = []
  
  let currentValue = 1
  let direction = RIGHT
  
  let [i, j] = [0, 0]
  let [maxI, maxJ, minI, minJ] = [0, 0, 0, 0]
  
  while(currentValue <= number) {
    if(!Array.isArray(spiralValues[i])) {
      spiralValues[i] = []
    }

    if(!Array.isArray(spiralValues[i+1])) {
      spiralValues[i+1] = []
    }

    if(!Array.isArray(spiralValues[i-1])) {
      spiralValues[i-1] = []
    }

    currentValue = (spiralValues[i][j + 1] || 0)
      + (spiralValues[i][j - 1] || 0)
      + (spiralValues[i + 1][j] || 0)
      + (spiralValues[i + 1][j + 1] || 0)
      + (spiralValues[i + 1][j - 1] || 0)
      + (spiralValues[i - 1][j] || 0)
      + (spiralValues[i - 1][j + 1] || 0)
      + (spiralValues[i - 1][j - 1] || 0)

    spiralValues[i][j] = currentValue || 1

    if(direction === RIGHT && i === maxI) {
      i += 1
      direction = UP
      maxI += 1
    } else if(direction === UP && j === maxJ) {
      j += 1
      direction = LEFT
      maxJ += 1
    } else if(direction === LEFT && i === minI) {
      i -= 1
      direction = DOWN
      minI -= 1
    } else if(direction === DOWN && j === minJ) {
      j -= 1
      direction = RIGHT
      minJ -= 1
    } else {
      switch(direction) {
        case RIGHT:
          i += 1
          break
        case UP:
          j += 1
          break
        case LEFT:
          i -= 1
          break
        case DOWN:
          j -= 1
          break
      }
    }
  }

  return currentValue
}