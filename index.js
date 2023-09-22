const getPlaylist = require('./src/getPlaylist');
const download = require('./src/download.js');
const fs = require('fs');

// getPlaylist();
(async () => {
  await getPlaylist();

  const playlist = JSON.parse(fs.readFileSync('playlist.json', 'utf-8'));
  const author = playlist.author ? playlist.author.name : playlist.videos[0].author.name;
  const title = playlist.title;

  for (let i in playlist.videos) {
    if (!fs.existsSync('downloads')) fs.mkdirSync('downloads');
    if (!fs.existsSync(`downloads/${author}`)) fs.mkdirSync(`downloads/${author}`);
    if (!fs.existsSync(`downloads/${author}/${title}`)) fs.mkdirSync(`downloads/${author}/${title}`);
    if (fs.existsSync(`downloads/${author}/${title}/${playlist.videos[i].title}.mp3`)) continue;

    await download(playlist.videos[i].url, `downloads/${author}/${title}/${playlist.videos[i].title}.mp3`);
  }

  console.log('\nDownloading playlist finished!');
})();