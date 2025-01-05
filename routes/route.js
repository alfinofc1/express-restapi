const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();
const Instagram = require('../lib/igdl');
const YoutubeAudio = require('../lib/ytmp3');
const YoutubeVideo = require('../lib/ytmp4');
const { fetchJson, getBuffer } = require('../lib/func');

const POST_URL = "https://spotiflyer.app/wp-content/plugins/codehap_spotifyDownloader/result.php";
const DOWNLOAD_URL = "https://spotiflyer.app/wp-content/plugins/codehap_spotifyDownloader/download.php";

const SpotifyDownloadTrack = async (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const array_result = [];
      const response = await axios.post(POST_URL, new URLSearchParams({ data: url }));
      const $ = cheerio.load(response.data);

      const get_download = await axios.post(DOWNLOAD_URL, new URLSearchParams({
        previewUrl: $('#previewUrl').val(),
        id: $('#id').val(),
        ytid: $('#ytid').val(),
        title: $('#title').val(),
        type: $('button.dlbutton').attr('value')
      }));
      const $$ = cheerio.load(get_download.data);

      array_result.push({
        image: $('img').attr('src'),
        title: $('h3').first().text().trim(),
        artist: $('h3').next().text().split('|')[0].trim(),
        album: $('h3').next().text().split('|')[1].trim(),
        downloadUrl: $$('meta[http-equiv="refresh"]').attr('content').split('URL=')[1]
      });

      resolve(array_result[0]);
    } catch (error) {
      reject(error);
    }
  });
};

const SpotifyDownloadAlbum = async (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(POST_URL, new URLSearchParams({ data: url }));
      const $ = cheerio.load(response.data);

      const track = [];
      const downloadAllTracks = [];
      const listDownload = [];

      $('.album_track button[onclick]').each((_, element) => {
        const onclickValue = $(element).attr('onclick');
        const match = onclickValue.match(/GetDownloadButtonthis, (\d+), '(.*?)'/);
        if (match) {
          downloadAllTracks.push({
            playlist: true,
            trackid: match[1],
            title: match[2]
          });
        }
      });

      for (let i of downloadAllTracks) {
        const get_download = await axios.post(DOWNLOAD_URL, new URLSearchParams({
          playlist: i.playlist,
          trackid: i.trackid,
          title: i.title
        }));

        const $$ = cheerio.load(get_download.data);
        listDownload.push({
          downloadUrl: $$('meta[http-equiv="refresh"]').attr('content').split('URL=')[1]
        });
      }

      $('.album_track').each((_, element) => {
        track.push({
          title_music: $(element).find('h3').text().trim(),
          artist_music: $(element).find('div').eq(1).text().trim(),
        });
      });

      const tracks = track.map((trackItem, index) => {
        return {
          ...trackItem,
          downloadUrl: listDownload[index] ? listDownload[index].downloadUrl : ''
        };
      });

      let result_album = {
        image_album: $('.container_result .item1 img').attr('src'),
        title_album: $('.container_result .item2 .h1heading').text().trim(),
        artist_album: $('.container_result .item2 .m').first().text().replace('Artist: ', '').trim(),
        release_date: $('.container_result .item2 .m').eq(1).text().replace('Release Date: ', '').trim(),
        total_tracks: $('.container_result .item2 .m').eq(2).text().replace('Total Tracks: ', '').trim(),
        tracks: tracks
      };

      resolve(result_album);
    } catch (error) {
      reject(error);
    }
  });
};

const SpotifyDownloadPlaylist = async (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(POST_URL, new URLSearchParams({ data: url }));
      const $ = cheerio.load(response.data);

      const listDownload = [];
      const track = [];
      const downloadAllTracks = [];

      $('.playlist_result').each((_, element) => {
        track.push({
          image_playlist: $(element).find('img').attr('src'),
          title_music: $(element).find('h3').text().trim(),
          artist_music: $(element).find('.oneline').text().split('|')[0].trim(),
          album_music: $(element).find('.oneline').text().split('|')[1].trim()
        });
      });

      $('.playlist_result button[onclick]').each((_, element) => {
        const onclickValue = $(element).attr('onclick');
        const match = onclickValue.match(/GetDownloadButtonthis, (\d+), '(.*?)'/);
        if (match) {
          downloadAllTracks.push({
            playlist: true,
            trackid: match[1],
            title: match[2]
          });
        }
      });

      for (let i of downloadAllTracks) {
        const get_download = await axios.post(DOWNLOAD_URL, new URLSearchParams({
          playlist: i.playlist,
          trackid: i.trackid,
          title: i.title
        }));

        const $$ = cheerio.load(get_download.data);
        listDownload.push({
          downloadUrl: $$('meta[http-equiv="refresh"]').attr('content').split('URL=')[1]
        });
      }

      const tracks = track.map((trackItem, index) => {
        return {
          ...trackItem,
          downloadUrl: listDownload[index] ? listDownload[index].downloadUrl : ''
        };
      });

      let result_playlist = {
        title_playlist: $('h1').text().trim(),
        tracks
      };

      resolve(result_playlist);
    } catch (error) {
      reject(error);
    }
  });
};
// ------ Downloader ------- //
router.get("/dl/igdl", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ msg: "URL is required" });
  }

  try {
    const result = await Instagram(url);
    if (result.msg) {
      return res.status(400).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong", error: error.message });
  }
});

// ------ YouTube ------- //
router.get("/dl/ytmp3", async (req, res) => {
  const { url } = req.query;

  // Validasi parameter URL
  if (!url) {
    return res.status(400).json({
      status: false,
      creator: "© gopalasu",
      message: "[!] Masukkan parameter url"
    });
  }

  try {
    const result = await YoutubeAudio(url); // Panggil fungsi dari lib/ytmp3.js
    if (!result.status) {
      return res.status(400).json({
        status: false,
        creator: "© gopalasu",
        message: result.message || "[!] Gagal mengunduh MP3 dari YouTube."
      });
    }

    res.status(200).json({
      status: true,
      creator: "© gopalasu",
      message: "Berhasil mengambil data MP3.",
      result: result.result
    });
  } catch (err) {
    console.error("Error fetching YouTube MP3:", err.message);
    res.status(500).json({
      status: false,
      creator: "© gopalasu",
      message: "[!] Terjadi kesalahan, coba lagi nanti.",
      error: err.message
    });
  }
});

router.get('/dl/ytmp4', async (req, res) => {
  const { url, resolution } = req.query;

  // Validasi parameter
  if (!url) {
    return res.status(400).json({
      status: false,
      message: "URL is required",
    });
  }

  try {
    // Panggil fungsi YoutubeVideo
    const result = await YoutubeVideo(url, resolution);

    if (!result.status) {
      return res.status(400).json(result);
    }

    // Kirim respons sukses
    res.status(200).json({
      status: true,
      message: "Success",
      result: result.result,
    });
  } catch (error) {
    console.error("Error processing ytmp4:", error.message);

    // Kirim respons jika terjadi kesalahan
    res.status(500).json({
      status: false,
      message: "An error occurred while processing the request",
      error: error.message,
    });
  }
});

router.get('/dl/spotify', async (req, res) => {
    const { url } = req.query;

    // Validate URL
    if (!url) {
        return res.status(400).json({
            status: false,
            message: "URL is required."
        });
    }

    try {
        const result = await SpotifyDownloadTrack(url);
        console.log("Track download result:", result);

        res.status(200).json({
            status: true,
            message: "Track downloaded successfully.",
            result
        });
    } catch (error) {
        console.error("Error downloading Spotify track:", error);

        res.status(500).json({
            status: false,
            message: "An error occurred while processing the request.",
            error: error.response ? error.response.data : error.message
        });
    }
});

// ------ Maker ------- //
router.get('/maker/brat', async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json({ status: false, creator: "© gopalasu", message: "[!] masukkan parameter text" });

  try {
    const response = await axios.get(`https://brat.caliphdev.com/api/brat?text=${text}`, { responseType: 'arraybuffer' });
    res.set({ 'Content-Type': 'image/png' });
    res.send(response.data);
  } catch (err) {
    res.status(500).json({ status: false, creator: "© gopalasu", message: "[!] Terjadi kesalahan, coba lagi nanti" });
  }
});

// ------ Gallery ------- //
router.get('/gallery/indo', async (req, res, next) => {
	let femdom = (await axios.get('https://raw.githubusercontent.com/VarrelKun/data/refs/heads/main/gurl/indo.json')).data;
	let random = femdom[Math.floor(Math.random() * femdom.length)]
	var result = await getBuffer(random)
	res.set({'Content-Type': 'image/jpeg'})
	res.send(result)
})

router.get('/gallery/indo2', async (req, res, next) => {
	let femdom = (await axios.get('https://raw.githubusercontent.com/VarrelKun/data/refs/heads/main/gurl/indo2.json')).data;
	let random = femdom[Math.floor(Math.random() * femdom.length)]
	var result = await getBuffer(random)
	res.set({'Content-Type': 'image/jpeg'})
	res.send(result)
})

router.get('/gallery/china', async (req, res, next) => {
	let femdom = (await axios.get('https://raw.githubusercontent.com/VarrelKun/data/refs/heads/main/gurl/cina.json')).data;
	let random = femdom[Math.floor(Math.random() * femdom.length)]
	var result = await getBuffer(random)
	res.set({'Content-Type': 'image/jpeg'})
	res.send(result)
})

router.get('/gallery/cosplay', async (req, res, next) => {
	let femdom = (await axios.get('https://raw.githubusercontent.com/VarrelKun/data/refs/heads/main/gurl/cosplay.json')).data;
	let random = femdom[Math.floor(Math.random() * femdom.length)]
	var result = await getBuffer(random)
	res.set({'Content-Type': 'image/jpeg'})
	res.send(result)
})

router.get('/gallery/lumba', async (req, res, next) => {
	let femdom = (await axios.get('https://raw.githubusercontent.com/VarrelKun/data/refs/heads/main/gurl/lumba.json')).data;
	let random = femdom[Math.floor(Math.random() * femdom.length)]
	var result = await getBuffer(random)
	res.set({'Content-Type': 'image/jpeg'})
	res.send(result)
})

module.exports = router;