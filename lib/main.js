var {Cc, Ci} = require("chrome");
var httpRequestObserver =
{
  observe: function(subject, topic, data)
  {
    if (topic == "http-on-modify-request") {
      var httpChannel = subject.QueryInterface(Ci.nsIHttpChannel);
      if (/mrm.channel4.com/.test(httpChannel.originalURI.host)) {
        if (httpChannel.requestMethod == "POST") {
          httpChannel.redirectTo({aNewURI: "data:text/xml,%3CadResponse%20%2F%3E"});
        }
      }
    }
  },

  get observerService() {
    return Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
  },

  register: function()
  {
    this.observerService.addObserver(this, "http-on-modify-request", false);
  },

  unregister: function()
  {
    this.observerService.removeObserver(this, "http-on-modify-request");
  }
};

httpRequestObserver.register();
