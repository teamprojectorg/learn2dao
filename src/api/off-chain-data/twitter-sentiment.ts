import * as t from "twitter-api-v2";
import sentiment from "wink-sentiment";
// require("dotenv").config();

// TODO: Pass the keyword in fron the frontend
// const keyword = "apecoin";

export async function getTwitterSentitment(keyword: string) {
  try {
    const client = new t.TwitterApi(import.meta.env.BEARER_TOKEN!);
    // There is a limit to the number of tweets we can retrieve, its 100.
    const tweets = await client.v2.get(
      "tweets/search/recent?query=" + keyword + "&max_results=100"
    );
    let total = 0;
    tweets["data"].forEach((t: any) => {
      const s = sentiment(t["text"]);
      total = total + s["score"];
    });
    // TODO: Return an json object that can be stored in IPFS instead of logging the total score
    // Note: The score is out of 100. Higher it is, the more positive the sentiment is.
    console.log("twitter", total);
    return total;
  } catch (e) {
    console.log("Err", e);
    throw e;
  }
}
