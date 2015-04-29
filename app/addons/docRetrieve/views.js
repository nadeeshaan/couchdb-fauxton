define([
	"app",
  "api",
  "addons/docRetrieve/resources",
  "addons/docRetrieve/component.react"
],

function (app, FauxtonAPI,SAMPLE, Components) {
  var Views= {};

  Views.Wrapper = FauxtonAPI.View.extend({
    className: 'list',

    afterRender: function () {
      Components.renderContent(this.el);
    }

  });

  SAMPLE.WRAP = Views;

  return SAMPLE;
});