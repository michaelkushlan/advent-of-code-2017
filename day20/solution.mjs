import fs from 'fs'
import R from 'ramda'

import compose from '../utils/compose'
import promisify from '../utils/promisify'

const LEFT = 'left'
const RIGHT = 'right'
const UP = 'up'
const DOWN = 'down'

const readFile = promisify(fs.readFile)

export default async function solution(fileName) {
  const stream = await compose(
    R.map(R.split(', ')),
    R.split('\n'),
    R.toString,
    readFile
  )(fileName)

  let particles = []

  for(const line of stream) {
    let positions = line[0].slice(3, line[0].length - 1).split(',')
    let velocities = line[1].slice(3, line[1].length - 1).split(',')
    let accelerations = line[2].slice(3, line[2].length - 1).split(',')

    let particle = {
      x: { p: parseInt(positions[0]), v: parseInt(velocities[0]), a: parseInt(accelerations[0]) },
      y: { p: parseInt(positions[1]), v: parseInt(velocities[1]), a: parseInt(accelerations[1]) },
      z: { p: parseInt(positions[2]), v: parseInt(velocities[2]), a: parseInt(accelerations[2]) }
    }

    particles.push(particle)
  }

  let time = 0

  let iteration = 0

  while(true) {
    let hash = {}
    for(let i=particles.length - 1; i>=0; i--) {
      let particle = particles[i]
      let velocities = [particle.x.v += particle.x.a, particle.y.v += particle.y.a, particle.z.v += particle.z.a]
      let positions = [particle.x.p += particle.x.v, particle.y.p += particle.y.v, particle.z.p += particle.z.v]

      if(hash[particle.x.p.toString() + particle.y.p.toString() + particle.z.p.toString()]) {
        hash[particle.x.p.toString() + particle.y.p.toString() + particle.z.p.toString()].push({
          position: [ particle.x.p, particle.y.p, particle.z.p ],
          index: i
        })
      } else {
        hash[particle.x.p.toString() + particle.y.p.toString() + particle.z.p.toString()] = [{
          position: [particle.x.p, particle.y.p, particle.z.p],
          index: i
        }]
      }
    }

    let orderedParticleCollisions = []
    for(const values of Object.values(hash)) {
      if(values.length > 1) {
        for(const particle of values) {
          orderedParticleCollisions.push(particle.index)
        }
      }
    }

    orderedParticleCollisions.sort((a,b) => b - a)

    for(const index of orderedParticleCollisions) {
      particles.splice(index, 1)
    }

    iteration++
    if(iteration % 100 === 0) console.log(iteration, particles.length)
    if(iteration > 1000) break
  }

  return particles.length
}

(async () => {
  const answer = await solution('./input.txt')

  console.log(answer)
})()