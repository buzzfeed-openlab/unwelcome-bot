
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
        for (var i = 0; i < filterWords.length; ++i) {
            if (text.indexOf(filterWords[i]) != -1) {
                console.log('filtered > ', filterWords[i]);
                return;
            }
        }

        // if there are required words, filter tweets without them
        if (requiredWords && requiredWords.length) {
            var foundMatch = false;

            for (var i = 0; i < requiredWords.length; ++i) {
                if (text.indexOf(requiredWords[i]) != -1) {
                    foundMatch = true;
                    break;
                }
            }

            if (!foundMatch) {
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
