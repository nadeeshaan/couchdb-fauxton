define([
  'app',
  'api',
  'addons/documents/revisionTree/actiontypes',
  'addons/documents/revisionTree/stores',
  "addons/documents/resources"
],

function (app, FauxtonAPI, ActionTypes, Stores, Resources) {

  var revTreeStore = Stores.revTreeStore;

  return {
    newRevisionTree: function (revTreeDataModel, winner) {
      revTreeDataModel.toJSON();
      FauxtonAPI.when(revTreeDataModel.fetch()).done(function () {
        FauxtonAPI.dispatch({
          type: ActionTypes.REV_TREE_NEW_REV_TREE,
          options: {
            winner: winner,
            data:revTreeDataModel.attributes.content
          }
        });
      }.bind(this));
    },

    newRevisionDocData: function () {
      var revDocDataModel = new Resources.RevDocDataModel('treeDataUrl');
      // console.log("newRevisionDocData-------------");

      FauxtonAPI.when(revDocDataModel.fetch()).done(function () {
        // console.log(revDocDataModel);
        FauxtonAPI.dispatch({
          type: ActionTypes.REV_TREE_DOC_REV_DATA,
          options: {
            data: revDocDataModel.get('content')
          }
        });
      }.bind(this));
    }
  };
});
