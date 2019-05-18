import React from 'react'
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'

export default ({ container_locations, position }) => (
  <div className="App">
    <Map center={position} zoom={14} width={900} height={900}>
      {container_locations.map(location => (
        <Marker anchor={location} />
      ))}
    </Map>
  </div>
)
