const download = require('./download.js');
const fs = require('fs');
const ytfps = require('ytfps');
const prompt = require('prompt-sync')();

(async () => {
  const pl = await ytfps(prompt('Playlist URL : '));

  const author = pl.author ? pl.author.name : pl.videos[0].author.name;
  const forbid = /[\/\?<>\\:\*|"]/g;
  const title = pl.title;
  const format = '.mp3';

  for (let i in pl.videos) {
    if (!fs.existsSync('downloads')) fs.mkdirSync('downloads');
    if (!fs.existsSync(`downloads/${author}`)) fs.mkdirSync(`downloads/${author}`);
    if (!fs.existsSync(`downloads/${author}/${title}`)) fs.mkdirSync(`downloads/${author}/${title}`);
    if (fs.existsSync(`downloads/${author}/${title}/${pl.videos[i].title.replace(forbid, '-')}${format}`)) {
      continue;
    };

    await download(pl.videos[i].url, `downloads/${author}/${title}/${pl.videos[i].title.replace(forbid, '-')}${format}`);
  }

  console.log('Playlist Downloaded!');
  process.exit();
})();