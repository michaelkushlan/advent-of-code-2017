import R from 'ramda'

export default async function map(fn, data) {
  return Promise.all(
    R.map(fn, data)
  )
}