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
//===stiker===///
router.get('/random/dinokuning', async (req, res) => {
	fetch(encodeURI(`https://raw.githubusercontent.com/Kira-Master/database/main/sticker/dinokuning.json`))
		.then(response => response.json())
		.then(async data => {
			let hasil = data[Math.floor(Math.random() * data.length)]
			let buffer = hasil;
			data = await fetch(buffer).then(v => v.buffer())
			await fs.writeFileSync(__path + '/tmp/dino.jpg', data)
			res.sendFile(__path + '/tmp/dino.jpg')
		}).catch(e => {
			console.error(e)
		})
})
router.get('/random/patrick', async (req, res) => {
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
router.get('/random/amongus', async (req, res) => {
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
router.get('/random/animegif', async (req, res) => {
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
router.get('/random/animestick', async (req, res) => {
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
router.get('/random/dadu', async (req, res) => {
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
router.get('/random/doge', async (req, res) => {
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
router.get('/random/kawanspongebob', async (req, res) => {
	fetch(encodeURI(`https://raw.githubusercontent.com/Kira-Master/database/main/sticker/kawanspongebob.json`))
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
router.get('/random/manusialidi', async (req, res) => {
	fetch(encodeURI(`https://raw.githubusercontent.com/Kira-Master/database/main/sticker/manusialidi.json`))
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
router.get('/random/mukalu', async (req, res) => {
	fetch(encodeURI(`https://raw.githubusercontent.com/Kira-Master/database/main/sticker/mukalu.json`))
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
router.get('/random/paimon', async (req, res) => {
	fetch(encodeURI(`https://raw.githubusercontent.com/Kira-Master/database/main/sticker/paimon.json`))
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
router.get('/random/patrickgif', async (req, res) => {
	fetch(encodeURI(`https://raw.githubusercontent.com/Kira-Master/database/main/sticker/patrickgif.json`))
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
router.get('/random/rabbit', async (req, res) => {
	fetch(encodeURI(`https://raw.githubusercontent.com/Kira-Master/database/main/sticker/rabbit.json`))
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
router.get('/random/random', async (req, res) => {
	fetch(encodeURI(`https://raw.githubusercontent.com/Kira-Master/database/main/sticker/random.json`))
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
router.get('/random/spongebob', async (req, res) => {
	fetch(encodeURI(`https://raw.githubusercontent.com/Kira-Master/database/main/sticker/spongebob.json`))
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