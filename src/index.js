// Add AJAX requests for data
var latinamerica = $.ajax({
  url:"https://raw.githubusercontent.com/Cadastro-Marinho/LatinAmericaData/master/LatinAmerica.geojson",
  dataType: "json",
  success: console.log("Latin America boundaries data successfully loaded."),
  error: function (xhr) {
    alert(xhr.statusText);
  }
});

var falklands = $.ajax({
  url:"https://raw.githubusercontent.com/Cadastro-Marinho/LatinAmericaData/master/malvinas.geojson",
  dataType: "json",
  success: console.log("Falklands data successfully loaded."),
  error: function (xhr) {
    alert(xhr.statusText);
  }
});

var eez = $.ajax({
  url:"https://raw.githubusercontent.com/Cadastro-Marinho/LatinAmericaData/master/EEZ.geojson",
  dataType: "json",
  success: console.log("Latin America EEZ data successfully loaded."),
  error: function (xhr) {
    alert(xhr.statusText);
  }
});  

var extensao = $.ajax({
  url:"https://raw.githubusercontent.com/Cadastro-Marinho/BrasilData/master/extensao_pc.geojson",
  dataType: "json",
  success: console.log("CP Extension data successfully loaded."),
  error: function (xhr) {
    alert(xhr.statusText);
  }
});

var lme = $.ajax({
  url:"https://raw.githubusercontent.com/Cadastro-Marinho/LatinAmericaData/master/LME66.geojson",
  dataType: "json",
  success: console.log("LME data successfully loaded."),
  error: function (xhr) {
    alert(xhr.statusText);
  }
});     

var fao = $.ajax({
  url:"https://raw.githubusercontent.com/Cadastro-Marinho/LatinAmericaData/master/FAO_Area.geojson",
  dataType: "json",
  success: console.log("FAO data successfully loaded."),
  error: function (xhr) {
    alert(xhr.statusText);
  }
});


/* when().done() SECTION*/
// Add the variable for each of your AJAX requests to $.when()
$.when(latinamerica, falklands, eez, extensao, lme, fao).done(function() {
  
  var mappos = L.Permalink.getMapLocation(zoom = 3, center = [-25, -75]);

  // Initializes the map
  var map = L.map('map', {
      center: mappos.center,
	    zoom: mappos.zoom,
      attributionControl: false,
      zoomControl: false,
      preferCanvas: false,
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: 'topright'
      }
  });
  
  L.Permalink.setup(map);
  
  var sidebar = L.control.sidebar('sidebar').addTo(map);
  
  // Adds Esri Base Maps
  var WSM = L.tileLayer(
    'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}.png', {
	    maxZoom: 18,
	    label: "World Street Map",
	    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    });
    
  var Esri_WorldImagery = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxNativeZoom: 19,
      maxZoom: 100,
      label: "Esri World Imagery",
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User ity'
  });
        
  var Esri_OceanBasemap = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
       maxZoom: 13,
       label: "Esri Ocean Basemap",
       attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri'
  });
  
  var Esri_NatGeoWorldMap = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 16,
      label: 'Esri NatGeo World Map',
      attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'
      });
    
  // Adds Open Street Base Maps
  var OpenStreetMap_Mapnik = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      label: "OpenStreetMap",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  var OpenTopoMap = L.tileLayer(
    'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      label: "OpenTopoMap",
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org"/a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Adds WMS Layer (Marine Regions)
  var Ecoregions = L.tileLayer.wms(
    'http://geo.vliz.be/geoserver/Ecoregions/wms', {
      layers: 'ecoregions',
      transparency: true,
      opacity: 0.40
  });
  
  var NOAA = L.tileLayer.wms(
    'https://gis.ngdc.noaa.gov/arcgis/services/web_mercator/undersea_features/MapServer/WMSServer?', {
      layers: '1',
      version: '1.3'
    }
  );
  
  // Adds Bathymetry data
  var GEBCO = L.tileLayer.wms(
    'https://www.gebco.net/data_and_products/gebco_web_services/2019/mapserv?', {
      layers: 'GEBCO_2019_Grid'
    }
    
  );
  
  // Adds GeoJson Data
  
  var LatinAmerica = L.geoJSON(latinamerica.responseJSON, {
    style: function(feature) {
      return{
        fillOpacity: 0.25,
        color: '#f1f4c7',
        weight: 0.75
      };
    },
    onEachFeature: function( feature, layer ){
      layer.bindPopup(
        "<b>Nome: </b>" + feature.properties.LOCLNGNAM + "<br>" +
        "<b>Status: </b>" + feature.properties.STATUS + "<br>" +
        "<b>Área: </b>" + 
        feature.properties.SQKM.toLocaleString('de-DE', { 
          maximumFractionDigits: 2 }) + " km&#178; <br>" +
        "<b>População (2019): </b>" + 
        feature.properties.POP_CNTRY.toLocaleString('de-DE', { 
          maximumFractionDigits: 0 })
      );
      layer.bindTooltip(feature.properties.LOCSHRTNAM,{
        permanent: false
      });
    }
  }).addTo(map);
  
  var FALKLANDS = L.geoJSON(falklands.responseJSON, {
      style: {
        color: '#f1f4c7',
        weight: 2,
        fillOpacity: 0.25
      },
      onEachFeature: function( feature, layer ){
        layer.bindPopup(
          "<b>Descrição: </b>" + "Malvinas" + "<br>" +
          "<b>Fonte: </b>" + 
          "<a href= http://www.marineregions.org/gazetteer.php?p=details&id=47625 target='_blank'>Link.</a>" + "<br>" +
          "<b>Área: </b>" + Area(feature).toLocaleString('de-DE', { 
            maximumFractionDigits: 2 }) + " km&#178; <br>" +
          "<b>Obs.: </b>"
        );
      }
    }
  ).addTo(map);
  

  var EEZ = L.geoJSON(eez.responseJSON, {
   style: areaStyle,
    onEachFeature: function( feature, layer ){
      layer.bindPopup(
        "<b>Descrição: </b>" + feature.properties.GEONAME + "<br>" +
        "<b>Tipo: </b>" + feature.properties.POL_TYPE + "<br>" +
        "<b>Fonte: </b>" + link(feature) + "<br>" +
        "<b>Área: </b>" + 
        feature.properties.AREA_KM2.toLocaleString('de-DE', { 
          maximumFractionDigits: 2 }) + " km&#178; <br>" 
      );
    }
  }
  ).addTo(map);
  
  var EXTENSAO = L.geoJSON(extensao.responseJSON, {
    style: {
      color: 'LightGray',
      weight: 2,
      fillOpacity: 0.25
    },
    onEachFeature: function( feature, layer ){
      layer.bindPopup(
        "<b>Nome: </b>" + feature.properties.nome + "<br>" +
        "<b>Região: </b>" +  feature.properties.regiao + "<br>" +
        "<b>Área: </b>" + Area(feature).toLocaleString('de-DE', { 
          maximumFractionDigits: 2 }) + " km&#178;"
      );
    }
  }
  ).addTo(map);

  var LME = L.geoJSON(lme.responseJSON, {
      style: {
        color: 'Aquamarine',
        weight: 2,
        fillOpacity: 0.25
      },
      onEachFeature: function( feature, layer ){
        layer.bindPopup(
          "<b>Descrição: </b>" + feature.properties.LME_NAME + "<br>" +
          "<b>Área: </b>" + 
          feature.properties.SUM_GIS_KM.toLocaleString('de-DE', { 
            maximumFractionDigits: 2 }) + " km&#178;"
        );
      }
    }
  );
  
  var FAO = L.geoJSON(fao.responseJSON, {
      style: {
        color: 'Chocolate',
        weight: 2,
        fillOpacity: 0.25
      },
      onEachFeature: function( feature, layer ){
        layer.bindPopup(
          "<b>Descrição: </b>" + feature.properties.NAME_ES + "<br>" +
          "<b>Área: </b>" + 
          surface(feature).toLocaleString('de-DE', { maximumFractionDigits: 2 })+  
          " km&#178;<br>" +
          "<b>Oceano:  </b>" + feature.properties.OCEAN +  "<br>" +
          "<b>Área FAO:  </b>" + feature.properties.F_AREA +  "<br>" +
          "<b>Sub-área FAO:  </b>" + feature.properties.F_SUBAREA +  "<br>" +
          "<b>Divisão FAO: </b>" + feature.properties.F_DIVISION
        );
      }
    }
  );

  // Adds Minimap
  var miniMap = new L.Control.MiniMap(Esri_NatGeoWorldMap, {
      position: 'topright',
      toggleDisplay: true
    }
  ).addTo(map);
  
  // Adds basemaps choices
    
  var basemaps = [
          Esri_OceanBasemap, Esri_NatGeoWorldMap, Esri_WorldImagery, 
          OpenStreetMap_Mapnik , OpenTopoMap
          ];
        
  map.addControl(L.control.basemaps({
    basemaps: basemaps,
    tileX: 0,  // tile X coordinate
    tileY: 0,  // tile Y coordinate
    tileZ: 1   // tile zoom level
    })
  );
  
  // Adds layers control (on/off)
    
  var groupedOverlays = {
    "Limites territoriais":{
      "América Latina": LatinAmerica,
      //"Águas Internas": IW,
      //"Mar Territorial (12MN)": TS,
      //"Zona Contígua (24MN)": CZ,
      "Zona Econômica Exclusiva (200MN)": EEZ,
      "Extensão da PC": EXTENSAO
    },
    "Limites Ambientais":{
      "Ecoregions": Ecoregions,
      "Large Marine Ecosystems": LME,
      "FAO": FAO
    },
    "Batimetria": {
      "GEBCO (2019)": GEBCO
    },
    "Nomes": {
      "NOAA": NOAA
    }
    //"Ambiental": {
    //  "Unidades de Conservação": UC
    //},
  };
  
  L.control.groupedLayers(null, groupedOverlays, {
    position: 'topleft'
  }).addTo(map);
      
  // Adds Mouse Coordinates    
  L.control.mousePosition({
    position: 'bottomleft'
  }).addTo(map);
  
  // Adds Map Graphical Scale
  L.control.betterscale({
    metric:  true,
    imperial: false,
    position: 'bottomleft'
  }).addTo(map);
  
  // Adds button to print the map
  L.easyPrint({
    tileLayer: OpenStreetMap_Mapnik,
    title: 'Screenshot',
    position: 'topleft',
    sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
    exportOnly: true,
    hideControlContainer: false,
    hideClasses: ['leaflet-control-mouseposition', 'leaflet-control-layers',
    'leaflet-control-easyPrint', 'leaflet-control-zoom-fullscreen', 
    'basemaps']
  }).addTo(map);
  
  /*
  // Adds graticule
  L.latlngGraticule({
     showLabel: true,
     color: '#222',
     zoomInterval: [
       {start: 2, end: 3, interval: 30},
       {start: 4, end: 4, interval: 10},
       {start: 5, end: 7, interval: 5},
       {start: 8, end: 10, interval: 1},
       {start: 11, end:15, interval: 0.2}
     ]
  }).addTo(map);    
  */
  
}); 