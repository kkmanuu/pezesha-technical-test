import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cache expiration time (1 hour in milliseconds)
  const CACHE_DURATION = 60 * 60 * 1000;

  useEffect(() => {
    loadCharacters();
  }, []);

  // Function to load characters with caching logic
  const loadCharacters = () => {
    // Check if we have cached data
    const cachedData = localStorage.getItem('marvel_characters');
    const cacheTimestamp = localStorage.getItem('marvel_cache_time');

    // If cache exists and is still valid, use it
    if (cachedData && cacheTimestamp) {
      const cacheAge = Date.now() - parseInt(cacheTimestamp);
      
      if (cacheAge < CACHE_DURATION) {
        // Cache is still valid, use cached data
        setCharacters(JSON.parse(cachedData));
        setLoading(false);
        return;
      }
    }

    // If no valid cache, fetch fresh data from API
    fetchCharacters();
  };

  // Function to fetch characters from the API
  const fetchCharacters = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/marvel/characters');
      
      // Store the fetched data
      setCharacters(response.data);
      
      // Cache the data in localStorage for future use
      localStorage.setItem('marvel_characters', JSON.stringify(response.data));
      localStorage.setItem('marvel_cache_time', Date.now().toString());
      
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch characters');
      setLoading(false);
    }
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Show error message if API call fails
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  // Render the character grid
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Marvel Characters</h2>
      
      {/* Responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop */}
      <div className="row g-4">
        {characters.map((char) => (
          <div key={char.id} className="col-12 col-md-6 col-lg-4">
            <div className="card character-card h-100">
              {/* Character thumbnail image */}
              <img
                src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
                alt={char.name}
                className="card-img-top"
              />
              <div className="card-body">
                {/* Character name */}
                <h5 className="card-title">{char.name}</h5>
                {/* Character description with fallback text */}
                <p className="card-text">
                  {char.description || 'No description available'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;