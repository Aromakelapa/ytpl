const ytfps = require('ytfps');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

module.exports = () => {
  return new Promise((resolve, reject) => {
    rl.question('Playlist URL : ', async (url) => {
      ytfps(url)
        .then((pl) => {
          fs.writeFileSync('playlist.json', JSON.stringify(pl));
          console.log(`Playlist Name : ${pl.title}\nVideo Count : ${pl.video_count}`);
          console.log('Select Format :\n1. MP3\n2. FLAC\n');

          rl.question('Format : ', async (format) => {
            if (format == '2') {
              resolve({ ...pl, format });
            } else {
              resolve({ ...pl, format: '1'});
            };
            rl.close();
          });
        })
        .catch((err) => reject(err.message));
    });
  });
};