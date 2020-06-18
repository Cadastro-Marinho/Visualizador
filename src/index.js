// Add AJAX requests for data
var latinamerica = $.ajax({
  url:"https://raw.githubusercontent.com/Cadastro-Marinho/LatinAmericaData/master/LatinAmerica.geojson",
  dataType: "json",
  success: console.log("Latin America boundaries data successfully loaded."),
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

var eezAR = $.ajax({
  url:"https://raw.githubusercontent.com/Cadastro-Marinho/ArgentinaData/master/zona_economica_exclusiva_argentina.geojson",
  dataType: "json",
  success: console.log("Argentinian EEZ data successfully loaded."),
  error: function (xhr) {
    alert(xhr.statusText);
  }
});  

var iwAR = $.ajax({
  url:"https://raw.githubusercontent.com/Cadastro-Marinho/ArgentinaData/master/aguas_internas_argentina.geojson",
  dataType: "json",
  success: console.log("Argentinean IW data successfully loaded."),
  error: function (xhr) {
    alert(xhr.statusText);
  }
});  

var tsAR = $.ajax({
  url:"https://raw.githubusercontent.com/Cadastro-Marinho/ArgentinaData/master/mar_territorial_argentino.geojson",
  dataType: "json",
  success: console.log("Argentinean TS data successfully loaded."),
  error: function (xhr) {
    alert(xhr.statusText);
  }
});  

var czAR = $.ajax({
  url:"https://raw.githubusercontent.com/Cadastro-Marinho/ArgentinaData/master/zona_contigua_argentina.geojson",
  dataType: "json",
  success: console.log("Argentinean CZ data successfully loaded."),
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

var extensaoAR = $.ajax({
  url:"https://raw.githubusercontent.com/Cadastro-Marinho/ArgentinaData/master/plataforma_continental.geojson",
  dataType: "json",
  success: console.log("Argentinian PC data successfully loaded."),
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
$.when(latinamerica, eez, extensao, lme, fao).done(function() {
  
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
  
  // Adds GEBCO Base Layer
  var GEBCO = L.tileLayer.wms(
    'https://www.gebco.net/data_and_products/gebco_web_services/2019/mapserv?', {
      layers: 'GEBCO_2019_Grid',
      label: "GEBCO 2019",
    }
    
  );
  
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

  // Adds WMS Layers (Marine Regions)
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
  
  //Adds WFS server (IGN)
  var owsrootUrl = 'https://wms.ign.gob.ar/geoserver/wfs';

  var defaultParameters = {
      service : 'WFS',
      version : '2.0',
      request : 'GetFeature',
      typeName : 'ign:departamento',
      outputFormat : 'application/json',
      format_options : 'callback:getJson',
      SrsName : 'EPSG:4326'
  };
  
  var parameters = L.Util.extend(defaultParameters);
  var URL = owsrootUrl + L.Util.getParamString(parameters);
  
  var Departamento = null;

  var departamento = $.ajax({
      url : URL,
      dataType : 'json',
      jsonpCallback : 'getJson',
      success: function (response) {
          Departamento = L.geoJson(response, {
              style: function (feature) {
                  return {
                      stroke: true,
                      fillColor: 'yellow',
                      fillOpacity: 0.25
                  };
              },
              onEachFeature: function (feature, layer) {
                  popupOptions = {maxWidth: 200};
                  layer.bindPopup(
                    "<b>Departamento: </b>" + feature.properties.fna + "<br>" +
                    "<b>Código INDEC: </b>" + feature.properties.in1 + "<br>" +
                    "<b>Área: </b>" 
                      ,popupOptions);
              }
          }).addTo(map);
      }
  });
  
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
  
  var EEZAR = L.geoJSON(eezAR.responseJSON, {
   style: {
    fillColor: '#133863',
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.40
   },
    onEachFeature: function( feature, layer ){
      layer.bindPopup(
        "<b>Descrição: </b>" + feature.properties.objeto + "<br>" +
        "<b>Área: </b>" + Area(feature).toLocaleString('de-DE', { 
          maximumFractionDigits: 0 }) + " km&#178; <br>" +
        "<b>Metadados: </b>" + "<a href=http://ramsac.ign.gob.ar/operaciones_sig/shp_from_geoserver/download.php?f=bWV0YWRhdG9zOjp6b25hX2Vjb25vbWljYV9leGNsdXNpdmFfYXJnZW50aW5hLnBkZg%3D%3D target='_blank'>Link.</a>"  
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
  );
  
  var EXTENSAOAR = L.geoJSON(extensaoAR.responseJSON, {
    style: {
      color: 'LightGray',
      weight: 2,
      fillOpacity: 0.25
    },  
    onEachFeature: function( feature, layer ){
      layer.bindPopup(
        "<b>Descrição: </b>" + feature.properties.objeto + "<br>" +
        "<b>Área: </b>" + Area(feature).toLocaleString('de-DE', { 
          maximumFractionDigits: 0 }) + " km&#178; <br>" +
        "<b>Metadados: </b>" + "<a href=http://ramsac.ign.gob.ar/operaciones_sig/shp_from_geoserver/download.php?f=bWV0YWRhdG9zOjpwbGF0YWZvcm1hX2NvbnRpbmVudGFsLnBkZg%3D%3D target='_blank'>Link.</a>"
      );
    }
  }
  );
  
  var IWAR = L.geoJSON(iwAR.responseJSON, {
    style: {
      fillColor: '#133863',
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.40
    },
    onEachFeature: function( feature, layer ){
      layer.bindPopup(
        "<b>Descrição: </b>" + feature.properties.geoname + "<br>" +
        "<b>Tipo: </b>" + feature.properties.pol_type + "<br>" +
        "<b>Área: </b>" + 
        feature.properties.area_km2.toLocaleString('de-DE', { 
          maximumFractionDigits: 2 }) + " km&#178; <br>" 
      );
    }
  }
  ).addTo(map);
  
  var TSAR = L.geoJSON(tsAR.responseJSON, {
    style: {
      fillColor: '#133863',
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.40
    },  
    onEachFeature: function( feature, layer ){
      layer.bindPopup(
        "<b>Descrição: </b>" + feature.properties.objeto + "<br>" +
        "<b>Área: </b>" + Area(feature).toLocaleString('de-DE', { 
          maximumFractionDigits: 0 }) + " km&#178; <br>" +
        "<b>Metadados: </b>" + "<a href=http://ramsac.ign.gob.ar/operaciones_sig/shp_from_geoserver/download.php?f=bWV0YWRhdG9zOjptYXJfdGVycml0b3JpYWxfYXJnZW50aW5vLnBkZg%3D%3D target='_blank'>Link.</a>"
      );
    }
  }
  ).addTo(map);
  
  var CZAR = L.geoJSON(czAR.responseJSON, {
    style: {
      fillColor: '#133863',
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.40
    },  
    onEachFeature: function( feature, layer ){
      layer.bindPopup(
        "<b>Descrição: </b>" + feature.properties.objeto + "<br>" +
        "<b>Área: </b>" + Area(feature).toLocaleString('de-DE', { 
          maximumFractionDigits: 0 }) + " km&#178; <br>" +
        "<b>Metadados: </b>" + "<a href=http://ramsac.ign.gob.ar/operaciones_sig/shp_from_geoserver/download.php?f=bWV0YWRhdG9zOjp6b25hX2NvbnRpZ3VhX2FyZ2VudGluYS5wZGY%3D target='_blank'>Link.</a>"
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
  
  var marinhaMercante = L.tileLayer.wms("https://geoservicos.inde.gov.br/geoserver/MPOG/ows", {
    layers: 'Marinha_Mercante',
    transparency: true,
    opacity: 0.2
  });
  

  // Adds Minimap
  var miniMap = new L.Control.MiniMap(Esri_NatGeoWorldMap, {
      position: 'topright',
      toggleDisplay: true
    }
  ).addTo(map);
  
  // Adds basemaps choices
    
  var basemaps = [
          Esri_OceanBasemap, GEBCO, Esri_NatGeoWorldMap, Esri_WorldImagery, 
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
      "América Latina": LatinAmerica
    },
    "Zonas Marítimas":{
      "Águas Internas AR": IWAR,
      "Mar Territorial (12MN) AR": TSAR,
      "Zona Contígua (12MN) AR": CZAR,
      //"Zona Contígua (24MN)": CZ,
      "Zona Econômica Exclusiva (200MN)": EEZ,
      "Zona Econômica Exclusiva (200MN) AR": EEZAR,
      "Extensão da PC brasileira": EXTENSAO,
      "Extensão da PC argentina": EXTENSAOAR
    },
    "Limites Ambientais":{
      "Ecoregions": Ecoregions,
      "Large Marine Ecosystems": LME,
      "FAO": FAO
    },
    "Nomes": {
      "NOAA": NOAA
    },
    "MPOG":{
      "Marinha Mercante": marinhaMercante
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
  
  // Adds file loader
   L.Control.FileLayerLoad.LABEL = '<img class="icon" src="folder.svg" alt="file icon"/>';
  control = L.Control.fileLayerLoad({
      // Allows you to use a customized version of L.geoJson.
      // For example if you are using the Proj4Leaflet leaflet plugin,
      // you can pass L.Proj.geoJson and load the files into the
      // L.Proj.GeoJson instead of the L.geoJson.
      layer: L.geoJson,
      // See http://leafletjs.com/reference.html#geojson-options
      layerOptions: {
        style: {
          color:'red',
          opacity: 1.0,
          fillOpacity: 0.25,
          weight: 2,
          clickable: false
        }
      },
      // Add to map after loading (default: true) ?
      addToMap: true,
      // File size limit in kb (default: 1024) ?
      fileSizeLimit: 5120,
      // Restrict accepted file formats (default: .geojson, .json, .kml, and .gpx) ?
      formats: [
          '.geojson',
          '.kml'
      ]
  });
  
  control.addTo(map);
  
  control.loader.on('data:loaded', function (e) {
      var layer = e.layer;
      console.log(layer);
  });
  
}); 