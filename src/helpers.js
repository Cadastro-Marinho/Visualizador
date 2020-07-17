// IBGE WMS Layers Source

var optionsIBGE = {
  'format': 'image/png', 
  'transparent': true, 
  'opacity': 0.5,
  'info_format': 'text/html'
};

var IBGE = L.WMS.source("https://geoservicos.ibge.gov.br/geoserver/ows", optionsIBGE);

// IGN WMS Layers Source

  var optionsAR = {
  'format': 'image/png', 
  'version': '1.3.0',
  'transparent': true, 
  'opacity': 0.5,
  'info_format': 'text/html'
};
  
var IGN = L.WMS.source("https://wms.ign.gob.ar/geoserver/ows", optionsAR);

function igm(name){
              
  var owsrootUrl = 'https://srvgis.igm.gub.uy/arcgis/services/LimitesNacionalesMarinos_wfs_250000/MapServer/WFSServer';
  
  var defaultParameters = {
      service : 'WFS',
      version : '2.0.0',
      request : 'GetFeature',
      typeName : name,
      outputFormat : 'GEOJSON',
      format_options : 'callback:getJson',
      SrsName : 'EPSG:4326',
      IgnoreAxisOrientation: '1'
  };
  
  var parameters = L.Util.extend(defaultParameters);
  var URL = owsrootUrl + L.Util.getParamString(parameters);
  
  return URL;
}

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

function link(feature){
  return "<a href= http://www.marineregions.org/gazetteer.php?p=details&id=" + 
  feature.properties.MRGID + " target='_blank'>Link.</a>"; 
}

function surface(feature){
  return feature.properties.SURFACE/1000000;
}

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