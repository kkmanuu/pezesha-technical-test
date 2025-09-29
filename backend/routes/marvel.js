// routes/marvel.js
const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const NodeCache = require('node-cache');
const Character = require('../models/character');
const router = express.Router();

// In-memory cache with 10 minutes TTL
const cache = new NodeCache({ stdTTL: 600 });

// Generate Marvel API hash
const getMarvelHash = (ts, privateKey, publicKey) => {
  return crypto.createHash('md5').update(ts + privateKey + publicKey).digest('hex');
};

router.get('/characters', async (req, res) => {
  try {
    const cacheKey = 'marvel_characters';
    
    // Step 1: Check in-memory cache first (fastest)
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      console.log('Serving from memory cache');
      return res.json(cachedData);
    }

    // Step 2: Check MongoDB (second fastest)
    const dbCharacters = await Character.find().limit(20);
    if (dbCharacters && dbCharacters.length > 0) {
      console.log('Serving from database');
      // Store in memory cache for next request
      cache.set(cacheKey, dbCharacters);
      return res.json(dbCharacters);
    }

    // Step 3: Fetch from Marvel API (slowest, only if no cached data)
    console.log('Fetching from Marvel API');
    const ts = Date.now().toString();
    const publicKey = process.env.MARVEL_PUBLIC_KEY;
    const privateKey = process.env.MARVEL_PRIVATE_KEY;
    const hash = getMarvelHash(ts, privateKey, publicKey);

    const response = await axios.get('https://gateway.marvel.com/v1/public/characters', {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit: 20,
      },
      timeout: 10000,
    });

    const characters = response.data.data.results;

    // Step 4: Store in MongoDB for future requests
    // Use bulkWrite for efficiency - updates if exists, inserts if new
    const bulkOps = characters.map((char) => ({
      updateOne: {
        filter: { id: char.id },
        update: { $set: char },
        upsert: true 
      }
    }));

    await Character.bulkWrite(bulkOps);
    console.log('Saved to database');

    // Step 5: Store in memory cache
    cache.set(cacheKey, characters);

    res.json(characters);

  } catch (error) {
    console.error('Marvel API error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    res.status(500).json({ message: 'Error fetching Marvel characters' });
  }
});

// Optional: Endpoint to refresh data from Marvel API
router.post('/characters/refresh', async (req, res) => {
  try {
    // Clear caches
    cache.flushAll();
    await Character.deleteMany({});

    // Force fetch from Marvel API
    const ts = Date.now().toString();
    const publicKey = process.env.MARVEL_PUBLIC_KEY;
    const privateKey = process.env.MARVEL_PRIVATE_KEY;
    const hash = getMarvelHash(ts, privateKey, publicKey);

    const response = await axios.get('https://gateway.marvel.com/v1/public/characters', {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit: 20,
      },
      timeout: 10000,
    });

    const characters = response.data.data.results;

    // Save to database
    await Character.insertMany(characters);

    res.json({ 
      message: 'Characters refreshed successfully', 
      count: characters.length 
    });

  } catch (error) {
    console.error('Refresh error:', error.message);
    res.status(500).json({ message: 'Error refreshing characters' });
  }
});

module.exports = router;