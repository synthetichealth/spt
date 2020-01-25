import React from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import { useHistory } from "react-router-dom";

import ma_geo from '../ma_geo.json';

const StateMap = (props) => {
  const history = useHistory();
  const onEachFeature = function(feature, layer) {
    const props = feature.properties;
    const cityName = props.cs_name;
    layer.bindTooltip(`<b>${cityName}</b>`);
    layer.on({
        click: (e) =>  history.push(`/city/${cityName}`)
    });
  }

  const position = [42, -71.7];

  return (
    <Map center={position} zoom={8} style={{ height: '500px', width: '800px' }}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
        <GeoJSON 
          data={ma_geo}
          key={'changeme'} // set a key to ensure the geojson gets re-rendered correctly when we switch values
          onEachFeature={onEachFeature} 
          style={(f) => ({ color: '#ffffff', opacity: 0.8, fillOpacity: 0.75, fillColor: '#7f7fff' })}
          />
    </Map>
  )
};

export default StateMap;