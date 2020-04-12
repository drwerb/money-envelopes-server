var express = require('express');
var router = express.Router();

router.get('/:envelope_id', function(req, res, next) {
  req.app.locals.context.envelopeHistory.getEnvelopeHistory(req.params.envelope_id)
    .then((envelopeHistoryEntries) => {
      if (envelopeHistoryEntries) {
        res.json(envelopeHistoryEntries)
      } else {
        res.status(404).end();
      }
    })
    .catch(() => res.status(500).send("Can't get envelope history entries"));
});

module.exports = router;