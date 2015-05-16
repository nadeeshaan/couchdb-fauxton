define([
  "app",
  "api",
  "addons/documents/resources",
  "addons/documents/views-rev-tree",
  "addons/documents/revisionTree/actions",
  "addons/documents/revisionTree/component.react"

],

function (app, FauxtonAPI, Resources, Views, RevisionTreeActions, AppComponent) {
  var  RevTreeRouteObject = FauxtonAPI.RouteObject.extend({
    layout: "one_pane",

    crumbs: [
      {"name": "Revision Tree" , "link": "_revtree"}
    ],

    routes: {
       "_revtree/:database/:doc/:winner": "revtreeRoute"
    },

    roles: ["_admin"],

    apiUrl:'revtree',

    initialize: function () {
        //put common views used on all your routes here (eg:  sidebars )
    },

    revtreeRoute: function (database, docId, winner) {
      var treeDataUrl = app.host + '/' + database + '/' + docId + '?open_revs=all&revs=true';

      var revTreeData = new Resources.RevTreeDataModel(treeDataUrl);

      RevisionTreeActions.newRevisionTree(revTreeData, winner);
      this.setComponent("#dashboard-content", AppComponent.App);

      // this.setView("#dashboard-content", new Resources.WRAP.Wrapper({params: parameters}));
    }
  });

  Resources.RouteObjects = [RevTreeRouteObject];

  // return Resources;
  return RevTreeRouteObject;

});
