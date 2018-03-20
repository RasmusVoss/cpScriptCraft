var dummy = ""
var score = {};
var vinderscore = 10;
var erDerEnvinder = "NEJ"
var blockType = "GRASS"
var erSpilletStartet = "NEJ"
events.blockBreak( harDuVundet );
events.entityDeath( noget );

function noget( event ){
  var utils = require('utils');
  players = utils.players();
  i = 0;
  for ( ; i < players.length; i++ ) {
      echo(players[i], "Killing a " + event.entity.variant)
    }
}

function harDuVundet( event ){
    if (erSpilletStartet == "JA") {
      if (score[event.player.name] === undefined) {
        score[event.player.name] = 0
      }
      if (event.block.type == blockType) {
        score[event.player.name] = score[event.player.name] - 1
      } else {
        score[event.player.name] = score[event.player.name] + 1
      }
      if (score[event.player.name] == vinderscore){
        echo (event.player, "Du er bare en vinder")
        erSpilletStartet = "NEJ"
        score[event.player.name] = 0
      } else {
        echo (event.player, event.block.type)
      }
      echo (event.player, score[event.player.name])
    }
};

function startSpil(params, sender) {
  erSpilletStartet = "JA"
  playerDrone = new  Drone(sender.location);
  playerDrone.chkpt('trappestart')
  playerDrone.move('trappestart')
  var op = 0
  while (op < 20) {
    playerDrone.fwd(1)
    playerDrone.chkpt('start')
    playerDrone.box(110,1,1,1)
    playerDrone.back(1+op+op)
    playerDrone.box(110,1,1,1)
    playerDrone.move('start')
    playerDrone.up(1)
    op++;
  }
}

command(startSpil, dummy);
