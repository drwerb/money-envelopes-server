var express = require('express');
var Envelope = require('../models/envelope');
var router = express.Router();

router.get('/', function(req, res, next) {
  req.app.locals.context.envelopes.getList()
    .then((list) => res.json(list))
    .catch(() => res.status(500).send("Can't get envelopes list"));
});

router.get('/:id', function(req, res, next) {
  req.app.locals.context.envelopes.get(req.params.id)
    .then((envelope) => {
      if (envelope) {
        res.json(envelope)
      } else {
        res.status(404).end();
      }
    })
    .catch(() => res.status(500).send("Can't get envelope"));
});

router.put('/', function(req, res, next) {
  var envelopeUpdated = new Envelope(req.body),
    context = req.app.locals.context;

  context.envelopes.get(envelopeUpdated.id)
  .then(
    (envelope) => {
      if (!envelope) {
        return null;
      }
      return context.envelopes.update(envelopeUpdated);
    },
    () => res.status(500).send("Can't get envelope")
  ).then(
    (envelope) => {
      if (!envelope) {
        res.status(404).end();
      } else {
        res.json(envelope);
      }
    },
    () => res.status(500).send("Can't update envelope")
  );
});

router.post('/', function(req, res, next) {
  var envelopeNew = new Envelope(req.body),
    context = req.app.locals.context;

  envelopeNew.id = null;

  req.app.locals.context.envelopes.create(envelopeNew)
    .then((envelope) => {
      res.json(envelope)
    })
    .catch(() => res.status(500).send("Can't create envelope"));
});

module.exports = router;
