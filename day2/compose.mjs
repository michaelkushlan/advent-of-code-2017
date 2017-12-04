import R from 'ramda'

export default function compose() {
  return async (data) => {
    if (arguments.length === 0) {
      throw new Error('compose requires at least one argument')
    }
    
    const reversedArguments = R.reverse(arguments)
  
    let nextData = await reversedArguments[0](data)

    for(const fn of R.tail(reversedArguments)) {
      nextData = await fn(nextData)
    }

    return nextData
  }
}