const express = require('express')
const axios = require('axios')
const router = express.Router();
const Instagram = require('../lib/igdl')
const YoutubeAudio = require('../lib/ytmp3')
const YoutubeVideo = require('../lib/ytmp4');
const { fetchJson, getBuffer } = require('../lib/func');

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

router.get("/dl/ytmp3", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({
      status: false,
      creator: "© alfin",
      message: "[!] Masukkan parameter url"
    });
  }
  try {
    const result = await YoutubeAudio(url); 
    if (!result.status) {
      return res.status(400).json({
        status: false,
        creator: "© gopalasu",
        message: result.message || "[!] Gagal mengunduh MP3 dari YouTube."
      });
    }
    res.status(200).json({
      status: true,
      creator: "© alfin",
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
  try {
    const result = await get(`https://raw.githubusercontent.com/NzrlAfndi/Databasee/refs/heads/main/games/asahotak.json`);
    if (!result.status) {
      return res.status(400).json(result);
    }
    res.status(200).json({
      status: true,
      message: "Success",
      result: result.result,
    });
  } catch (error) {
    console.error("Error processing ytmp4:", error.message);
    res.status(500).json({
      status: false,
      message: "An error occurred while processing the request",
      error: error.message,
    });
  }
});

//====game===//
router.get('/asaotak', async (req, res) => {
    try {
        const { data } = await axios.get('https://raw.githubusercontent.com/NzrlAfndi/Databasee/refs/heads/main/games/asahotak.json');
        res.json({ creator: "Alfin", result: true, message: "game - Asaotak", data: data });
    } catch {
        res.status(500).json({ creator: "@Alfin", result: false, message: "game - asaotak bermasalah." });
    } finally {
        console.log('game - asaotak request completed.');
    }
});

router.get('/caklontong', async (req, res) => {
    try {
        const { data } = await axios.get('https://raw.githubusercontent.com/NzrlAfndi/Databasee/refs/heads/main/games/caklontong.json');
        res.json({ creator: "Alfin", result: true, message: "game - caklontong", data: data });
    } catch {
        res.status(500).json({ creator: "@Alfin", result: false, message: "game - cak lontong bermasalah." });
    } finally {
        console.log('game - cak lontong request completed.');
    }
});

router.get('/caklontong', async (req, res) => {
    try {
        const { data } = await axios.get('https://raw.githubusercontent.com/NzrlAfndi/Databasee/refs/heads/main/games/caklontong.json');
        res.json({ creator: "Alfin", result: true, message: "game - caklontong", data: data });
    } catch {
        res.status(500).json({ creator: "@Alfin", result: false, message: "game - cak lontong bermasalah." });
    } finally {
        console.log('game - cak lontong request completed.');
    }
});

router.get('/family100', async (req, res) => {
    try {
        const { data } = await axios.get('https://raw.githubusercontent.com/NzrlAfndi/Databasee/refs/heads/main/games/family100.json');
        res.json({ creator: "Alfin", result: true, message: "game - family100", data: data });
    } catch {
        res.status(500).json({ creator: "@Alfin", result: false, message: "game - cak family100 bermasalah." });
    } finally {
        console.log('game - cak family100 request completed.');
    }
});

router.get('/lengkapikalimat', async (req, res) => {
    try {
        const { data } = await axios.get('https://raw.githubusercontent.com/NzrlAfndi/Databasee/refs/heads/main/games/lengkapikalimat.json');
        res.json({ creator: "Alfin", result: true, message: "game - lengkapikalimat", data: data });
    } catch {
        res.status(500).json({ creator: "@Alfin", result: false, message: "game - lengkapikalimat bermasalah." });
    } finally {
        console.log('game - lengkapikalimat request completed.');
    }
});

router.get('/tebakgame', async (req, res) => {
    try {
        const { data } = await axios.get('https://raw.githubusercontent.com/NzrlAfndi/Databasee/refs/heads/main/games/tebakgame.json');
        res.json({ creator: "Alfin", result: true, message: "game - tebakgame", data: data });
    } catch {
        res.status(500).json({ creator: "@Alfin", result: false, message: "game - tebakgame bermasalah." });
    } finally {
        console.log('game - tebakgame request completed.');
    }
});
///berita menu///
router.get('/antara-news/terkini', async (req, res) => {
    try {
        const { data } = await axios.get('https://berita-indo-api-next.vercel.app/api/antara-news/terkini');
        res.json({ creator: "Alfin", result: true, message: "berita- terkini", data: data });
    } catch {
        res.status(500).json({ creator: "@Alfin", result: false, message: "berita - terkini bermasalah." });
    } finally {
        console.log('berita- terkini request completed.');
    }
});

router.get('/cnn', async (req, res) => {
    try {
        const { data } = await axios.get('https://berita-indo-api-next.vercel.app/api/cnn-news');
        res.json({ creator: "Alfin", result: true, message: "berita - cnn", data: data });
    } catch {
        res.status(500).json({ creator: "@Alfin", result: false, message: "berita - cnn bermasalah." });
    } finally {
        console.log('berita - cnn request completed.');
    }
});

router.get('/republika/new', async (req, res) => {
    try {
        const { data } = await axios.get('https://berita-indo-api-next.vercel.app/api/republika-news');
        res.json({ creator: "Alfin", result: true, message: "berita - republika news", data: data });
    } catch {
        res.status(500).json({ creator: "@Alfin", result: false, message: "berita - republika news bermasalah." });
    } finally {
        console.log('berita - republika request completed.');
    }
});

router.get('/tempo/news', async (req, res) => {
    try {
        const { data } = await axios.get('https://berita-indo-api-next.vercel.app/api/tempo-news');
        res.json({ creator: "Alfin", result: true, message: "berita -", data: data });
    } catch {
        res.status(500).json({ creator: "@Alfin", result: false, message: "berita - bermasalah." });
    } finally {
        console.log('berita -request completed.');
    }
});

router.get('/okezone/news', async (req, res) => {
    try {
        const { data } = await axios.get('https://berita-indo-api-next.vercel.app/api/okezone-news');
        res.json({ creator: "Alfin", result: true, message: "berita -", data: data });
    } catch {
        res.status(500).json({ creator: "@Alfin", result: false, message: "berita - bermasalah." });
    } finally {
        console.log('berita -request completed.');
    }
});

router.get('/kumparan/news', async (req, res) => {
    try {
        const { data } = await axios.get('https://berita-indo-api-next.vercel.app/api/kumparan-news/');
        res.json({ creator: "Alfin", result: true, message: "berita -", data: data });
    } catch {
        res.status(500).json({ creator: "@Alfin", result: false, message: "berita - bermasalah." });
    } finally {
        console.log('berita -request completed.');
    }
});

//cek ressi//
router.get('/Spotify', async (req, res) => {
    try {
    	const query = req.query.query;
        if (!query) return res.status(400).json
        const { data } = await axios.get('https://api.siputzx.my.id/api/s/spotify?query=${encodeURIComponent(query)}');
        res.json({ creator: "Alfin", result: true, message: "Spotify -", data: data });
    } catch {
        res.status(500).json({ creator: "@Alfin", result: false, message: "Spotify - bermasalah." });
    } finally {
        console.log('Spotify -request completed.');
    }
});

router.get('/soundcloud', async (req, res) => {
    try {
    	const query = req.query.query;
        if (!query) return res.status(400).json
        const { data } = await axios.get('https://api.siputzx.my.id/api/s/spotify?query=${encodeURIComponent(query)}');
        res.json({ creator: "Alfin", result: true, message: "soundcloud -", data: data });
    } catch {
        res.status(500).json({ creator: "@Alfin", result: false, message: "soundcloud - bermasalah." });
    } finally {
        console.log('soundcloud -request completed.');
    }
});
//===sertifikat===
router.get('/mlbb', async (req, res) => {
    try {
        const text = req.query.text;
        if (!text) return res.status(400).json({ creator: "ALFIN", result: false, message: "Harap masukkan parameter prompt!" });

        const response = await axios.get(`https://serti.vercel.app/mlbb/${encodeURIComponent(text)}`, {
            responseType: 'arraybuffer' // Penting: minta respons sebagai arraybuffer
        });

        const imageBuffer = Buffer.from(response.data, 'binary'); // Convert data to Buffer

        // Tetapkan Content-Type berdasarkan jenis gambar (sesuaikan jika perlu)
        res.setHeader('Content-Type', 'image/jpeg'); // Asumsi: gambar adalah JPEG
        // Opsi lain: 'image/png', 'image/gif', dll. Tergantung jenis gambar yang dikembalikan API.

        res.send(imageBuffer); // Kirim data gambar sebagai respons
    } catch (error) {
        console.error(error);
        res.status(500).json({ creator: "ALFIN", result: false, message: "Gagal mendapatkan gambar dari .", error: error.message });
    } finally {
        console.log('Gambar dari  request completed.');
    }
});

router.get('/editor', async (req, res) => {
    try {
        const text = req.query.text;
        if (!text) return res.status(400).json({ creator: "ALFIN", result: false, message: "Harap masukkan parameter prompt!" });

        const response = await axios.get(`https://serti.vercel.app/editor/${encodeURIComponent(text)}`, {
            responseType: 'arraybuffer' // Penting: minta respons sebagai arraybuffer
        });

        const imageBuffer = Buffer.from(response.data, 'binary'); // Convert data to Buffer

        // Tetapkan Content-Type berdasarkan jenis gambar (sesuaikan jika perlu)
        res.setHeader('Content-Type', 'image/jpeg'); // Asumsi: gambar adalah JPEG
        // Opsi lain: 'image/png', 'image/gif', dll. Tergantung jenis gambar yang dikembalikan API.

        res.send(imageBuffer); // Kirim data gambar sebagai respons
    } catch (error) {
        console.error(error);
        res.status(500).json({ creator: "ALFIN", result: false, message: "Gagal mendapatkan gambar dari .", error: error.message });
    } finally {
        console.log('Gambar dari  request completed.');
    }
});

router.get('/yapping', async (req, res) => {
    try {
        const text = req.query.text;
        if (!text) return res.status(400).json({ creator: "ALFIN", result: false, message: "Harap masukkan parameter prompt!" });

        const response = await axios.get(`https://serti.vercel.app/yapping/${encodeURIComponent(text)}`, {
            responseType: 'arraybuffer' // Penting: minta respons sebagai arraybuffer
        });

        const imageBuffer = Buffer.from(response.data, 'binary'); // Convert data to Buffer

        // Tetapkan Content-Type berdasarkan jenis gambar (sesuaikan jika perlu)
        res.setHeader('Content-Type', 'image/jpeg'); // Asumsi: gambar adalah JPEG
        // Opsi lain: 'image/png', 'image/gif', dll. Tergantung jenis gambar yang dikembalikan API.

        res.send(imageBuffer); // Kirim data gambar sebagai respons
    } catch (error) {
        console.error(error);
        res.status(500).json({ creator: "ALFIN", result: false, message: "Gagal mendapatkan gambar dari .", error: error.message });
    } finally {
        console.log('Gambar dari  request completed.');
    }
});

router.get('/ttp', async (req, res) => {
    try {
        const text = req.query.text;
        if (!text) return res.status(400).json({ creator: "ALFIN", result: false, message: "Harap masukkan parameter prompt!" });

        const response = await axios.get(`https://alpis.eu.org/api/maker/ttp?text=${encodeURIComponent(text)}&apikey=c8370584`, {
            responseType: 'arraybuffer' // Penting: minta respons sebagai arraybuffer
        });

        const imageBuffer = Buffer.from(response.data, 'binary'); // Convert data to Buffer

        // Tetapkan Content-Type berdasarkan jenis gambar (sesuaikan jika perlu)
        res.setHeader('Content-Type', 'image/jpeg'); // Asumsi: gambar adalah JPEG
        // Opsi lain: 'image/png', 'image/gif', dll. Tergantung jenis gambar yang dikembalikan API.

        res.send(imageBuffer); // Kirim data gambar sebagai respons
    } catch (error) {
        console.error(error);
        res.status(500).json({ creator: "ALFIN", result: false, message: "Gagal mendapatkan gambar dari .", error: error.message });
    } finally {
        console.log('Gambar dari  request completed.');
    }
});

router.get('/attp', async (req, res) => {
    try {
        const text = req.query.text;
        if (!text) return res.status(400).json({ creator: "ALFIN", result: false, message: "Harap masukkan parameter prompt!" });

        const response = await axios.get(`https://alpis.eu.org/api/maker/attp?text=${encodeURIComponent(text)}&apikey=c8370584`, {
            responseType: 'arraybuffer' // Penting: minta respons sebagai arraybuffer
        });

        const imageBuffer = Buffer.from(response.data, 'binary'); // Convert data to Buffer

        // Tetapkan Content-Type berdasarkan jenis gambar (sesuaikan jika perlu)
        res.setHeader('Content-Type', 'image/gif'); // Asumsi: gambar adalah JPEG
        // Opsi lain: 'image/png', 'image/gif', dll. Tergantung jenis gambar yang dikembalikan API.

        res.send(imageBuffer); // Kirim data gambar sebagai respons
    } catch (error) {
        console.error(error);
        res.status(500).json({ creator: "ALFIN", result: false, message: "Gagal mendapatkan gambar dari .", error: error.message });
    } finally {
        console.log('Gambar dari  request completed.');
    }
});

router.get('/trigger', async (req, res) => {
    try {
        const url = req.query.url;
        if (!url) return res.status(400).json({ creator: "ALFIN", result: false, message: "Harap masukkan parameter prompt!" });

        const response = await axios.get(`https://alpis.eu.org/api/maker/trigger?url=${encodeURIComponent(url)}&apikey=c8370584`, {
            responseType: 'arraybuffer' // Penting: minta respons sebagai arraybuffer
        });

        const imageBuffer = Buffer.from(response.data, 'binary'); // Convert data to Buffer

        // Tetapkan Content-Type berdasarkan jenis gambar (sesuaikan jika perlu)
        res.setHeader('Content-Type', 'image/gif'); // Asumsi: gambar adalah JPEG
        // Opsi lain: 'image/png', 'image/gif', dll. Tergantung jenis gambar yang dikembalikan API.

        res.send(imageBuffer); // Kirim data gambar sebagai respons
    } catch (error) {
        console.error(error);
        res.status(500).json({ creator: "ALFIN", result: false, message: "Gagal mendapatkan gambar dari .", error: error.message });
    } finally {
        console.log('Gambar dari  request completed.');
    }
});

router.get('/wanted', async (req, res) => {
    try {
        const url = req.query.url;
        if (!url) return res.status(400).json({ creator: "ALFIN", result: false, message: "Harap masukkan parameter prompt!" });

        const response = await axios.get(`https://alpis.eu.org/api/maker/wanted?url=${encodeURIComponent(url)}&apikey=c8370584`, {
            responseType: 'arraybuffer' // Penting: minta respons sebagai arraybuffer
        });

        const imageBuffer = Buffer.from(response.data, 'binary'); // Convert data to Buffer

        // Tetapkan Content-Type berdasarkan jenis gambar (sesuaikan jika perlu)
        res.setHeader('Content-Type', 'image/png'); // Asumsi: gambar adalah JPEG
        // Opsi lain: 'image/png', 'image/gif', dll. Tergantung jenis gambar yang dikembalikan API.

        res.send(imageBuffer); // Kirim data gambar sebagai respons
    } catch (error) {
        console.error(error);
        res.status(500).json({ creator: "ALFIN", result: false, message: "Gagal mendapatkan gambar dari .", error: error.message });
    } finally {
        console.log('Gambar dari  request completed.');
    }
});

router.get('/beautiful', async (req, res) => {
    try {
        const url = req.query.url;
        if (!url) return res.status(400).json({ creator: "ALFIN", result: false, message: "Harap masukkan parameter prompt!" });

        const response = await axios.get(`https://alpis.eu.org/api/maker/beautiful?url=${encodeURIComponent(url)}&apikey=c8370584`, {
            responseType: 'arraybuffer' // Penting: minta respons sebagai arraybuffer
        });

        const imageBuffer = Buffer.from(response.data, 'binary'); // Convert data to Buffer

        // Tetapkan Content-Type berdasarkan jenis gambar (sesuaikan jika perlu)
        res.setHeader('Content-Type', 'image/png'); // Asumsi: gambar adalah JPEG
        // Opsi lain: 'image/png', 'image/gif', dll. Tergantung jenis gambar yang dikembalikan API.

        res.send(imageBuffer); // Kirim data gambar sebagai respons
    } catch (error) {
        console.error(error);
        res.status(500).json({ creator: "ALFIN", result: false, message: "Gagal mendapatkan gambar dari .", error: error.message });
    } finally {
        console.log('Gambar dari  request completed.');
    }
});

router.get('/darkness', async (req, res) => {
    try {
        const url = req.query.url;
        if (!url) return res.status(400).json({ creator: "ALFIN", result: false, message: "Harap masukkan parameter prompt!" });

        const response = await axios.get(`https://alpis.eu.org/api/maker/darkness?url=${encodeURIComponent(url)}&apikey=c8370584`, {
            responseType: 'arraybuffer' // Penting: minta respons sebagai arraybuffer
        });

        const imageBuffer = Buffer.from(response.data, 'binary'); // Convert data to Buffer

        // Tetapkan Content-Type berdasarkan jenis gambar (sesuaikan jika perlu)
        res.setHeader('Content-Type', 'image/png'); // Asumsi: gambar adalah JPEG
        // Opsi lain: 'image/png', 'image/gif', dll. Tergantung jenis gambar yang dikembalikan API.

        res.send(imageBuffer); // Kirim data gambar sebagai respons
    } catch (error) {
        console.error(error);
        res.status(500).json({ creator: "ALFIN", result: false, message: "Gagal mendapatkan gambar dari .", error: error.message });
    } finally {
        console.log('Gambar dari  request completed.');
    }
});
//===stiker===///
		router.get('/stiker/dinokuning', async (req, res, next) => {
		let femdom = (await axios.get('https://raw.githubusercontent.com/Kira-Master/database/main/sticker/dinokuning.json')).data;
	let random = femdom[Math.floor(Math.random() * femdom.length)]
	var result = await getBuffer(random)
	res.set({'Content-Type': 'image/jpeg'})
	res.send(result)
})
router.get('/stiker/patrick', async (req, res) => {
	fetch(encodeURI(`https://raw.githubusercontent.com/Kira-Master/database/main/sticker/patrick.json`))
		.then(response => response.json())
		.then(async data => {
			let hasil = data[Math.floor(Math.random() * data.length)]
			let buffer = hasil;
			data = await fetch(buffer).then(v => v.buffer())
			await fs.writeFileSync(__path + '/tmp/images.jpg', data)
			res.sendFile(__path + '/tmp/images.jpg')
		}).catch(e => {
			console.error(e)
		})
})
router.get('/stiker/amongus', async (req, res) => {
	fetch(encodeURI(`https://raw.githubusercontent.com/Kira-Master/database/main/sticker/among.json`))
		.then(response => response.json())
		.then(async data => {
			let hasil = data[Math.floor(Math.random() * data.length)]
			let buffer = hasil;
			data = await fetch(buffer).then(v => v.buffer())
			await fs.writeFileSync(__path + '/tmp/images.jpg', data)
			res.sendFile(__path + '/tmp/images.jpg')
		}).catch(e => {
			console.error(e)
		})
})
router.get('/stiker/animegif', async (req, res) => {
	fetch(encodeURI(`https://raw.githubusercontent.com/Kira-Master/database/main/sticker/animegif.json`))
		.then(response => response.json())
		.then(async data => {
			let hasil = data[Math.floor(Math.random() * data.length)]
			let buffer = hasil;
			data = await fetch(buffer).then(v => v.buffer())
			await fs.writeFileSync(__path + '/tmp/images.jpg', data)
			res.sendFile(__path + '/tmp/images.jpg')
		}).catch(e => {
			console.error(e)
		})
})
router.get('/stiker/animestick', async (req, res) => {
	fetch(encodeURI(`https://raw.githubusercontent.com/Kira-Master/database/main/sticker/animestick.json`))
		.then(response => response.json())
		.then(async data => {
			let hasil = data[Math.floor(Math.random() * data.length)]
			let buffer = hasil;
			data = await fetch(buffer).then(v => v.buffer())
			await fs.writeFileSync(__path + '/tmp/images.jpg', data)
			res.sendFile(__path + '/tmp/images.jpg')
		}).catch(e => {
			console.error(e)
		})
})
router.get('/stiker/dadu', async (req, res) => {
	fetch(encodeURI(`https://raw.githubusercontent.com/Kira-Master/database/main/sticker/dadu.json`))
		.then(response => response.json())
		.then(async data => {
			let hasil = data[Math.floor(Math.random() * data.length)]
			let buffer = hasil;
			data = await fetch(buffer).then(v => v.buffer())
			await fs.writeFileSync(__path + '/tmp/images.jpg', data)
			res.sendFile(__path + '/tmp/images.jpg')
		}).catch(e => {
			console.error(e)
		})
})
router.get('/stiker/doge', async (req, res) => {
	fetch(encodeURI(`https://raw.githubusercontent.com/Kira-Master/database/main/sticker/doge.json`))
		.then(response => response.json())
		.then(async data => {
			let hasil = data[Math.floor(Math.random() * data.length)]
			let buffer = hasil;
			data = await fetch(buffer).then(v => v.buffer())
			await fs.writeFileSync(__path + '/tmp/images.jpg', data)
			res.sendFile(__path + '/tmp/images.jpg')
		}).catch(e => {
			console.error(e)
		})
})
		router.get('/stiker/kawanspongebob', async (req, res, next) => {
		let femdom = (await axios.get('https://raw.githubusercontent.com/Kira-Master/database/main/sticker/kawanspongebob.json')).data;
	let random = femdom[Math.floor(Math.random() * femdom.length)]
	var result = await getBuffer(random)
	res.set({'Content-Type': 'image/jpeg'})
	res.send(result)
})

router.get('/stiker/mukalu', async (req, res, next) => {
		let femdom = (await axios.get('https://raw.githubusercontent.com/Kira-Master/database/main/sticker/mukalu.json')).data;
	let random = femdom[Math.floor(Math.random() * femdom.length)]
	var result = await getBuffer(random)
	res.set({'Content-Type': 'image/jpeg'})
	res.send(result)
})

router.get('/stiker/paimon', async (req, res, next) => {
		let femdom = (await axios.get('https://raw.githubusercontent.com/Kira-Master/database/main/sticker/paimon.json')).data;
	let random = femdom[Math.floor(Math.random() * femdom.length)]
	var result = await getBuffer(random)
	res.set({'Content-Type': 'image/jpeg'})
	res.send(result)
})


router.get('/stiker/manusialidi', async (req, res, next) => {
		let femdom = (await axios.get('https://raw.githubusercontent.com/Kira-Master/database/main/sticker/manusialidi.json')).data;
	let random = femdom[Math.floor(Math.random() * femdom.length)]
	var result = await getBuffer(random)
	res.set({'Content-Type': 'image/jpeg'})
	res.send(result)
})

		router.get('/stiker/rabbit', async (req, res, next) => {
		let femdom = (await axios.get('https://raw.githubusercontent.com/Kira-Master/database/main/sticker/rabbit.json')).data;
	let random = femdom[Math.floor(Math.random() * femdom.length)]
	var result = await getBuffer(random)
	res.set({'Content-Type': 'image/jpeg'})
	res.send(result)
})
router.get('/stiker/random', async (req, res, next) => {
		let femdom = (await axios.get('https://raw.githubusercontent.com/Kira-Master/database/main/sticker/random.json')).data;
	let random = femdom[Math.floor(Math.random() * femdom.length)]
	var result = await getBuffer(random)
	res.set({'Content-Type': 'image/jpeg'})
	res.send(result)
})
	router.get('/stiker/spongebob', async (req, res, next) => {
		let femdom = (await axios.get('https://raw.githubusercontent.com/Kira-Master/database/main/sticker/spongebob.json')).data;
	let random = femdom[Math.floor(Math.random() * femdom.length)]
	var result = await getBuffer(random)
	res.set({'Content-Type': 'image/jpeg'})
	res.send(result)
})
////===stiker==\\\
router.get('/tebaklagu', async (req, res) => {
    try {
        const { data } = await axios.get('https://raw.githubusercontent.com/NzrlAfndi/Databasee/refs/heads/main/games/tebaklagu.json');
        res.json({ creator: "Alfin", result: true, message: "game - tebaklagu", data: data });
    } catch {
        res.status(500).json({ creator: "@Alfin", result: false, message: "game - tebaklagu bermasalah." });
    } finally {
        console.log('game - tebaklagu request completed.');
    }
});
//====textpro//


// ------ cerpen ------- //
router.get('/akira', async (req, res, next) => {
	let femdom = (await axios.get('https://raw.githubusercontent.com/NzrlAfndi/Databasee/refs/heads/main/anime/akira.json')).data;
	let random = femdom[Math.floor(Math.random() * femdom.length)]
	var result = await getBuffer(random)
	res.set({'Content-Type': 'image/jpeg'})
	res.send(result)
})
router.get('/akiyama', async (req, res, next) => {
	let femdom = (await axios.get('https://raw.githubusercontent.com/NzrlAfndi/Databasee/refs/heads/main/anime/akiyama.json')).data;
	let random = femdom[Math.floor(Math.random() * femdom.length)]
	var result = await getBuffer(random)
	res.set({'Content-Type': 'image/jpeg'})
	res.send(result)
})
router.get('/boruto', async (req, res, next) => {
	let femdom = (await axios.get('https://raw.githubusercontent.com/NzrlAfndi/Databasee/refs/heads/main/anime/boruto.json')).data;
	let random = femdom[Math.floor(Math.random() * femdom.length)]
	var result = await getBuffer(random)
	res.set({'Content-Type': 'image/jpeg'})
	res.send(result)
})
router.get('/itachi', async (req, res, next) => {
	let femdom = (await axios.get('https://raw.githubusercontent.com/NzrlAfndi/Databasee/refs/heads/main/anime/itachi.json')).data;
	let random = femdom[Math.floor(Math.random() * femdom.length)]
	var result = await getBuffer(random)
	res.set({'Content-Type': 'image/jpeg'})
	res.send(result)
})
router.get('/loli', async (req, res, next) => {
	let femdom = (await axios.get('https://raw.githubusercontent.com/NzrlAfndi/Databasee/refs/heads/main/anime/loli.json')).data;
	let random = femdom[Math.floor(Math.random() * femdom.length)]
	var result = await getBuffer(random)
	res.set({'Content-Type': 'image/jpeg'})
	res.send(result)
})

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