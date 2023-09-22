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
          resolve(pl);
        })
        .catch((err) => reject(err.message));
      rl.close();
    });

  })
}