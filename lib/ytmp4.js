const axios = require("axios");

const YoutubeVideo = (url, resolution = "480" ) => {
    return new Promise(async (resolve, reject) => {
        try {
        let resolusi = resolution.replace("p", "")
        const { data } = await axios.get(`https://ab.cococococ.com/ajax/download.php?copyright=0&format=${resolusi}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`)
        // repeat if not finished
        let progress
        do {
            // delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // fetch
            progress = await axios.get(`https://p.oceansaver.in/ajax/progress.php?id=${data.id}`);
        } while (progress.data.success != 1);
        if (progress.data.download_url == null) return resolve({status: false, message: "Invalid url youtube."})
            resolve({
                status: true,
                result: {
                    resolution: resolusi + "p",
                    title: data.title,
                    thumbnail: data.info.image,
                    downloadURL: progress.data.download_url
                }
            })
        } catch (err) {
            resolve({status: false, message: "Invalid url youtube."})
            console.log(err)
        }
    })
}

module.exports = YoutubeVideo
