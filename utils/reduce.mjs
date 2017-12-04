import R from 'ramda'

export default async function reduce(fn, init, data) {
  let nextData = R.defaultTo(data[0], init)

  for(const piece of data) {
    nextData = await fn(nextData, piece)
  }

  return nextData
}