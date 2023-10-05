/** Command-line tool to generate Markov text. */
const { MarkovMachine } = require("./markov");
const fs = require("fs");
const axios = require("axios");

function generate(text) {
  let chain = new MarkovMachine(text);
  console.log(chain.makeText());
}

function readFile(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log("Error occurred:", err);
      process.exit(1);
    }
    generate(data);
  });
}

async function url(url) {
  let res;
  try {
    res = await axios.get(url);
  } catch (err) {
    console.log("Error occurred:", err);
    process.exit(1);
  }
  generate(res.data);
}
let path = process.argv[3];

if (process.argv.slice(2) === "file") {
  readFile(path);
} else {
  url(path);
}
