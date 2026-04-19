const ffmpeg = require('fluent-ffmpeg');
const ytdl = require('ytdl-core-enhanced');
const readline = require('readline');
const fs = require('fs');

module.exports = async (url, output) => {
  return new Promise((resolve, reject) => {{
    try {
      const stream = ytdl(url, { filter: 'audioonly' });
    
      ffmpeg(stream)
        .audioCodec('libmp3lame')
        .audioBitrate(192)
        .format('mp3')
        .on('start', () => {
          console.log('Download started...');
        })
        .on('progress', p => {
          readline.cursorTo(process.stdout, 0);
          process.stdout.write(`${p.targetSize}kb downloaded`);
        })
        .on('error', (err) => {
          reject(err.message);
        })
        .on('end', () => {
          console.log('\nDownload completed!\n');
          resolve();
        })
        .pipe(fs.createWriteStream(output));
    } catch (error) {
      reject(error.message);
    };
  }});
};