TEDxPerth.require('Authentication', function() {
  return TEDxPerth.withNS('RPXNow', function(ns) {
    var conditionallySet;
    ns.rpxnowLinkSelector = '.rpxnow';
    ns.dataPrefix = 'rpxnow-';
    ns.baseConfiguration = {
      overlay: true,
      language_preference: 'en'
    };
    conditionallySet = function(element, key, callback) {
      key = ("" + ns.dataPrefix + key);
      if (ns.hasData(element, key)) {
        return callback(ns.data(element, key));
      }
    };
    ns.configuration = function() {
      var configuration, element;
      configuration = $.extend({}, ns.baseConfiguration);
      element = $(ns.rpxnowLinkSelector);
      conditionallySet(element, "token-url", function(v) {
        configuration.token_url = v;
        return configuration.token_url;
      });
      conditionallySet(element, "realm", function(v) {
        configuration.realm = v;
        return configuration.realm;
      });
      conditionallySet(element, "flags", function(v) {
        configuration.flags = v;
        return configuration.flags;
      });
      return configuration;
    };
    ns.configureRPXNow = function() {
      if (typeof RPXNOW !== "undefined" && RPXNOW !== null) {
        return $.extend(RPXNOW, ns.configuration());
      }
    };
    ns.setup = function() {
      return ns.configureRPXNow();
    };
    return ns.setup;
  });
});