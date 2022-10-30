const express = require('express')
const redis = require('redis')
const axios = require("axios")

const router = express.Router();
const client = redis.createClient(6379)

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();



// functions

async function fetchPhotos() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/photos')
    return response.data;
}

async function getStorePhotos(req, res) {
    const photosRedisKey = 'user:photos';
    let photos
    let isCached = false;

    try {
        const cacheResults = await redisClient.get(photosRedisKey);
        if (cacheResults) {
            isCached = true;
            photos = JSON.parse(cacheResults);
          } else {
            photos = await fetchPhotos()
            await redisClient.set(photosRedisKey, JSON.stringify(photos));
        }
        // // Save the  API response in Redis store,  data expire time in 3600 seconds, it means one hour
        // client.setex(photosRedisKey, 3600, JSON.stringify(photos))        
        // Send JSON response to client
        res.send({ fromCache: isCached, data: photos })
    } catch (error) {
        // log error message
        console.log(error)
        // send error to the client 
        return res.json(error.toString())
    }
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send("Hello Cache")
});

router.get('/photos', getStorePhotos);

module.exports = router;
