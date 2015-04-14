define([
  "app",
  "api",
  "addons/hello/routes"
],

function(app, FauxtonAPI, HelloRoutes) {

  HelloRoutes.initialize = function() {
    FauxtonAPI.addHeaderLink({title: "Hello", href: "#_hello"});
  };

  return HelloRoutes;
});