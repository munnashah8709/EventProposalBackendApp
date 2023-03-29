const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Vendor schema
const vendorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contact: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  }
});

 mongoose.model('Vendor', vendorSchema);

