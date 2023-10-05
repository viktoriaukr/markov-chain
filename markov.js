/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chain = new Map();
    for (let i = 0; i < this.words.length; i += 1) {
      let currentWord = this.words[i];
      let nextWord = this.words[i + 1] || null;
      if (chain.has(currentWord)) {
        chain.get(currentWord).push(nextWord);
      } else {
        chain.set(currentWord, [nextWord]);
      }
      this.chain = chain;
    }
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    const words = Array.from(this.chain.keys());
    const word = words[Math.floor(Math.random() * words.length)];
    let currentWord = word;
    let random = [];

    while (random.length < numWords && currentWord !== null) {
      random.push(currentWord);
      let key = this.chain.get(currentWord);
      if (key && key.length > 0) {
        currentWord = key[Math.floor(Math.random() * key.length)];
      } else {
        currentWord = null;
      }
    }
    return random.join(":");
  }
}

module.exports = {
  MarkovMachine,
};
