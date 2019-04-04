define(["scripts/Constants",
  "scripts/loadData",
  "scripts/map",
  "esri/views/MapView",
  "esri/renderers/SimpleRenderer",
  "esri/layers/CSVLayer",
  //"esri/layers/FeatureLayer",
  "esri/widgets/Search",
],
  function (
    Constants,
    loadData,
    map,
    MapView,
    citiesRenderer,
    FeatureLayer,
    Search
  ) {
    var viewProperties = {
      map: map,
      container: Constants.MAP_VIEW_DIV_ID,
      zoom: 4,
      center: [-100, 36],
      layers: [citiesLayer]
    };
    var view = new MapView(viewProperties);

    // Set a basic symbol on a layer to visualize all features the same way
    var citiesRenderer = {
      type: "simple",  // autocasts as new SimpleRenderer()
      symbol: {
        labelsVisible: true,
        type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
        style: "x",
        size: 6,
        color: "blue",
        outline: {  // autocasts as new SimpleLineSymbol()
          width: 100,
          color: "black"
        }
      }
    };
    var template = {
      title: "{Name} National Park",
      content: "{description}",
    }

    var citiesLayer = new FeatureLayer({
      url: "./citiesLayer.csv",
      //url: "./nps_parks.csv",
      popupTemplate: template,
      renderer: citiesRenderer
    });

    view.ui.add(new Search({
      view: view
    }), "top-right", "padding: 20px");

    map.add(citiesLayer);

    return view;
  });