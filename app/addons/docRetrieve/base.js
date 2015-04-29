define([
  "app",
  "api",
  "addons/docRetrieve/routes"
],

function(app, FauxtonAPI, HelloRoutes) {

  HelloRoutes.initialize = function() {
    FauxtonAPI.addHeaderLink({title: "Hello", href: "#_hello"});
  };

  return HelloRoutes;
});