# Unwelcome Bot
###### Please use responsibly

Unwelcome Bot will monitor twitter and interject in conversations. It knows how to track words and phrases, it can watch for geolocated tweets, and it has several options for filtering tweets based on things they do or do not contain.

Unwelcome Bot can be a source of great humor or tireless advocate for social justice. However, Unwelcome Bot has no sense of context and can very easily cross the line between good-natured pestering and harassment. Twitter is a place where we collectively discuss very serious issues, sometimes of life and death. Make sure you're punching up, not down.

## How to run

1. `git clone https://github.com/buzzfeed-openlab/unwelcome-bot.git`
2. `cd ./unwelcome-bot; npm install`
3. Create a `twitterCreds.json` file containing:

  ```json
  {
      "consumer_key": "XXXXX",
      "consumer_secret": "XXXXXX",
      "access_token": "XXX-XXXXXXX",
      "access_token_secret": "XXXXX"
  }
```
4. `node unwelcome-bot.js [/path/to/config.json] [/path/to/twitter/creds.json]`

## Config options

#### "track"
An array of strings that will be used to subscribe to a twitter stream.

#### "location"
An array of latitude and longitude positions that will be used to subscribe to a twitter stream. Note that this is an additive filter, so if you want the intersection of tweets in a location and containing certain words, you have to use "location" and "requiredWords", not "track".

#### "filterWords"
An array of strings used to filter incoming tweets (if a tweet contains any of the `filterWords`, it will be ignored).

#### "requiredWords"
An array of strings used to filter incoming tweets (if a tweet does not contain a `requiredWord`, it will be ignored).

#### "responses"
An array of strings used to tweet responses.

#### "rateLimit"
A minimum number of seconds to wait between tweets.

#### "reallyActuallyTweet"
Are you sure? The bot will run but wont actually tweet until `reallyActuallyTweet` is set to `true`.
