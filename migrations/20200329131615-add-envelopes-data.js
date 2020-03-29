'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.runSql('insert into envelopes (id, name) values (1, \'Неделя 1\')')
      .then(function() {
          return db.runSql('insert into envelopes (id, name) values (2, \'Неделя 2\')');
      })
      .then(function() {
          return db.runSql('insert into envelopes (id, name) values (3, \'Неделя 3\')');
      })
      .then(function() {
          return db.runSql('insert into envelopes (id, name) values (4, \'Неделя 4\')');
      });
};

exports.down = function(db) {
  return db.runSql('delete from envelopes');
};

exports._meta = {
  "version": 1
};
