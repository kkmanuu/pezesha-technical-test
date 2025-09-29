// models/character.js
const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  id: { 
    type: Number, 
    required: true, 
    unique: true
  },
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    default: '' 
  },
  thumbnail: {
    path: { type: String, required: true },
    extension: { type: String, required: true }
  },
  resourceURI: { 
    type: String 
  },
  comics: {
    available: { type: Number, default: 0 }
  },
  series: {
    available: { type: Number, default: 0 }
  },
  stories: {
    available: { type: Number, default: 0 }
  },
  events: {
    available: { type: Number, default: 0 }
  },
  urls: [
    {
      type: { type: String },
      url: { type: String }
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Character', characterSchema);