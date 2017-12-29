function mathhammer () {

  var name = document.getElementById('name').value
  var save = document.getElementById('save').value
  var bs = document.getElementById('bs').value
  var attacks = document.getElementById('attacks').value
  var strength = document.getElementById('strength').value
  var ap = document.getElementById('ap').value
  var d = document.getElementById('d').value
  var points = document.getElementById('points').value

  var hits = attacks*bs
  var wounds = hits*0.5
  var unsaved = wounds*(1-save)
  var damage = unsaved*d
  var dpp = damage/points

  document.getElementById('model').innerHTML = name
  document.getElementById('hits').innerHTML = hits
  document.getElementById('wounds').innerHTML = wounds
  document.getElementById('unsaved').innerHTML = unsaved
  document.getElementById('damage').innerHTML = damage
  document.getElementById('dpp').innerHTML = dpp
}
