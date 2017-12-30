function myFunction() {

  var name = document.getElementsByClassName('name').value;
  var save = document.getElementsByClassName('save').value;
  var bs = document.getElementsByClassName('bs').value;
  var attacks = document.getElementsByClassName('attacks').value;
  var strength = document.getElementsByClassName('strength').value;
  var ap = document.getElementsByClassName('ap').value;
  var d = document.getElementsByClassName('d').value;
  var points = document.getElementsByClassName('points').value;

  var hits = attacks*bs;
  var wounds = hits*0.5;
  var unsaved = wounds*(1-save);
  var damage = unsaved*d;
  var dpp = damage/points;

  document.getElementsByClassName('hits').innerHTML = hits;
  document.getElementsByClassName('wounds').innerHTML = wounds;
  document.getElementsByClassName('unsaved').innerHTML = unsaved;
  document.getElementsByClassName('damage').innerHTML = damage;
  document.getElementsByClassName('dpp').innerHTML = dpp;

    document.getElementById("demo").innerHTML = "Hello World";
}
