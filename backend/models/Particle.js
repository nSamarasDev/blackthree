const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require('slugify');

const ParticleSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  particleName: {
    type: String,
    required: true,
  },
  position: {
    type: Array,
    items: {
      type: Number,
    },
  },
  momentum: {
    type: Array,
    items: {
      type: Number,
    },
  },
  spin: {
    type: Number,
  },
  slug: String,
  
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create bootcamp slug from the name
ParticleSchema.pre('save', function (next) {
  this.slug = slugify(this.particleName, { lower: true });
  next();
});

module.exports = mongoose.model("particle", ParticleSchema);