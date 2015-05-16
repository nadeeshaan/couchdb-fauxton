define([
  'app',
  'api',
  'addons/documents/revisionTree/actiontypes'
],

function (app, FauxtonAPI, ActionTypes) {

  var Stores = {};

  Stores.RevTreeStore = FauxtonAPI.Store.extend({

    initialize: function () {
      this._treeOptions;
    },

    newRevTree: function (options) {
      console.log("At Stores option data");
      console.log(options);
      // var urlV = app.host + '/' + options.db + '/' + options.docID + '?open_revs=all&revs=true';
      // var RevTreeModel = Backbone.Model.extend({
      //   initialize: function () {
      //     console.log("Inside event");
      //   },
      //   url: function () {
      //     return urlV;
      //   },

      //   sync: function (method, model, options) {
      //     console.log("inside Sync");
      //     var params = {
      //       error: options.error,
      //       success: options.success,
      //       url: model.url(),
      //       type: 'GET',
      //       dataType: 'text'
      //     };

      //     return $.ajax(params);
      //   },
      //   parse: function (response) {

      //     var parsedResult = [];
      //     var splitResponse = response.split(/(\n|\r\n|\r)/);

      //     for (var i = 0; i < splitResponse.length; i++) {
      //       if (String(splitResponse[i]).charAt(0) == "{") {
      //         parsedResult.push(JSON.parse(splitResponse[i]));
      //       }
      //     }

      //     // console.log(response);
      //     return {content: parsedResult};
      //   }
      // });


      // var model = new RevTreeModel();
      // model.toJSON();
      // model.fetch();
      // // console.log((model.attributes).content);
      // this._treeData = model.attributes;
      this._treeOptions = options;
    },

    getTreeOptions: function () {
      return this._treeOptions;
    },

    getTreeData: function () {
      return this._treeData;
    },

    dispatch: function (action) {
      switch (action.type) {
        case ActionTypes.REV_TREE_NEW_REV_TREE:
          this.newRevTree(action.options);
          this.triggerChange();
        break;
        default:
        return;
      }
    }

  });

  Stores.revTreeStore = new Stores.RevTreeStore();
  Stores.revTreeStore.dispatchToken = FauxtonAPI.dispatcher.register(Stores.revTreeStore.dispatch);

  return Stores;

});
