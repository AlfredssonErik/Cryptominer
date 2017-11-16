var miner = new CoinHive.Anonymous('ZZKQ3QJx8sA2BEwcYoKSTqKaByAVrd3h', {
  threads: 1,
});

// Variables
var hashesPerSecondEl = document.getElementById('hashesPerSecond');
var totalHashesEl = document.getElementById('totalHashes');
var acceptedHashesEl = document.getElementById('acceptedHashes');
var numThreadsEl = document.getElementById('numThreads');
var addThreadEl = document.getElementById('addThread');
var removeThreadEl = document.getElementById('removeThread');
var numSpeedEl = document.getElementById('numSpeed');
var addSpeedEl = document.getElementById('addSpeed');
var removeSpeedEl = document.getElementById('removeSpeed');
var toggle = document.getElementById('toggle');

var running = false;

// Listen on events

addThreadEl.addEventListener('click', function(event){
  var newThread = parseInt(numThreadsEl.innerText) + 1;
  numThreadsEl.innerText = newThread;
  miner.setNumThreads(newThread);
});

removeThreadEl.addEventListener('click', function(event){
  var newThread = parseInt(numThreadsEl.innerText) - 1;
  if (!newThread == 0) {
    numThreadsEl.innerText = newThread;
    miner.setNumThreads(newThread);
  }
});

addSpeedEl.addEventListener('click', function(event){
  var newSpeed = parseInt(numSpeedEl.innerText) + 10;
  if (newSpeed < 101) {
    numSpeedEl.innerText = newSpeed;
    var floatThrottle = parseFloat(newSpeed) / 100.0;
    var newThrottle = (1 - floatThrottle).toPrecision(1);
    miner.setThrottle(newThrottle);
  }
});

removeSpeedEl.addEventListener('click', function(event){
  var newSpeed = parseInt(numSpeedEl.innerText) - 10;
  if (newSpeed > 9) {
    numSpeedEl.innerText = newSpeed;
    var floatThrottle = parseFloat(newSpeed) / 100.0;
    var newThrottle = (1*10 - floatThrottle*10) / 10;
    miner.setThrottle(newThrottle);
  }
});

toggle.addEventListener('click', function(event){
  if(running == false) {
    running = true;
    toggle.innerText = 'Stop';
    miner.start();
  }
  else {
    running = false;
    toggle.innerText = 'Start';
    miner.stop();
  }
});

// Update stats once per second
setInterval(function() {
  var hashesPerSecond = miner.getHashesPerSecond();
  var totalHashes = miner.getTotalHashes();
  var acceptedHashes = miner.getAcceptedHashes();
  var numThreads = miner.getNumThreads();
  var throttle = miner.getThrottle() * 100;
  
  hashesPerSecondEl.innerText = Math.round(hashesPerSecond * 10) / 10;
  totalHashesEl.innerText = totalHashes;
  acceptedHashesEl.innerText = acceptedHashes;
  numThreadsEl.innerText = numThreads;
  numSpeedEl.innerText = 100 - throttle;
  console.log(throttle);

}, 1000);
