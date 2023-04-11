const mongoose = require("mongoose");
const slugify = require("slugify");
const crypto = require("crypto");
const secretKey = process.env.SECRET_KEY;
const { v4: uuidv4 } = require("uuid");
// require("dotenv").config();

function encrypt(text) {
  const iv = crypto.randomBytes(16); // generate a random IV
  const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

function formatUuidv4() {
  // Generate a UUIDv4 string and remove the dashes
  const uuidWithoutDashes = uuidv4().replace(/-/g, "");

  // Encrypt "666" before the last four digits of the UUIDv4 string
  const encrypted666 = encrypt("666");
  console.log("encrypted666:", encrypted666);
  const encodedUuid =
    uuidWithoutDashes.slice(0, -4) + encrypted666 + uuidWithoutDashes.slice(-4);

  return encodedUuid;
}

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: [500, "Description cannot be longer than 500 characters"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  identifiers: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
    alt_id: {
      type: String,
      default: () => uuidv4().replace(/-/g, ""),
    },
    resource_id: {
      type: String,
      required: false,
    },
  },
});

// Create resource_id from alt_id
ContactSchema.pre("save", function (next) {
  console.log("alt_id before:", this.identifiers.alt_id);

  const encrypted666 = encrypt("666"); // Encrypt the "666" string
  this.identifiers.resource_id =
    this.identifiers.alt_id.slice(0, -4) +
    encrypted666 + // Use the encrypted "666" string instead of "666"
    this.identifiers.alt_id.slice(-4);

  console.log("alt_id after:", this.identifiers.alt_id);
  console.log("resource_id:", this.identifiers.resource_id);

  next();
});

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
