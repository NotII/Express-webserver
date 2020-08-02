module.exports = {
  //Array of domains being used
  domains: [
    "depressive.club",
    "file.wine",
    "fuck-your.party",
    "furfags.top",
    "hypixel.party",
    "niggers.club",
    "niggers.host",
    "send-nud.es",
  ],

  //Array of api keys
  apikeys: ["0&h5Qx8Zb4$uC0bO"],

  //Array of blacklisted ids
  blacklistedIds: [
    "",
    "index",
    "report",
    "sharex",
    "contact",
    "faq",
    "assets",
    "api",
    "up",
    "up.php",
    "u",
    "u.php",
    "upload",
    "upload.php",
    "",
    "domains",
    "public",
    "i",
  ],

  //Array of blacklisted urls for url shortener
  blacklistedUrls: ["pyr.pw", "smallr.xyz", "lynkr.ml"],

  //Array of blacklisted file extensions
  blacklistedExtensions: ["exe", "bat"],

  id: {
    length: 6, //Default length of ids
    minLength: 3, //Minimum length of ids
    maxLength: 16, //Maximum length of ids
  },

  //Default charset
  charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",

  //Cache keyPrefix - unused
  //exports.cacheKeyPrefix = "pyr.",

  //API Responses
  responses: {
    messages: {
      unknown_error:
        "An unknown error occured, please contact us at https://pyr.pw/contact if this repeatedly occurs.",
      bad_request:
        "Bad Request, please modify your request based on documentation found at ",
      created_successfully: "Successfully created shortened url.",
      id_exists: "The specified id already exists, please try another one.",
      already_shortened:
        "The url provided already belongs to pyr.pw or one of it's proxies.",
      no_apikey: "No valid api key provided.",
    },
    errors: {
      unknown_error: "Unknow error occured.",
      no_url: "Request does not contain a URL.",
      no_url_or_id: "Request does not contain a URL or Custom Id.",
      invaild_url: "Request contains an invalid URL.",
      invaild_id: "Request contains an invalid Custom Id.",
      id_exists: "Id already exists.",
      already_shortened: "Url belongs to pyr.pw or one of it's proxies.",
      no_apikey: "Unauthorized.",
    },
  },
};
