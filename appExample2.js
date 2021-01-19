const watson = require('watson-developer-cloud');
const config = require('./config');  // gets our username and password
const speech_to_text = watson.speech_to_text({
    apikey: config.apikey,
    url: config.url,
    version: 'v1'
});

const mic = require('mic');

const micParams={
  rate:44100,
  channels:2,
  debug:false,
  exitOnSilence:6
};

var micInstance = mic({ 'rate': '44100', 'channels': '2', 'debug': false, 'exitOnSilence': 6 });

var micInputStream = micInstance.getAudioStream();

micInputStream.on('data', function(data) {
  console.log("Recieved Input Stream: " + data.length);
});

micInputStream.on('silence', function() {
  // detect silence.
});
micInstance.start();

console.log("Listening, you may speak now.");

var recognizeparams = {
  content_type: 'audio/l16; rate=44100; channels=2',
  model: 'en-US_BroadbandModel'  // Specify your language model here
};
var textStream = micInputStream.pipe(
  speech_to_text.createRecognizeStream(recognizeparams)
);

textStream.setEncoding('utf8');
textStream.on('data', function(str) {
    console.log(' ===== Speech to Text ===== : ' + str); // print each text we $
    parseText(str);
});

textStream.on('error', function(err) {
  console.log(' === Watson Speech to Text : An Error has occurred =====') ; // $
  console.log(err) ;
  console.log("Press <ctrl>+C to exit.") ;
});

function parseText(str){
  /* You can check str here */
}

