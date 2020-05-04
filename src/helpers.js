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