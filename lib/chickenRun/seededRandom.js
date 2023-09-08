/**
 * Generated mostly by GPT4, not sure about the mathematical details
 */
function SeededRandom(seed) {
    this._seed = seed % 2147483647;
    if (this._seed <= 0) this._seed += 2147483646;
}

SeededRandom.prototype.next = function () {
    return this._seed = this._seed * 16807 % 2147483647;
};

SeededRandom.prototype.random = function () {
    return (this.next() - 1) / 2147483646;
};

// Usage:
//const random = new SeededRandom(12345); // seed with 12345
//console.log(random.random()); // Generates a pseudorandom number based on the seed
