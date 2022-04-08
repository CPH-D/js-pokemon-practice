// dataBase for pokemon characters
var pokemonDB = [
    {
      name: 'charmander',
      type: 'fire',
      hp: 39,
      attack: 52,
      defense: 43,
      level: 1,
      img: 'http://www.smogon.com/dex/media/sprites/xy/charmander.gif'
    },
    {
      name: 'bulbasaur',
      type: 'grass',
      hp: 45,
      attack: 49,
      defense: 49,
      level: 1,
      img: 'http://www.smogon.com/dex/media/sprites/xy/bulbasaur.gif'
    },
    {
      name: 'squirtle',
      type: 'water',
      hp: 44,
      attack: 48,
      defense: 65,
      level: 1,
      img: 'http://www.smogon.com/dex/media/sprites/xy/squirtle.gif'
    },
  ]

// state
var gameState = {
  userPokemon: '',
  rivalPokemon: ''
}
console.log(gameState)

// elements
var pokemonsEl = document.querySelector('.select-screen').querySelectorAll('.character')
var battleScreenEl = document.getElementById('battle-screen')

var attackBtnsEl = document.getElementById('battle-screen').querySelectorAll('.attack')
console.log(attackBtnsEl)


// initial loop for character selection
var i = 0
while (i < pokemonsEl.length) {
  // add function to all characters on screen select
  pokemonsEl[i].onclick = function() {
    // current selected pokemons name
    var pokemonName = this.dataset.pokemon

    // elements for images on battle screen
    var player1Img = document.querySelector('.player1').getElementsByTagName('img')
    var player2Img = document.querySelector('.player2').getElementsByTagName('img')
    
    // we save the current pokemon
    gameState.userPokemon = pokemonName

    // cpu pics a pokemon 
    cpuPick()

    // change screen to battle scene
    battleScreenEl.classList.toggle('active')
        
    // select data from current user pokemon
    gameState.currentPokemon = pokemonDB.filter(function(pokemon) {
      return pokemon.name == gameState.userPokemon
    })
    player1Img[0].src = gameState.currentPokemon[0].img

    // select data from current cpu pokemon
    gameState.currentRivalPokemon = pokemonDB.filter(function(pokemon) {
      return pokemon.name == gameState.rivalPokemon
    })
    player2Img[0].src = gameState.currentRivalPokemon[0].img


    // current user and cpu pokemon initial health
    gameState.currentPokemon[0].health = calculateInitialHealth(gameState.currentPokemon)
    gameState.currentRivalPokemon[0].health = calculateInitialHealth(gameState.currentRivalPokemon)
    
    console.log(gameState)


    // player chooses attack

    
    // cpu health goes down


    // cpu attack


    // player health goes down


    // rock > scissors

    
    // paper > rock
    
    
    // scissors > paper


    // depending on pokemon type and defense is how hard the attack is going to be and how much health it will take out


    // then who ever get to health <= 0 loses

    
  }
  i++
}


var a = 0
while (a < attackBtnsEl.length) {
  attackBtnsEl[a].onclick = function() {
    var attackName = this.dataset.attack
    gameState.currentUserAttack = attackName
    
    play(attackName, cpuAttack())
  }
  a++
}


var cpuAttack = function() {
  var attacks = ['rock', 'paper', 'scissors']
  return attacks [randomNumber(0, 3)]
}


var calculateInitialHealth = function(user) {
  return ((0.20 * Math.sqrt(user[0].level)) * user[0].defense) * user[0].hp
}


var attackMove = function(attack, level, stack, critical, enemy, attacker) {
  console.log(enemy.name + ' before: ' + enemy.health)

  var attackAmount = ((attack * level ) * (stack + critical))
  enemy.health = enemy.health - attackAmount
  checkWinner(enemy, attacker)
  console.log(enemy.name + ' after: ' + enemy.health)
}


var checkWinner = function(enemy, attacker) {
  if(enemy.health <= 0) {
    console.log('The winner is... ' + attacker.name + "!")
  }
}


var play = function(userAttack, cpuAttack) {

  var currentPokemon = gameState.currentPokemon[0]
  var currentRivalPokemon = gameState.currentRivalPokemon[0]
  
  switch(userAttack){
    case 'rock':
      if(cpuAttack == 'paper'){
        if(currentPokemon.health > 0 && currentRivalPokemon.health > 0) {
          // user
          attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, currentRivalPokemon)
          if(currentRivalPokemon.health > 0) {
          // cpu
          attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon)
          }
        }
      }

      if(cpuAttack == 'scissors'){
        if(currentPokemon.health > 0 && currentRivalPokemon.health > 0) {
          // user
          attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon)
          if(currentRivalPokemon.health > 0) {
          // cpu
          attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, .5, currentPokemon, currentRivalPokemon)
          }
        }
      }

      if(cpuAttack == 'rock'){
        if(currentPokemon.health > 0 && currentRivalPokemon.health > 0) {
          // user
          attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, currentRivalPokemon, currentPokemon)
          if(currentRivalPokemon.health > 0) {
          // cpu
          attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 1, currentPokemon, currentRivalPokemon)
          }
        }
      }
      break;

      case 'paper':
        if(cpuAttack == 'paper'){
          if(currentPokemon.health > 0 && currentRivalPokemon.health > 0) {
            // user
            attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, currentRivalPokemon, currentPokemon)
            if(currentRivalPokemon.health > 0) {
            // cpu
            attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 1, currentPokemon, currentRivalPokemon)
            }
          }
        }
  
        if(cpuAttack == 'scissors'){
          if(currentPokemon.health > 0 && currentRivalPokemon.health > 0) {
            // user
            attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, currentRivalPokemon, currentPokemon)
            if(currentRivalPokemon.health > 0) {
            // cpu
            attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon)
            }
          }
        }
  
        if(cpuAttack == 'rock'){
          if(currentPokemon.health > 0 && currentRivalPokemon.health > 0) {
            // user
            attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon)
            if(currentRivalPokemon.health > 0) {
            // cpu
            attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, .5, currentPokemon, currentRivalPokemon)
            }
          }
        }
        break;

      case 'scissors':
        if(cpuAttack == 'paper'){
          if(currentPokemon.health > 0 && currentRivalPokemon.health > 0) {
            // user
            attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon)
            if(currentRivalPokemon.health > 0) {
            // cpu
            attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, .5, currentPokemon, currentRivalPokemon)
            }
          }
        }
  
        if(cpuAttack == 'scissors'){
          if(currentPokemon.health > 0 && currentRivalPokemon.health > 0) {
            // user
            attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, currentRivalPokemon, currentPokemon)
            if(currentRivalPokemon.health > 0) {
            // cpu
            attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 1, currentPokemon, currentRivalPokemon)
            }
          }
        }
  
        if(cpuAttack == 'rock'){
          if(currentPokemon.health > 0 && currentRivalPokemon.health > 0) {
            // user
            attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, currentRivalPokemon, currentPokemon)
            if(currentRivalPokemon.health > 0) {
            // cpu
            attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon)
            }
          }
        }
        break;
  }
}


var randomNumber = function(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
}


var cpuPick = function() {
  gameState.rivalPokemon = pokemonsEl[randomNumber(0, 3)].dataset.pokemon
}



















// // pokemon
// // create data for 3 different pokemons, with their names, type, weaknesses, health, and attack moves(name, attack stat, maximum)
// var pokemons = [
//     {
//       name: 'charmander',
//       type: 'fire',
//       attack: 52,
//       defense: 39,
//       level: 1
//     },
//     {
//       name: 'charmander',
//       type: 'fire',
//       attack: 52,
//       defense: 39,
//       level: 1
//     },
    
//   ]
  
  
//   var attack = 20;
//   var level = 10;
//   var stack = 1.3;
//   var defense = 39;
  
//   // create a formula for attacks
//   console.log((attack * level ) * stack / 7)
  
  
  
//   // create a formula for health
//   //HP = 0.20 x Sqrt(Pokemon_level) x (HP_base_stat)
//   console.log(((0.20 * Math.sqrt(level)) * defense) * 15)
  
  
  
  
//   // let user choose 1 and then assign a random pokemon to battle thats not the users pokemon
//   // p1 vs p2
  
  
  
  
//   // when one user loses all his health declare a winner
  
  