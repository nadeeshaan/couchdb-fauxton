define([
  "app",
  "api",
  "addons/hello/resources",
  "addons/hello/components.react"
],

function (app, FauxtonAPI,SAMPLE, Components) {
  var Views= {};

  Views.Wrapper = FauxtonAPI.View.extend({
    className: 'list',

    afterRender: function () {
      Components.renderSAMPLE(this.el);
    }

  });

  SAMPLE.WRAP = Views;
  // console.log(SAMPLE);
  // console.log(SAMPLE.WRAP);
  // console.log(Views);
  // console.log(SAMPLE.WRAP.Wrapper);

  return SAMPLE;
});
