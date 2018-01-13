export default function solution() {
  let h =0
  let b = 8400 + 100000
  let c = b + 17000
  let g = 0
  
  do {
    let f = 1
    let d = 2
    let e = 2
    for(d=2; d*d < b; d++) {
      if( b%d ==0) {
        f = 0
        break
      }
    }
    if(f==0) {
      h++
    }
    g = b-c
    b+=17
  } while(g!=0)

  return h
}

console.log(solution())