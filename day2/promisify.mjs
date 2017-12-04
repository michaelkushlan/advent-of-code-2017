export default function promisify(fn) {
  return (args) => {
    return new Promise((resolve, reject) => {
      const callback = (error, data) => {
        if(error) reject(error)
        resolve(data)
      }
      
      fn(args, callback)
    })
  }
}