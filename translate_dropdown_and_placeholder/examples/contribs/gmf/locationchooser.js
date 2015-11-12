


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf', 'gettext']);



/**
 * @constructor
 * @ngInject
 */
app.MainController = function() {

  /**
   * @type {Array.<gmfx.LocationchooserLocation>}
   * @export
   */
  this.locations = [{
    label: 'Europa',
    extent: [-1898084, 4676723, 3972279, 8590299]
  }, {
    label: 'Switzerland',
    extent: [727681, 5784754, 1094579, 6029353]
  }, {
    label: 'Iceland',
    extent: [-2778639, 9133308, -1311048, 10111701]
  }, {
    label: 'Australia',
    extent: [12044030, -4921322, 17914393, -1007746]
  }];


  /**
   * @type {string}
   * @export
   */
  this.selectedLocation = '[' + this.locations[2].extent + ']';

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
};


app.module.controller('MainController', app.MainController);
