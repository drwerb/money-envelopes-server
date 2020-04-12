var Envelope = function(config) {
    this.id = config.id;
    this.name = config.name;
    this.balance_uah = config.balance_uah !== undefined ? config.balance_uah : 0;
    this.balance_usd = config.balance_usd !== undefined ? config.balance_usd : 0;
    this.balance_eur = config.balance_eur !== undefined ? config.balance_eur : 0;
};

module.exports = Envelope;