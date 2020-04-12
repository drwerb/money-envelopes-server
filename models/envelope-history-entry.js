var Envelope = require('./envelope');

var EnvelopeHistoryEntry = function(config) {
    Envelope.call(this, config);

    this.envelope_id = config.envelope_id;
    this.timestamp = config.timestamp;
};

module.exports = EnvelopeHistoryEntry;