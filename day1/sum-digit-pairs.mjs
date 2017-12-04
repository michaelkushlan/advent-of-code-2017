import R from 'ramda'

export default function sumDigitPairs(digits) {
  return R.compose(
    R.prop('sum'),
    R.reduce((prev, curr) => {
      return prev.value === curr
        ? { sum: prev.sum + parseInt(curr), value: curr }
        : { sum: prev.sum, value: curr }
    }, { sum: 0, value: R.last(digits) })
  )(digits)
}