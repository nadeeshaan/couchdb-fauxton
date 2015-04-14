define([
  "app",
  "api"
],

function (app, FauxtonAPI) {
  var Resources = {};

  Resources.Hello = FauxtonAPI.View.extend({
    template: "addons/hello/templates/hello"
  });

  return Resources;
});