define([
  "app",
  "api",
  "addons/revisionTree/routes"
  ],

  function(app, FauxtonAPI, RevTreeRoutes) {

    RevTreeRoutes.initialize = function() {
      // FauxtonAPI.addHeaderLink({title: "Hello", href: "#_revtree"});
    };

    return RevTreeRoutes;
  });