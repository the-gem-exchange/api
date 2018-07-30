const mongoose   = require('mongoose');

const { Schema } = mongoose;

const EventSchema = new Schema({
  description: {
    type: String,
    required: 'Event description required.',
  },
  triggeredBy: {
    type: String,
    required: 'A user ID is required for this field.',
  },
  date: {
    type: Date,
    default: Date.now,
  },

  // OPTIONAL: The state of the subject before modification
  // if this is an action we want to revert, we can refer the changes here
  before: {},

  // Any aditional data worth logging
  result: {},
});

module.exports = mongoose.model('Event', EventSchema);
