var Envelope = require('../models/envelope');

var EnvelopeService = function(config) {
  this.context = config.context;
};

EnvelopeService.prototype.getList = function() {
  return new Promise((resolve) => {
    var db = this.context.db,
      result = [];

    db.serialize(function() {
      db.each("SELECT id, name FROM envelopes", function(err, row) {
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
      db.get("SELECT id, name FROM envelopes WHERE id = ?", [ +id ], function(err, row) {
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
      db.run("UPDATE envelopes SET name = $name WHERE id = $id", { $id: +envelope.id, $name: envelope.name }, function(err, row) {
        if (err) {
          console.log("Error (EnvelopeService.update) --------\nParameter: " + JSON.encode(envelope) + "\n" + err + "\n-------");
          error();
        }

        resolve(envelope);
      });
    });
  });
};

EnvelopeService.prototype.create = function(envelope) {
  return new Promise((resolve, error) => {
    var db = this.context.db,
      result = [];

    db.serialize(function() {
      db.run("INSERT INTO envelopes (name) VALUES ($name)", { $name: envelope.name }, function(err) {
        if (err) {
          console.log("Error (EnvelopeService.create) --------\nParameter: " + JSON.encode(envelope) + "\n" + err + "\n-------");
          error();
        } else {
          envelope.id = this.lastID;
          resolve(envelope);
        }
      });
    });
  });
};

module.exports = EnvelopeService;
