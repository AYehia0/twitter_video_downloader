const config = require('./config')
const fetch = require('node-fetch')

// getting the token
const token = config.keys.b_token

// extract the last of / which is the id in the url
const getTweetId = (tweetUrl) => {

    const tweetParts = tweetUrl.split('/')

    return tweetParts[tweetParts.length - 1]
}

// convert to mins : credits stackoverFlow
const millisToMinutes = (millis) =>  {

  const minutes = Math.floor(millis / 60000);

  const seconds = ((millis % 60000) / 1000).toFixed(0);

  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

const getDownloadUrl = (data) => {

    // getting all the variants
    const media = data.extended_entities.media[0]

    // important data
    const mediaThmp = media.media_url
    const vidDurationMill = media.video_info.duration_millis 
    const vidDurationMins = millisToMinutes(vidDurationMill)

    const videoVars = media.video_info.variants

    const bestQuality = videoVars.reduce((maxBit, vid) => maxBit.bitrate > vid.bitrate ? maxBit : vid)

    return {
        video_img: mediaThmp,
        download_url: bestQuality.url,
        duration: vidDurationMins
    }
}

const getTweetInfo = async (url, cb) => {
    
    const id = getTweetId(url)
    
    const apiUrl = `https://api.twitter.com/1.1/statuses/show.json?id=${id}&include_entities=true`

    const res = await fetch(apiUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    const data = await res.json()

    const tweetData = getDownloadUrl(data)
    
    // callback
    cb(tweetData)

}

// exporting
module.exports = {
    getTweetInfo
}

