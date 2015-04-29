define([
  "app",
  "api"
],

function (app, FauxtonAPI) {
  var Resources = {};

  Resources.Hello = FauxtonAPI.View.extend({
    template: "addons/docRetrieve/templates/docRetrieve"
  });

  return Resources;
});