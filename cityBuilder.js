var here = "here"
var params = 50
var startPosition = "INGENTING"
var tidSidenSidst = [];

function bygArena(params, sender){
    materiale = 7 // Bedrock er nummer 7 bloacks.bedrock
    bredde = 20
    laengde = 20
    hoejde = 3
    var Drone = require('drone');
    arenaDrone = new  Drone(sender.location);
    if (sender.location.yaw > 225 && sender.location.yaw < 315) {
      echo (sender, "Yaw 225-315")
      arenaDrone.back(10);
      arenaDrone.left(4); //venstre
    }else if (sender.location.yaw > 135 && sender.location.yaw < 225) {
      echo (sender, "Yaw 135-225")
      arenaDrone.back(10)
      arenaDrone.right(4)
    }else if (sender.location.yaw > 45 && sender.location.yaw < 135) {
      echo (sender, "Yaw 45-135")
      arenaDrone.back(10) //ok
    } else {
      echo (sender, "Yaw 315-360 eller 0-45")
      arenaDrone.back(10) //ok
    }
    arenaDrone.down(1)
    arenaDrone.box(materiale,bredde,1,laengde)
    arenaDrone.up(1)
    arenaDrone.box0(materiale, bredde, hoejde, laengde)
    arenaDrone.up(hoejde)
    arenaDrone.box(20,bredde,1,laengde)
    arenaDrone.down(1)
    arenaDrone.fwd(12)
    arenaDrone.right(5)
    arenaDrone.box(10,2,1,2)
}

function buildCity(params, sender){
  echo (sender, params)
  if (startPosition == "INGENTING") {
    echo(sender, "start med at bruge /jsp setStart bummelum");
  } else {
    var Drone = require('drone');
    playerDrone = new Drone(startPosition);
    clearArea(startPosition);
    bygHus(startPosition, 20);
    playerDrone.fwd(15);
    bygAndet(playerDrone, 7, 6, 3);
    playerDrone.fwd(15);
    bygAndet(playerDrone, 7, 10, 8);
    //echo(sender, startPosition);
  }
};

function setStart(params, sender) {
    if ( sender.onGround ){
      echo (sender, "Settings locattion to " + sender.location);
      startPosition = sender.location;
    } else {
      echo (sender, "Heeey du er vist ude at flyve")
    }
};

function canI(sender){
  var d = new Date();
  if (tidSidenSidst[sender] === undefined) {
    tidSidenSidst[sender] = ""
  }
  if (tidSidenSidst[sender] !== ""){
    if (d.getTime() > (tidSidenSidst[sender] + 10000)) {
      tidSidenSidst[sender] = d.getTime();
      return true;
    } else {
      echo (sender, "false")
      return false;
    }
  }
  tidSidenSidst[sender] = d.getTime();
  echo (sender, "tid sat")
  return true;
}

function givMig(params, sender) {
  if ( canI(sender) === false ){
    echo (sender, "Veeeent lige lidt")
  } else {
    echo (sender, "afleverer")
  var inventory = require('inventory');
  var items = require('items');
  inventory(sender)
    .add( items.diamondPickaxe(1))
    }
}

function clearArea(location) {
  var Drone = require('drone');
  playerDrone = new Drone(location);
  playerDrone.chkpt( 'cityStart' );
  playerDrone.left(10);
  playerDrone.box('blocks.air', 20, 20, 20);
  playerDrone.move('cityStart');
}

function bygHus(location, materiale) {
  var Drone = require('drone');
  husDrone = new  Drone(location);
  husDrone.box0(materiale, 4, 3, 8);
  husDrone.up(3);
  husDrone.prism0(134,4,8);
}

function bygAndet(sender, materiale, hoejde, bredde, dybde) {
  var Drone = require('drone');
  husDrone = new  Drone(sender.location);
  husDrone.box0(materiale, bredde, hoejde, dybde);
  husDrone.up(hoejde);
  husDrone.prism0(134,bredde,dybde);
}

function bygnoget(params, sender) {
  materiale = params[0];
  hoejde = parseInt(params[1]);
  bredde = parseInt(params[2]);
  dybde = parseInt(params[3]);
  bygAndet(sender, materiale, hoejde, bredde, dybde)
}

command(bygArena, here);
command(givMig, here);
command(buildCity, here);
command(setStart, here);
command(bygnoget, params);
