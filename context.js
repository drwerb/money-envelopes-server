var sqlite3 = require('sqlite3').verbose();
var EnvelopeService = require('./services/envelope-service')
var EnvelopeHistoryService = require('./services/envelope-history-service')

var Context = function (config) {
  this.dbPath = config.dbPath;
  this.db = null;
};

Context.prototype.initialize = function() {
  this.db = new sqlite3.Database(this.dbPath);
  this.envelopes = new EnvelopeService({ context: this });
  this.envelopeHistory = new EnvelopeHistoryService({ context: this });
};

// db.serialize(function() {
//   db.run("CREATE TABLE lorem (info TEXT)");
 
//   var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//   for (var i = 0; i < 10; i++) {
//       stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();

//   db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
//       console.log(row.id + ": " + row.info);
//   });
// });

// db.close();

module.exports = Context;