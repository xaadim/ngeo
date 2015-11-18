


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);



/**
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @constructor
 * @ngInject
 */
app.MainController = function(ngeoFeatureOverlayMgr) {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: [0, 0],
      zoom: 4
    })
  });

  ngeoFeatureOverlayMgr.init(this.map);
};


app.module.controller('MainController', app.MainController);
