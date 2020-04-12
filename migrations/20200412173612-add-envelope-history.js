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
  return db.createTable('envelope_history', {
    id: { type: 'int', unsigned: true, primaryKey: true, autoIncrement: true },
    envelope_id: {
      type: 'int',
      unsigned: true,
      foreignKey: {
        name: 'envelopes_envelope_history_in_fk',
        table: 'envelopes',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: {
          envelope_id: 'id'
        }
      }
    },
    name: 'string',
    balance_uah: { type: 'decimal', length: 8, notNull: true, defaultValue: 0 },
    balance_usd: { type: 'decimal', length: 8, notNull: true, defaultValue: 0 },
    balance_eur: { type: 'decimal', length: 8, notNull: true, defaultValue: 0 },
    timestamp: { type: 'datetime', notNull: true }
  });
};

exports.down = function(db) {
  return db.dropTable('envelope_history');
};

exports._meta = {
  "version": 1
};
