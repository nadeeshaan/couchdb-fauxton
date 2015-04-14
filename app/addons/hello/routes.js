define([
  "app",
  "api",
  "addons/hello/resources",
  "addons/hello/views"
],

function(app, FauxtonAPI, Resources, Views) {
  var  HelloRouteObject = FauxtonAPI.RouteObject.extend({
    layout: "one_pane",

    crumbs: [
      {"name": "Hello","link": "_hello"}
    ],

    routes: {
       "_hello": "helloRoute"
    },

    selectedHeader: "Hello",

    roles: ["_admin"],

    apiUrl:'hello',

    initialize: function () {
        //put common views used on all your routes here (eg:  sidebars )
    },

    helloRoute: function () { 
      this.setView("#dashboard-content", new Resources.WRAP.Wrapper({}));
    }
  });

  Resources.RouteObjects = [HelloRouteObject];

  return Resources;

});