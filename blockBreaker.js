
var score = {};
var vinderscore = 10;
var erDerEnvinder = "NEJ"
var blockType = "GRASS"
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
      score[event.player.name] = 0
    } else {
      echo (event.player, event.block.type)
    }
    echo (event.player, score[event.player.name])
};
