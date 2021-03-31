const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('mongodb');

const cubeSchema = new Schema({
  name: String,
  imageUrl: String,
  description: String,  
  difficulty: Number,
  accessories: [{type: Schema.Types.ObjectId, ref: 'Accessory'}]
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;