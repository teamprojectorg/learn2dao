const t = require("twitter-api-v2");
const sentiment = require("wink-sentiment");
require('dotenv').config()

// TODO: Pass the keyword in fron the frontend 
const keyword = "apecoin";

(async function x() {
  const client = new t.TwitterApi(process.env.BEARER_TOKEN);
  // There is a limit to the number of tweets we can retrieve, its 100.
  const tweets = await client.v2.get("tweets/search/recent?query=" + keyword + "&max_results=100");
  let total = 0;
  tweets["data"].forEach(t => {
    const s = sentiment(t["text"]);
    total = total + s["score"];
  });
  // TODO: Return an json object that can be stored in IPFS instead of logging the total score
  // Note: The score is out of 100. Higher it is, the more positive the sentiment is.
  console.log(total);
})();
