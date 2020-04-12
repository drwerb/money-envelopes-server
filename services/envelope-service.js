var Envelope = require('../models/envelope');

var EnvelopeService = function(config) {
  this.context = config.context;
};

EnvelopeService.prototype.getList = function() {
  return new Promise((resolve) => {
    var db = this.context.db,
      result = [];

    db.serialize(function() {
      db.each("SELECT id, name, balance_uah, balance_usd, balance_eur FROM envelopes", function(err, row) {
        result.push(new Envelope(row));
      }, function() {
        resolve(result);
      });
    });
  });
};

EnvelopeService.prototype.get = function(id) {
  return new Promise((resolve, error) => {
    var db = this.context.db,
      result = [];

    db.serialize(function() {
      db.get("SELECT id, name, balance_uah, balance_usd, balance_eur FROM envelopes WHERE id = ?", [ +id ], function(err, row) {
        if (err) {
          console.log("Error (EnvelopeService.get) --------\nParameter: " + id + "\n" + err + "\n-------");
          error();
        }

        resolve(row !== undefined ? new Envelope(row) : null);
      });
    });
  });
};

EnvelopeService.prototype.update = function(envelope) {
  return new Promise((resolve, error) => {
    var db = this.context.db,
      result = [];

    db.serialize(function() {
      db.run(`
        UPDATE envelopes
        SET name = $name,
            balance_uah = $balance_uah,
            balance_usd = $balance_usd,
            balance_eur = $balance_eur
        WHERE id = $id`,
        {
          $id: +envelope.id,
          $name: envelope.name,
          $balance_uah: +envelope.balance_uah,
          $balance_usd: +envelope.balance_usd,
          $balance_eur: +envelope.balance_eur
        },
        function(err, row) {
          if (err) {
            console.log("Error (EnvelopeService.update) --------\nParameter: " + JSON.stringify(envelope) + "\n" + err + "\n-------");
            error();
          }

          resolve(envelope);
      });
    });
  });
};

EnvelopeService.prototype.create = function(envelope) {
  var me = this;
  return new Promise((resolve, error) => {
    var db = me.context.db;

    db.serialize(function() {
      db.run(`
        INSERT INTO envelopes (name)
        VALUES ($name)`,
        {
          $name: envelope.name
        },
        function(err) {
          if (err) {
            console.log("Error (EnvelopeService.create) --------\nParameter: " + JSON.stringify(envelope) + "\n" + err + "\n-------");
            error();
          } else {
            envelope.id = this.lastID;

            resolve(envelope);
          }
      });
    });
  })
  .then(function() {
    return me.context.envelopeHistory.createHistoryEntry(envelope);
  })
  .then(function() {
    return envelope;
  });
};

module.exports = EnvelopeService;
