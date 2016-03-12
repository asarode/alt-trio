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
  var weaks = detectCycleOnType('W', [], type , 0)
  // var immune = detectCycleOnType('I', [], type)

  strongs = flatten([strongs]).getCycles(type).arraySort()
  weaks = flatten([weaks]).getCycles(type).arraySort()


  console.log('========== FOR TYPE :', type)
  console.log('cycle: ' ,compareArrays(strongs, weaks))
  // console.log('strongs: ', strongs)
  // console.log('weak: ', weaks)
}

function detectCycleOnType(dir, seen, type, depth) {
  if (depth > 3) {
    return
  }

  var children = typeData[type][dir]

  if (children.length === 0) {
    return false
  }

  if (seen.indexOf(type) > -1) {
    seen.push(type)
    return seen
  }

  var result = []
  children.forEach(function(childType) {
    var seenCopy = [...seen]
    var _depth = depth + 1
    seenCopy.push(type)

    var value = detectCycleOnType(dir, seenCopy, childType, _depth)
    result.push(value)
  })

  return result
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

  let output = []
  for (var i = 0; i < result1.length; i++) {
    if (result1[i][0]) {
      output.push(result1[i].getUnique())
    }
  }

  return output
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
