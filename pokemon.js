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
  var strongs = detectCycleOnType('S', [], type, 0)
  // var strongs = JSON.stringify(detectCycleOnType('S', [], type, 0), null, 1)
  var weaks = detectCycleOnType('W', [], type , 0)
  // var immune = detectCycleOnType('I', [], type)

  strongs = flatten([strongs]).getCycles(type).arraySort()
  weaks = flatten([weaks]).getCycles(type).arraySort()


  // if (strongs.length > 0 && weaks.length > 0) {
    console.log('========== FOR TYPE :', type)
    console.log('cycle: ' ,compareArrays(strongs, weaks))
    // console.log('strongs: ', strongs)
    // console.log('weak: ', weaks)
  // }
}

function detectCycleOnType(dir, seen, type, depth) {
  if (depth > 3) {
    if (seen[0] === seen[seen.length + 1]) {
      return seen
    } else {
      return
    }
  }

  // console.log('TYPE: ', type)
  var children = typeData[type][dir]
  // console.log(`depth: ${depth} :: children ${children}`)
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


function flatten (arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

Array.prototype.arraySort = function () {
  let result = []

  for (var i = 0; i < this.length; i++) {
    result.push(this[i].sort())
  }

  return result
}

Array.prototype.getCycles = function (type) {
  let result1 = []
  let temp = []

  for (var i = 0; i < this.length; i++) {
    if (!this[i]) {
      temp = []
    } else if (temp.length === 0 || temp[0] !== this[i]) {
      temp.push(this[i])
    } else if (this[i] === temp[0]) {
      result1.push(temp)
      temp = []
    }
  }
// console.log(result1);
  let result = []
  for (var i = 0; i < result1.length; i++) {
    if (result1[i][0]) {
      result.push(result1[i].getUnique())
    }
  }

  return result
}

Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
}

function compareArrays (arrays1, arrays2) {
  let result = []
  for (var i = 0; i < arrays1.length; i++) {
    for (var j = 0; j < arrays2.length; j++) {
      if (arrays2[j].compare(arrays1[i])) {
        result.push(arrays1[i])
      }
    }
  }
  return result
}

Array.prototype.compare = function(testArr) {
    if (this.length != testArr.length) return false;
    for (var i = 0; i < testArr.length; i++) {
        if (this[i].compare) {
            if (!this[i].compare(testArr[i])) return false;
        }
        if (this[i] !== testArr[i]) return false;
    }
    return true;
}

// detectCycles('WATER')
Object.keys(typeData).forEach(detectCycles)

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
