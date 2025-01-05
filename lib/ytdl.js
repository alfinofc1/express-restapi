const axios = require('axios');
const ytSearch = require('yt-search');
const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const execPromise = promisify(exec);

const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/(?:v|e(?:mbed)?)\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})|(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/;

class Youtube {
    async ytmp3(url) {
        const match = url.match(youtubeRegex);
        const videoId = match ? match[1] || match[2] : null;
        if (!videoId) {
            throw new Error('Invalid YouTube URL');
        }

        // Mencari informasi video melalui yt-search
        const { videos } = await ytSearch(videoId);
        if (videos.length === 0) {
            throw new Error('Video not found');
        }
        const videoDetails = videos.find(a => a.videoId === videoId);
        let result = {};

        try {
            // Mengirimkan permintaan ke API
            const response = await axios.post('https://cobalt-api.kwiatekmiki.com', {
                url: url,
                downloadMode: "audio"
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });

            // Menampilkan respons API di console
            console.log('API Response:', response.data.error);

            // Cek jika URL download ada dalam respons API
            if (response.data && response.data.url) {
                const data = response.data.url;
                const buffer = await axios.get(data, { responseType: 'arraybuffer' });
                result = Buffer.from(buffer.data);

                return {
                    metadata: {
                        title: videoDetails.title,
                        seconds: videoDetails.seconds,
                        thumbnail: videoDetails.thumbnail,
                        views: videoDetails.views.toLocaleString(),
                        publish: videoDetails.ago,
                        author: videoDetails.author,
                        url: videoDetails.url,
                        description: videoDetails.description
                    },
                    download: result
                };
            } else {
                throw new Error('No download URL returned from API');
            }
        } catch (error) {
            console.error('Error while fetching audio:', error);
            throw error;
        }
    }

    async ytmp4(url) {
        const match = url.match(youtubeRegex);
        const videoId = match ? match[1] || match[2] : null;
        if (!videoId) {
            throw new Error('Invalid YouTube URL');
        }

        // Mencari informasi video melalui yt-search
        const { videos } = await ytSearch(videoId);
        if (videos.length === 0) {
            throw new Error('Video not found');
        }
        const videoDetails = videos.find(a => a.videoId === videoId);
        let result = {};

        try {
            // Mengirimkan permintaan ke API
            const response = await axios.post('https://cobalt-api.kwiatekmiki.com', {
                url: url
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });

            // Menampilkan respons API di console
            console.log('API Response:', response.data.error);

            // Cek jika URL download ada dalam respons API
            if (response.data && response.data.url) {
                const data = response.data.url;
                const buffer = await axios.get(data, { responseType: 'arraybuffer' });
                result = Buffer.from(buffer.data);

                return {
                    metadata: {
                        title: videoDetails.title,
                        seconds: videoDetails.seconds,
                        thumbnail: videoDetails.thumbnail,
                        views: videoDetails.views.toLocaleString(),
                        publish: videoDetails.ago,
                        author: videoDetails.author,
                        url: videoDetails.url,
                        description: videoDetails.description
                    },
                    download: result
                };
            } else {
                throw new Error('No download URL returned from API');
            }
        } catch (error) {
            console.error('Error while fetching video:', error);
            throw error;
        }
    }
}

module.exports = new Youtube();