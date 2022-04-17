var randomNumbers = GenerateNumbers();
var matrix = [];
for (var i = 0; i < 5; i++) matrix[i] = [];

var n = 0,
  k = 0;

for (var i = 0; i < 5; i++) {
  for (var j = n; j < n + 5; j++) {
    matrix[i][k] = randomNumbers[j];
    k++;
  }
  n += 5;
  k = 0;
}

var potez = 0;
var suma1 = 0,
  suma2 = 0;
var br = 0;
var pl = false;
var player1 = !pl;
var prvi = player1;

if (br > 0) {
  pl = !pl;
  player1 = !pl;
}
var pamti = 0;
function ChangeNumber(potez2, indexNiz) {
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      pamti = i + j + 2;
      if (potez2 == pamti) {
        pamti += i + j + 2;
        console.log("pamti " + pamti);

        var randomNumber = Math.floor(Math.random() * (10 - 0) + 0);
        if (randomNumber == 11) randomNumber = "smjesko";
        if (randomNumber == 12) randomNumber = "ljutko";
        matrix[i][j] = randomNumber;

        randomNumbers[i * 5 + j] = randomNumber;

        return true;
      }
    }
  }

  return false;
}

function NewGame() {
  br++;
  suma1 = 0;
  suma2 = 0;
  potez = 0;
  pamti = 0;
  randomNumbers = GenerateNumbers();
  var matrix = [];
  for (var i = 0; i < 5; i++) matrix[i] = [];

  var n = 0,
    k = 0;

  for (var i = 0; i < 5; i++) {
    for (var j = n; j < n + 5; j++) {
      matrix[i][k] = randomNumbers[j];
      k++;
    }
    n += 5;
    k = 0;
  }

  document.getElementById("score1").innerHTML = suma1;
  document.getElementById("score2").innerHTML = suma2;
  $("#game-winner").modal("hide");
  if (pl == true) {
    pl = false;
    player1 = pl;
    document.getElementById("plays").innerHTML = "Igrač 1 je na potezu";
  } else {
    pl = true;
    player1 = pl;
    document.getElementById("plays").innerHTML = "Igrač 2 je na potezu";
  }
}

function MixCards(k) {
  if (randomNumbers[k] == "smjesko" || randomNumbers[k] == "ljutko") {
    randomIndex = Math.floor(Math.random() * (24 - 0) + 0);
    tmp = randomNumbers[k];
    randomNumbers[k] = randomNumbers[randomIndex];
    randomNumbers[randomIndex] = tmp;
  }
}

function RandomizeArray(array) {
  var tmp, randomIndex;

  for (var i = array.length - 1; i > 0; i--) {
    randomIndex = Math.floor(Math.random() * i);

    tmp = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = tmp;
  }

  return array;
}

function GenerateNumbers() {
  var niz11 = ["smjesko", "smjesko", "smjesko", "smjesko"]; //smjesko
  var niz12 = ["ljutko", "ljutko", "ljutko", "ljutko"]; //ljutko
  var niz2 = niz11.concat(niz12);
  var niz1 = Array.from({ length: 17 }, () => Math.floor(Math.random() * 11));
  randomNumbers = RandomizeArray(niz1.concat(niz2));
  return randomNumbers;
}

function Score(suma, number) {
  if (number == "smjesko") suma *= 2;
  else if (number == "ljutko") suma = 0;
  else suma += number;
  return suma;
}

function ShowNumber(id, k) {
  var label = document.createElement("label");
  label.innerHTML = randomNumbers[k];
  label.id = "label" + k;
  document.getElementById(id).appendChild(label);
  window.setInterval(function() {
    $(`#label${k}`)
      .delay(1500)
      .hide(0);
    label.innerHTML = "";
    document.getElementById(id).appendChild(label);
  }, 1000);

  var change = ChangeNumber(potez, k);
  potez++;
  if (change) {
    label.innerHTML = randomNumbers[k];
    document.getElementById(id).appendChild(label);
    window.setInterval(function() {
      $(`#label${k}`)
        .delay(1500)
        .hide(0);
      label.innerHTML = "";
      document.getElementById(id).appendChild(label);
    }, 1000);
  }

  if (prvi) {
    document.getElementById("plays").innerHTML = "Igrač 2 je na potezu";
    suma1 = Score(suma1, randomNumbers[k]);
    document.getElementById("score1").innerHTML = suma1;
    if (suma1 >= 50) {
      $("#game-winner").modal("show");
      document.getElementById("winner").innerHTML =
        "Igrač 1 je pobijedio. Čestitamo!";
    }
  } else {
    document.getElementById("plays").innerHTML = "Igrač 1 je na potezu";
    suma2 = Score(suma2, randomNumbers[k]);
    document.getElementById("score2").innerHTML = suma2;
    if (suma2 >= 50) {
      $("#game-winner").modal("show");
      document.getElementById("winner").innerHTML =
        "Igrač 2 je pobijedio. Čestitamo!";
    }
  }
  prvi = !prvi;
  MixCards(k);
}
