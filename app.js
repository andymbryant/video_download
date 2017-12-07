const textract = require('textract');
const yargs = require('yargs');
const fs = require('fs');
const ytdl = require('ytdl-core');

const argv = yargs
  .options({
    d: {
      demand: true,
      alias: 'document',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

textract.fromFileWithPath(argv.document, (error, text) => {


  var regexp = /https/g
  var match, matches = [];

while ((match = regexp.exec(text)) != null) {
  matches.push(match.index);
}


let run = 1;

for (let i=0; i<matches.length; i++) {
  let rawText = text.substring(matches[i], text.length);
  let splitString = rawText.substring(0, rawText.indexOf(' '));

  if (run === 1) {
    ytdl(`${splitString}`).pipe(fs.createWriteStream(`Clash-of-Clans.mp4`));
    run++;
  } else if (run === 2) {
    ytdl(`${splitString}`).pipe(fs.createWriteStream(`Call-of-Duty.mp4`));
    run++;
  } else if (run === 3 ) {
    ytdl(`${splitString}`).pipe(fs.createWriteStream(`The-Emoji-Movie.mp4`));
}


}

});
