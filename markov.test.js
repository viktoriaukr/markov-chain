const { MarkovMachine } = require("./markov");

describe("Testing MarkovMachine class", function () {
  let machine;
  let text;
  beforeEach(() => {
    machine = new MarkovMachine("the cat in the hat");
    text = machine.makeText(10);
  });
  test("generating random text", () => {
    expect(text).toEqual(expect.any(String));
    expect(text).not.toEqual(expect.any(Number));
  });

  test("number of words", () => {
    let words = text.split(" ");
    expect(words.length).toBeLessThanOrEqual(10);
    expect(words.length).not.toBeGreaterThan(10);
  });

  test("testing makeChains function", () => {
    let obj = Object.fromEntries(machine.chain);
    expect(obj).toEqual({
      the: ["cat", "hat"],
      cat: ["in"],
      in: ["the"],
      hat: [null],
    });
  });
});
