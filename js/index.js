var map, layer;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
          console.log("deviceready received");
          var openStreetMapLayer = new ol.layer.Tile({
          source: new ol.source.OSM({
            url: 'http://tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        });
        var urbanMapLayer = new ol.layer.Tile({
          source: new ol.source.OSM({
            url: 'http://181.215.109.65/{z}/{x}/{y}.png'
          })
        });
        urbanMapLayer.setOpacity(0.4);
        var map = new ol.Map({
          layers: [
            openStreetMapLayer,
            urbanMapLayer
          ],
          target: 'map',
          controls: ol.control.defaults().extend([
            new ol.control.FullScreen()
          ]),
          view: new ol.View({
            maxZoom: 18,
            center: ol.proj.transform([88.3639, 22.5726], 'EPSG:4326', 'EPSG:3857'),
            zoom: 10
          })
        });

        var div = $('#map');
        div.height(
          Math.max( div.height() + ($(window).height() - $('body').height()), 300 )
        );
        map.updateSize();
    },
};
