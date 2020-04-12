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
  return db.addColumn(
    'envelopes',
    'balance_uah',
    { type: 'decimal', length: 8, notNull: true, defaultValue: 0 }
  ).then(() => db.addColumn(
    'envelopes',
    'balance_usd',
    { type: 'decimal', length: 8, notNull: true, defaultValue: 0 }
  )).then(() => db.addColumn(
    'envelopes',
    'balance_eur',
    { type: 'decimal', length: 8, notNull: true, defaultValue: 0 }
  ));
};

exports.down = function(db) {
  return db.removeColumn(
    'envelopes',
    'balance_uah'
  ).then(() => db.removeColumn(
    'envelopes',
    'balance_usd'
  )).then(() => db.removeColumn(
    'envelopes',
    'balance_eur'
  ));
};

exports._meta = {
  "version": 1
};
