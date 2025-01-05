/*
Saweria: https://saweria.co/FatihArridho
Author: Fatih Arridho
Channel WhatsApp: https://s.id/ScrapingGratis

Mau di jual? mau di recode? silahkan, asal jangan di hapus aja author nya, hargai lah author yang sudah cape cape buat ini.
*/

const axios = require('axios');
const cheerio = require('cheerio');

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

SpotifyDownloadTrack("https://open.spotify.com/intl-id/track/5TTGoX70AFrTvuEtqHK37S?si=021661e6ba934e50")
  .then(a => console.log(a));

SpotifyDownloadAlbum("https://open.spotify.com/intl-id/album/7kFyd5oyJdVX2pIi6P4iHE")
  .then(a => console.log(a));

SpotifyDownloadPlaylist("https://open.spotify.com/playlist/4JQ9ZcrwmRlCk6WlOREFBi")
  .then(a => console.log(a));