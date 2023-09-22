const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');

module.exports = async (url, path) => {
  return new Promise((resolve, reject) => {
    const forbid = /[\/\?<>\\:\*\|"]/g;

    path = path.replace(forbid, ' - ')

    try {
      let stream = ytdl(url, {
        quality: 'highestaudio',
      });
      
      let start = Date.now();

      console.log(`\nDownloading ${path.split('/')[3]}`);
    
      ffmpeg(stream)
        .audioBitrate(128)
        .save(path)
        .on('end', () => {
          console.log(`Done, finished on ${(Date.now() - start) / 1000}s`);
          resolve();
        });
    } catch (error) {
      reject(error.message);
    };
  });
};