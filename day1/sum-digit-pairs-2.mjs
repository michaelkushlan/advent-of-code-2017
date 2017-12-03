import R from 'ramda'

export function sumDigitPairs(digits) {
  const digitsLength = R.length(digits)

  return R.compose(
    R.prop('sum'),
    R.reduce((prev, curr) => {
      const newIndex = (prev.index + prev.halfLength) % prev.length
    
      return curr === digits[newIndex]
        ? { ...prev, index: prev.index + 1, sum: prev.sum + parseInt(curr) }
        : { ...prev, index: prev.index + 1 }
    }, { digits, index: 0, sum: 0, length: digitsLength, halfLength: digitsLength / 2 })
  )(digits)
}