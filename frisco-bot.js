
var Twit = require('twit');

var FriscoBot = module.exports = function(config) {
    var filterWords = config.filterWords,
        requiredWords = config.requiredWords;

    // normalize all the filtered and required words
    filterWords = filterWords.map(this.normalizeText);
    requiredWords = requiredWords.map(this.normalizeText);

    // set up twitter stream
    var twit = new Twit(config.twitterCredentials),
        stream = twit.stream('statuses/filter', { track: config.track });

    stream.on('tweet', function(tweet) {
        var text = this.normalizeText(tweet.text);

        // filter out tweets that could be sensitive
        var filteredWord = this.containsAnyOf(filterWords, text);
        if (filteredWord) {
            console.log('filtered > ', filteredWord);
            return;
        }

        // if there are required words, filter tweets without them
        if (requiredWords && requiredWords.length) {
            if (!this.containsAnyOf(requiredWords, text)) {
                console.log('required > ', tweet.text);
                return;
            }
        }

        console.log('-------');
        console.log('user:', tweet.user.screen_name);
        console.log('tweet:', tweet.text);
        console.log('-------');

    }.bind(this));

    stream.on('error', function(err) {
        console.log('Error:\n', err);
    });
};

FriscoBot.prototype.normalizeText = function(text) {
    return text.toLowerCase();
};

FriscoBot.prototype.containsAnyOf = function(needles, haystack) {
    for (var i = 0; i < needles.length; ++i) {
        if (haystack.indexOf(needles[i]) != -1) {
            return needles[i];
        }
    }
    return undefined;
};
