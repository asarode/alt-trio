'use strict'

var typeData = {
  NORMAL: {
    S: [],
    W: ['ROCK', 'STEEL'],
    I: ['GHOST']
  },
  FIGHT: {
    S: ['NORMAL', 'ROCK', 'STEEL', 'ICE', 'DARK'],
    W: ['FLYING', 'POISON', 'BUG', 'PSYCHIC', 'FAIRY'],
    I: ['GHOST']
  },
  FLYING: {
    S: ['FIGHT', 'BUG', 'GRASS'],
    W: ['ROCK', 'STEEL', 'ELECTRIC'],
    I: []
  },
  POISON: {
    S: ['GRASS', 'FAIRY'],
    W: ['POISON', 'GROUND', 'ROCK', 'GHOST'],
    I: ['STEEL']
  },
  GROUND: {
    S: ['POISON', 'ROCK', 'STEEL', 'FIRE', 'ELECTRIC'],
    W: ['BUG', 'GRASS'],
    I: ['FLYING']
  },
  ROCK: {
    S: ['FLYING', 'BUG', 'FIRE', 'ICE'],
    W: ['FIGHT', 'GROUND', 'STEEL'],
    I: []
  },
  BUG: {
    S: ['GRASS', 'PSYCHIC', 'DARK'],
    W: ['FIGHT', 'FLYING', 'POISON', 'GHOST', 'STEEL', 'FIRE', 'FAIRY'],
    I: []
  },
  GHOST: {
    S: ['GHOST', 'PSYCHIC'],
    W: ['DARK'],
    I: ['NORMAL']
  },
  STEEL: {
    S: ['ROCK', 'ICE', 'FAIRY'],
    W: ['STEEL', 'FIRE', 'WATER', 'ELECTRIC'],
    I: []
  },
  FIRE: {
    S: ['BUG', 'STEEL', 'GRASS', 'ICE'],
    W: ['ROCK', 'FIRE', 'WATER', 'DRAGON'],
    I: []
  },
  WATER: {
    S: ['GROUND', 'ROCK', 'FIRE'],
    W: ['WATER', 'GRASS', 'DRAGON'],
    I: []
  },
  GRASS: {
    S: ['GROUND', 'ROCK', 'WATER'],
    W: ['FLYING', 'POISON', 'BUG', 'STEEL', 'FIRE', 'GRASS', 'DRAGON'],
    I: []
  },
  ELECTRIC: {
    S: ['FLYING', 'WATER'],
    W: ['GRASS', 'ELECTRIC', 'DRAGON'],
    I: ['GROUND']
  },
  PSYCHIC: {
    S: ['FIGHT', 'POISON'],
    W: ['STEEL', 'PSYCHIC'],
    I: ['DARK']
  },
  ICE: {
    S: ['FLYING', 'GROUND', 'GRASS', 'DRAGON'],
    W: ['STEEL', 'FIRE', 'WATER', 'ICE'],
    I: []
  },
  DRAGON: {
    S: ['DRAGON'],
    W: ['STEEL'],
    I: ['FAIRY']
  },
  DARK: {
    S: ['GHOST', 'PSYCHIC'],
    W: ['FIGHT', 'DARK', 'FAIRY'],
    I: []
  },
  FAIRY: {
    S: ['FIGHT', 'DRAGON', 'DARK'],
    W: ['POISON', 'STEEL', 'FIRE'],
    I: []
  }
}

var detectCycles = type => {
  var strongs = JSON.stringify(detectCycleOnType('S', [], 'GRASS', 0), null, 1)
  // var weaks = detectCycleOnType('W', [], 'GRASS')
  // var immune = detectCycleOnType('I', [], type)

  // console.log('========== FOR TYPE :', type)
  // console.log('strongs: ', strongs)
  // console.log('weak: ', weaks)
}

function detectCycleOnType(dir, seen, type, depth) {

  // console.log('TYPE: ', type)
  var children = typeData[type][dir]
  console.log(`depth: ${depth} :: children ${children}`)
  // console.log('CHILDREN: ', children)

  if (children.length === 0) {
    // console.log('false? wtf are you doin here?')
    return false
  }

  // console.log('seen ', seen)
  // console.log('type', type)
  // console.log('is in seen?', seen.indexOf(type) > -1)
  if (seen.indexOf(type) > -1) {
    seen.push(type)
    // console.log(seen)
    return seen
  }

  // return children.map(childType => {
  //   seen.push(type)
  //   return detectCycleOnType(dir, seen, childType)
  // })

  var result = []
  children.forEach(function(childType) {
    var seenCopy = [...seen]
    seenCopy.push(type)
    var _depth = depth + 1
    var value = detectCycleOnType(dir, seenCopy, childType, _depth)
    // console.log(value)
    result.push(value)
  })

  return result
  
  // return detectCycleOnType(dir, seen, type)
}

detectCycles('GRASS')
// Object.keys(typeData).forEach(detectCycles)

// [
//   {
//     S: [
//       ['fire', 'water', 'grass'],
//       ['fire', 'water', 'grass']
//     ],
//     W: [
//       [[[[[[[[['grass', 'water', 'fire']]]]]]]]]
//       ['fire', 'water', 'grass'],
//       ['fidsfe', 'wadfssr', 'spdfs']
//     ],
//   }
//   ...
// ]
