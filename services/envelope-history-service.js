var EnvelopeHistoryEntry = require('../models/envelope-history-entry');
var moment = require('moment');

var EnvelopeHistoryService = function(config) {
  this.context = config.context;
};

EnvelopeHistoryService.prototype.getEnvelopeHistory = function(envelopeId) {
  return new Promise((resolve, error) => {
    var db = this.context.db,
      result = [];


  db.serialize(function() {
    db.each(`
      SELECT id, envelope_id, name, balance_uah, balance_usd, balance_eur, timestamp
      FROM envelope_history
      WHERE envelope_id = $envelope_id`,
      { $envelope_id: envelopeId },
      function(err, row) {
        if (err) {
          console.log("Error (EnvelopeHistoryService.getEnvelopeHistory) --------\nParameter: " + envelopeId + "\n" + err + "\n-------");
          error();
        } else {
          result.push(new EnvelopeHistoryEntry(row));
        }
      }, function() {
        resolve(result);
      });
    });
  });
};

EnvelopeHistoryService.prototype.createHistoryEntry = function(envelope) {
  return new Promise((resolve, error) => {
    var db = this.context.db,
      result = [],
      historyEntryData = {
        $envelope_id: envelope.id,
        $name: envelope.name,
        $balance_uah: envelope.balance_uah,
        $balance_usd: envelope.balance_usd,
        $balance_eur: envelope.balance_eur,
        $timestamp: moment.utc().format()
      };

    db.serialize(function() {
      db.run(`
        INSERT INTO envelope_history (envelope_id, name, balance_uah, balance_usd, balance_eur, timestamp)
        VALUES ($envelope_id, $name, $balance_uah, $balance_usd, $balance_eur, $timestamp)`,
        historyEntryData,
        function(err) {
          var newEntry;

          if (err) {
            console.log("Error (EnvelopeHistoryService.createHistoryEntry) --------\nParameter: " + JSON.stringify(envelope) + "\n" + err + "\n-------");
            error();
          } else {
            newEntry = new EnvelopeHistoryEntry(envelope);
            newEntry.id = this.lastID;
            newEntry.envelope_id = envelope.id;
            resolve(newEntry);
          }
      });
    });
  });
};

module.exports = EnvelopeHistoryService;
