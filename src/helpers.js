// 1. WMS Sources

// 1.1 Generic

// NOAA WMS Layers Source

var optionsNOAA = {
  'version': '1.3.0',
  'format': 'image/png', 
  'transparent': true, 
  'opacity': 1,
  'info_format': 'text/html'
};

// var NOAA = L.WMS.source("https://gis.ngdc.noaa.gov/arcgis/services/web_mercator/undersea_features/MapServer/WMSServer", optionsNOAA);

var NOAA = L.WMS.source("https://gis.ngdc.noaa.gov/arcgis/services/IHO/undersea_features/MapServer/WMSServer", optionsNOAA);

// 1.2 Brazil

// IBGE WMS Layers Source

var optionsIBGE = {
  'format': 'image/png', 
  'transparent': true, 
  'opacity': 0.5,
  'info_format': 'text/html'
};

var IBGE = L.WMS.source("https://geoservicos.ibge.gov.br/geoserver/ows", optionsIBGE);

// 1.3 Argentina

// IGN WMS Layers Source

var optionsIGN = {
  'format': 'image/png', 
  'version': '1.3.0',
  'transparent': true, 
  'opacity': 0.5,
  'info_format': 'text/html'
};
  
var IGN = L.WMS.source("https://wms.ign.gob.ar/geoserver/ows", optionsIGN);

// 1.4 Uruguay

var optionsDINAMA = {
  'version': '1.3.0',
  'format': 'image/png', 
  'transparent': true, 
  'opacity': 1,
  'info_format': 'text/html'
};

var DINAMA = L.WMS.source("https://www.dinama.gub.uy/geoserver/u19600217/wms", optionsDINAMA);

// 2. WFS Sources

// 2.1 Generic

// Marine Regions WFS Source

function marineRegions(name, sql_text){
                
  var owsrootUrl = 'https://geo.vliz.be/geoserver/MarineRegions/wfs';
  
  var defaultParameters = {
      service : 'WFS',
      version : '2.0',
      request : 'GetFeature',
      typeName : name,
      outputFormat : 'application/json',
      format_options : 'callback:getJson',
      SrsName : 'EPSG:4326',
      cql_filter: sql_text,
  };
  
  var parameters = L.Util.extend(defaultParameters);
  var URL = owsrootUrl + L.Util.getParamString(parameters);
  
  return URL;
}

// 2.2 Brazil

function ibge(name){
  
  var owsrootUrl = 'https://geoservicos.ibge.gov.br/geoserver/ows';
  
  var defaultParameters = {
      service : 'WFS',
      version : '2.0',
      request : 'GetFeature',
      typeName : name,
      outputFormat : 'application/json',
      format_options : 'callback:getJson',
      SrsName : 'EPSG:4326'
  };
  
  var parameters = L.Util.extend(defaultParameters);
  var URL = owsrootUrl + L.Util.getParamString(parameters);
  
  return URL;
}

// 2.3 Argentina

function ign(name){
  
  var owsrootUrl = 'https://wms.ign.gob.ar/geoserver/wfs';
  
  var defaultParameters = {
      service : 'WFS',
      version : '2.0',
      request : 'GetFeature',
      typeName : name,
      outputFormat : 'application/json',
      format_options : 'callback:getJson',
      SrsName : 'EPSG:4674'
  };
  
  var parameters = L.Util.extend(defaultParameters);
  var URL = owsrootUrl + L.Util.getParamString(parameters);
  
  return URL;
}

// 2.4 Uruguay

/* This works in browser:
https://srvgis.igm.gub.uy/arcgis/services/LimitesNacionalesMarinos_wfs_250000/MapServer/WFSServer?service=wfs&request=GetFeature&typeName=LimitesNacionalesMarinos_wfs_250000:LimitesNacionalesMarinos_wfs_250000&outputFormat=GEOJSON
*/
function igm(name){
              
  var owsrootUrl = 'https://srvgis.igm.gub.uy/arcgis/services/LimitesNacionalesMarinos_wfs_250000/MapServer/WFSServer';
  
  var defaultParameters = {
      service : 'WFS',
      version : '2.0.0',
      request : 'GetFeature',
      typeNames : name,
      outputFormat : 'GEOJSON',
      format_options : 'callback:getJson',
      srsname : 'EPSG:4326',
      IgnoreAxisOrientation: '1',
      pagingEnabled: 'true',
      pageSize: 0
  };
  
  var parameters = L.Util.extend(defaultParameters);
  var URL = owsrootUrl + L.Util.getParamString(parameters);
  
  return URL;
}

function dinama(name, filter){
  
  var owsrootUrl = 'https://www.dinama.gub.uy/geoserver/u19600217/wms';
  
  var defaultParameters = {
      service : 'WFS',
      version : '1.1.0',
      request : 'GetFeature',
      typeName : name,
      outputFormat : 'text/javascript',
      format_options : 'callback:getJson',
      SrsName : 'EPSG:4326',
      CQL_FILTER: filter
  };
  
  var parameters = L.Util.extend(defaultParameters);
  var URL = owsrootUrl + L.Util.getParamString(parameters);
  
  return URL;
}

// Other helper functions

function link(feature){
  return "<a href= http://www.marineregions.org/gazetteer.php?p=details&id=" + 
  feature.properties.MRGID + " target='_blank'>Link.</a>"; 
}

function link1(feature){
  return "<a href= http://www.marineregions.org/gazetteer.php?p=details&id=" + 
  feature.properties.mrgid + " target='_blank'>Link.</a>"; 
}

function surface(feature){
  return feature.properties.SURFACE/1000000;
}

// Computes area with turf.js in sq. meters and transform to sq. kilometers.

function Area(feature){
  return turf.area(feature)/1000000;
}

function getAreaColor(feature){
  console.log(feature);
  	switch (feature.properties.POL_TYPE){
    	case '200NM' : return '#133863';
    	case 'Joint regime': return 'Gold';
      case 'Overlapping claim' : return 'Red';
      	break;
    }
}
  
function areaStyle(feature){
	return {
  	fillColor: getAreaColor(feature),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.40
  };
}