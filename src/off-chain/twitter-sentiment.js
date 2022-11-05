const t = require("twitter-api-v2");
const sentiment = require("wink-sentiment");
require('dotenv').config()

// Hardcoded keyword for ApeCoin DAO
const keyword = "apecoin";

(async function x() {
  const client = new t.TwitterApi(process.env.BEARER_TOKEN);
  const tweets = await client.v2.get("tweets/search/recent?query=" + keyword + "&max_results=100");
  let total = 0;
  tweets["data"].forEach(t => {
    const s = sentiment(t["text"]);
    total = total + s["score"];
  });
  console.log(total);
});
