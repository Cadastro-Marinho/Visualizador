// Add AJAX requests for data
var latinamerica = $.ajax({
  url:"https://raw.githubusercontent.com/Cadastro-Marinho/LatinAmericaData/master/LatinAmerica.geojson",
  dataType: "json",
  success: console.log("Latin America boundaries data successfully loaded."),
  error: function (xhr) {
    alert(xhr.statusText);
  }
});

/*
var zonasmaritimasbrasil = $.ajax({
  url : ibge('CCAR:BCIM_Outros_Limites_Oficiais_L'),
  dataType : 'json',
  jsonpCallback : 'getJson',
  success: console.log("Zonas Marítimas (BR) data successfully loaded."),
  error: function (xhr) {
    alert(xhr.statusText);
  }
});
*/

var limitesUY = $.ajax({
//  url: 'https://srvgis.igm.gub.uy/arcgis/services/LimitesNacionalesMarinos_wfs_250000/MapServer/WFSServer?service=WFS&request=GetFeature&typeNames=LimitesNacionalesMarinos_wfs_250000:LimitesNacionalesMarinos_wfs_250000&outputFormat=GEOJSON',
  url: 'https://raw.githubusercontent.com/Cadastro-Marinho/UruguayData/master/limitesmarinosUY.geojson',
  dataType: "json",
  success: console.log("Limites Nacionales Marinos (UY) data successfully loaded."),
  error: function (xhr) {
    alert(xhr.statusText);
  }
});

var zonasUY = $.ajax({
  url : dinama('u19600217:c321', "id in (1, 3, 8, 10)"),
  dataType : 'jsonp',
  jsonpCallback : 'getJson',
  success:  console.log('Uruguay Maritime Zones successfully loaded.'),
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

var iwAR = $.ajax({
  url:"https://raw.githubusercontent.com/Cadastro-Marinho/ArgentinaData/master/iwAR.geojson",
  dataType: "json",
  success: console.log("Argentinean IW data successfully loaded."),
  error: function (xhr) {
    alert(xhr.statusText);
  }
});  


// Bug: These two ajax layers requests below causes alerts when loaded.

/*
var lme = $.ajax({
  url : marineRegions('MarineRegions:lme'),
  dataType : 'json',
  jsonpCallback : 'getJson',
  success: console.log("LME data successfully loaded."),
  error: function (xhr) {
    alert(xhr.statusText);
  }
});  

var fao = $.ajax({
  url : marineRegions('MarineRegions:fao'),
  dataType : 'json',
  jsonpCallback : 'getJson',
  success: console.log("FAO data successfully loaded."),
  error: function (xhr) {
    alert(xhr.statusText);
  }
});

*/

var cables = $.ajax({
  url: 'https://raw.githubusercontent.com/telegeography/www.submarinecablemap.com/master/public/api/v2/cable/cable-geo.json',
  dataType: "json",
  success: console.log("Cable data successfully loaded."),
  error: function (xhr) {
    alert(xhr.statusText);
  }
});

/*
var correntesmaritimas = $.ajax({
  url : 'http://services1.arcgis.com/VAI453sU9tG9rSmh/ArcGIS/rest/services/WorldGeo_Physical_Climate_features/FeatureServer/',
  dataType : 'json',
  jsonpCallback : 'getJson',
  success: console.log("Sea Currents data successfully loaded."),
  error: function (xhr) {
    alert(xhr.statusText);
  }
});
*/

/* when().done() SECTION*/
// Add the variable for each of your AJAX requests to $.when()
$.when(latinamerica, limitesUY, iwAR).done(function() {
  
  var mappos = L.Permalink.getMapLocation(zoom = 4, center = [-30, -52]);

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
  
  var loadedBounds = map.getBounds();
  
  L.Permalink.setup(map);
  
  var sidebar = L.control.sidebar('sidebar').addTo(map);
  
  // 1. Adds base layers
  
  // 1.1 Adds GEBCO Base Layer
  var GEBCO = L.tileLayer.wms(
    'https://www.gebco.net/data_and_products/gebco_web_services/2019/mapserv?', {
      layers: 'GEBCO_2019_Grid',
      label: "GEBCO 2019",
    }
  );
  
  // 1.2 Adds Esri Base Maps
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
    
  // 1.3 Adds Open Street Base Maps
  
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
  
  // 2. Adds Territorial Limits
  
  // 2.0 TS, CZ and EEZ from all countries, except BR, UY and AR
  
  var paises = 'Colombia';
  
  var bbox = L.latLngBounds(L.latLng(22, -118), L.latLng(-70, -29));
  
  var options = {
    url: 'https://geo.vliz.be/geoserver/MarineRegions/wfs',
    typeNS: 'MarineRegions',
    typeName: 'eez_12nm',
    crs: L.CRS.EPSG4326,
    geometryField: 'the_geom',
    filter: new L.Filter.BBox('the_geom', bbox, L.CRS.EPSG4326),
//    filter: new L.Filter.NotEQ('territory1', 'Uruguay OR Brazil'),  
    opacity: 0.75,
    fillOpacity: 0.25,
    style: {
      color: 'LightGray',
      weight: 1,
      stroke: true,
      dashArray: 5
    }
  };
  
  var TS = new L.WFS(options);
  
  //TS.loadFeatures(L.Filter.bbox(options.geometryField, bbox, options.crs));
  
  options.typeName = 'eez_24nm';
  
  var CZ = new L.WFS(options);
  
//  CZ.loadFeatures(L.Filter.bbox(options.geometryField, bbox, options.crs));
  
  options.typeName = 'eez_boundaries';
  
  var EEZ = new L.WFS(options);
  
//  EEZ.loadFeatures(L.Filter.bbox(options.geometryField, bbox, options.crs));

  /* Very slow

  var continueLoad = function () {
      
    var bounds = map.getBounds();

    if (loadedBounds.contains(bounds)) {
      return;
    }

    var oldRectangle = L.rectangle([loadedBounds.getSouthEast(), loadedBounds.getNorthWest()]);
    loadedPart = new L.Filter.Not(new L.Filter.Intersects(options.geometryField, oldRectangle, options.crs));

    loadedBounds.extend(bounds);
    var newRectangle = L.rectangle([loadedBounds.getSouthEast(), loadedBounds.getNorthWest()]);
    var newPart = new L.Filter.Intersects(options.geometryField, newRectangle, options.crs);

    wfst.loadFeatures(new L.Filter.And(newPart, loadedPart));
  };
  
  map.on('moveend', continueLoad);
  
  */
  
  // 2.1 América Latina
  
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
  
  // 2.2 Brasil
  
  var UF_2013 = IBGE.getLayer('CGEO:UF_2013');
  var linhaCostaBR = IBGE.getLayer('CGEO:AtlasMar_Linhadecosta').addTo(map);
  //var limiteMTBR = IBGE.getLayer('CGEO:AtlasMar_LimiteDoMarTerritorial').addTo(map);
  
  // 2.3 Argentina
  
  var Departamento =  new L.WFS({
    url: 'https://wms.ign.gob.ar/geoserver/wfs',
    //typeNS: 'ign',
    typeName: 'ign:departamento',
    geometryField: 'geom',
    crs: L.CRS.EPSG4326,
    fillOpacity: 0.25,
    style: {
      color: '#f1f4c7',
      weight: 1
    }
  }).addTo(map);
  
/*
  var Departamento = L.geoJSON(departamento.responseJSON, {
    style: function (feature) {
      return {
        stroke: true,
        fillColor: 'yellow',
        fillOpacity: 0.25
      };
    },onEachFeature: function (feature, layer) {
        popupOptions = {maxWidth: 200};
        layer.bindPopup(
          "<b>Departamento: </b>" + feature.properties.fna + "<br>" +
          "<b>Código INDEC: </b>" + feature.properties.in1 + "<br>" +
          "<b>Área: </b>" 
        ,popupOptions);
      }
  });
*/
  
  // 2.4 Uruguai
  
  // 3. Adds Maritime Zones
  
  // 3.1 América Latina
  
  
  // 3.2 Brasil

  /*
  var zonasMaritimasBrasil = L.geoJson(zonasmaritimasbrasil.responseJSON, {
    style: function (feature) {
      return {
        weight: 1,
        opacity: 1,
        color: 'RoyalBlue'
      };
    }
  }).addTo(map);
  */
  
  var zonasMaritimasBrasil = new L.WFS({
    url: 'https://geoservicos.ibge.gov.br/geoserver/ows',
    typeNS: 'CCAR',
    typeName: 'BCIM_Outros_Limites_Oficiais_L',
    geometryField: 'geom',
    crs: L.CRS.EPSG4326,
    style: {
        color:  '#f1f4c7',
        weight: 2,
        opacity: 1
    }
  }).addTo(map);
  
  /*
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
  */
  
  var EXTENSAO = L.geoJSON(extensao.responseJSON, {
    style: {
      color: '#f1f4c7',
      fillColor: '#637fd2',
      weight: 2,
      fillOpacity: 0.40
    },
    onEachFeature: function( feature, layer ){
      layer.bindPopup(
        "<b>Nome: </b>" + feature.properties.nome + "<br>" +
        "<b>Região: </b>" +  feature.properties.regiao + "<br>" +
        "<b>Área: </b>" + Area(feature).toLocaleString('de-DE', { 
          maximumFractionDigits: 2 }) + " km&#178;"
      );
    }
  }).addTo(map);
  
  // 3.3 Argentina
  
  var linhaCostaAR = IGN.getLayer('ign:linea_de_limite_BA000').addTo(map);
  var linhaBaseAR = IGN.getLayer('ign:linea_de_limite_BA011').addTo(map);
  var limiteLateralAR = IGN.getLayer('ign:linea_de_limite_070102').addTo(map);
  var limiteMTAR = IGN.getLayer('ign:linea_de_limite_070103').addTo(map);
  var limiteZCAR = IGN.getLayer('ign:linea_de_limite_070105').addTo(map);
  var limiteZEEAR = IGN.getLayer('ign:linea_de_limite_070107').addTo(map);
  var limitePCAR = IGN.getLayer('ign:linea_de_limite_070109').addTo(map);
  
  var IWAR = L.geoJSON(iwAR.responseJSON, {
    style: {
      color: '#f1f4c7',
      fillColor: '#637fd2',
      weight: 2,
      opacity: 1,
      dashArray: '3',
      fillOpacity: 0.40
    },
    onEachFeature: function( feature, layer ){
      layer.bindPopup(
        "<b>Descrição: </b>" + "Águas Internas" + "<br>" +
        "<b>País: </b>" + "Argentina" + "<br>" +
        "<b>Área: </b>" + Area(feature).toLocaleString('de-DE', { 
          maximumFractionDigits: 2 }) + " km&#178; <br>" 
      );
    }
  }
  ).addTo(map);
  
  var TSAR = new L.WFS({
    url: 'https://wms.ign.gob.ar/geoserver/wfs',
    typeNS: 'ign',
    typeName: 'mar_territorial_argentino',
    geometryField: 'geom',
    crs: L.CRS.EPSG4326,
    fillOpacity: 0.25,
    style: {
      color:  '#f1f4c7',
      fillColor: '#637fd2',
      weight: 2,
      opacity: 1
    }
  }).addTo(map);
  
  var CZAR = new L.WFS({
    url: 'https://wms.ign.gob.ar/geoserver/wfs',
    typeNS: 'ign',
    typeName: 'zona_contigua_argentina',
    geometryField: 'geom',
    crs: L.CRS.EPSG4326,
    fillOpacity: 0.25,
    style: {
      color:  '#f1f4c7',
      fillColor: '#637fd2',
      weight: 2,
      opacity: 1
    }
  }).addTo(map);

  var EEZAR = new L.WFS({
    url: 'https://wms.ign.gob.ar/geoserver/wfs',
    typeNS: 'ign',
    typeName: 'zona_economica_exclusiva_argentina',
    geometryField: 'geom',
    crs: L.CRS.EPSG4326,
    fillOpacity: 0,
    style: {
      color:  '#f1f4c7',
      fillColor: '#637fd2',
      weight: 2,
      opacity: 1
    }
  }).addTo(map);
  
  var EXTENSAOAR = new L.WFS({
    url: 'https://wms.ign.gob.ar/geoserver/wfs',
    typeNS: 'ign',
    typeName: 'plataforma_continental',
    geometryField: 'geom',
    crs: L.CRS.EPSG4326,
    fillOpacity: 0.40,
    style: {
      color:  '#f1f4c7',
      fillColor: '#637fd2',
      weight: 2,
      opacity: 1
    }
  }).addTo(map);
  
  // 3.4 Uruguay

  var LimitesNacionalesMarinosUY = L.geoJSON(limitesUY.responseJSON,  {
    style: function(feature) {
      return{
        color: '#f1f4c7',
        weight: 2,
        opacity: 1
      };
    }
  }).addTo(map);
  
  var zonasJuridicasUY = L.geoJSON(zonasUY.responseJSON, {
    style: {
      color: '#f1f4c7',
      fillColor: '#637fd2',
      weight: 2,
      fillOpacity: 0.40
    },
    onEachFeature: function( feature, layer ){
      layer.bindPopup(
        "<b>Nome: </b>" + feature.properties.descripcio + "<br>" +
        "<b>Área: </b>" + Area(feature).toLocaleString('de-DE', { 
          maximumFractionDigits: 2 }) + " km&#178;"
      );
    }
  }).addTo(map);
  
  /*
  var zonasJuridicasUY = new L.WFS({
    url: 'http://www.dinama.gub.uy/geoserver/u19600217/wms',
    typeNS: 'u19600217',
    typeName: 'c321',
    geometryField: 'geometry',
    crs: L.CRS.EPSG4326,
    style: {
        color:  '#637fd2',
        weight: 1,
        opacity: 1
    }
  }).addTo(map);
  */

  // 4. Adds thematic layers
  
  // 4.1 General layers
  
  // Adds WMS Layers (Marine Regions)
  var Ecoregions = L.tileLayer.wms(
    'http://geo.vliz.be/geoserver/Ecoregions/wms', {
      layers: 'ecoregions',
      format: 'image/png',
      transparent: true,
      opacity: 0.40
  });
  
   var LME = new L.WFS({
    url: 'https://geo.vliz.be/geoserver/MarineRegions/wfs',
    typeNS: 'MarineRegions',
    typeName: 'lme',
    geometryField: 'the_geom',
    crs: L.CRS.EPSG4326,
    fillOpacity: 0.25,
    style: {
      color: 'Aquamarine',
      weight: 2
    },
  });
  
  var FAO = new L.WFS({
    url: 'https://geo.vliz.be/geoserver/MarineRegions/wfs',
    typeNS: 'MarineRegions',
    typeName: 'fao',
    geometryField: 'the_geom',
    crs: L.CRS.EPSG4326,
    fillOpacity: 0.25,
    style: {
      color: 'Chocolate',
      weight: 2
    },
  });
  
  /*
  var LME = L.geoJSON(lme.responseJSON, {
      style: {
        color: 'Aquamarine',
        weight: 2,
        fillOpacity: 0.25
      },
      onEachFeature: function( feature, layer ){
        layer.bindPopup(
          "<b>Descrição: </b>" + feature.properties.lme_name + "<br>" +
          "<b>Área: </b>" + 
          feature.properties.sum_gis_km.toLocaleString('de-DE', { 
            maximumFractionDigits: 2 }) + " km&#178;"
        );
      }
  });
  
  var FAO = L.geoJSON(fao.responseJSON, {
      style: {
        color: 'Chocolate',
        weight: 2,
        fillOpacity: 0.25
      },
      onEachFeature: function( feature, layer ){
        layer.bindPopup(
          "<b>Zona: </b>" + feature.properties.zone + "<br>" +
          "<b>Área: </b>" + 
          Area(feature).toLocaleString('de-DE', { maximumFractionDigits: 2 })+  
          " km&#178;<br>" +
          "<b>Link:  </b>" + link1(feature) +  "<br>"
        );
      }
  });
  */
  
  // Adds NOAA Undersea Feature Names from NOAA
  
  var NOAAPolygons = NOAA.getLayer('0');
  var NOAALines = NOAA.getLayer('1');
  var NOAAPoints = NOAA.getLayer('2');  
  
  /*
  var correntesMaritimas = L.geoJson(correntesmaritimas.responseJSON, {
    style: function (feature) {
      return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
      };
    }
  }).addTo(map);

  var Cables = L.geoJSON(cables.responseJSON, {
    style: function(feature) {
      return {
        color: feature.properties.color
      };
    },
    onEachFeature: function (feature, layer) {
		  layer.bindPopup(feature.properties.slug);
	  }
  }).addTo(map);
  */
  
  // 4.2 Brasil layers

  var curvaBatimetrica = IBGE.getLayer('CCAR:BCIM_Curva_Batimetrica_L');
  var pontoCotado = IBGE.getLayer('CCAR:BCIM_Ponto_Cotado_Batimetrico_P');
  
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
          GEBCO, Esri_OceanBasemap, Esri_NatGeoWorldMap, Esri_WorldImagery, 
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
      "Estados (BR)": UF_2013,
      "Departamentos (AR)": Departamento,
      "Linha de Costa (BR)": linhaCostaBR,
      "Linea de Costa (AR)": linhaCostaAR
    },
    "Limites Zonas Marítimas": {
      "Linha de Base (AR)": linhaBaseAR,
      "Limite do Mar Territorial (AR)": limiteMTAR,
      "Limite da Zona Contígua (AR)": limiteZCAR,
      "Limite da Zona Econômica Exclusiva (AR)": limiteZEEAR,
      "Limite da Plataforma Continental (AR)": limitePCAR,
      "Limite Lateral (AR)": limiteLateralAR,
      "Limites Marinhos (BR)": zonasMaritimasBrasil,
      "Limites Marinhos (UY)": LimitesNacionalesMarinosUY
    },
    "Zonas Marítimas":{
      "Plataforma Continental (BR)": EXTENSAO,
      "Águas Internas (AR)": IWAR,
      "Mar Territorial (AR)": TSAR,
      "Zona Contígua (AR)": CZAR,
      "Zona Econômica Exclusiva (AR)": EEZAR,
      "Plataforma Continental (AR)": EXTENSAOAR,
//      "Zonas Marítimas (UY)": zonasJuridicasUY
    },
    "Marine Regions":{
      "Mar Territorial": TS,
      "Zona Contígua": CZ,
      "Zona Econômica Exclusiva": EEZ,
      "Ecoregions": Ecoregions,
      "Large Marine Ecosystems": LME,
      "FAO": FAO
    },
    "Nomes": {
      "Pontos NOAA": NOAAPoints,
      "Linhas NOAA": NOAALines,
      "Polígonos NOAA": NOAAPolygons,
    },
    "MPOG":{
      "Marinha Mercante": marinhaMercante
    },
    "Batimetria":{
      "Pontos Cotados": pontoCotado,
      "Curvas Batimétricas": curvaBatimetrica,
    }
    //"Ambiental": {
    //  "Unidades de Conservação": UC
    //},
  };
  
  L.control.groupedLayers(null, groupedOverlays, {
    position: 'topleft',
    groupCheckboxes: true
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