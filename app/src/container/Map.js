import MapComponent from '../components/Map'
import { drizzleConnect } from 'drizzle-react'

const mapStateToProps = state => {
  const container_locations = state.contracts.TrashReward.events
    .filter(entry => entry.event === 'ContainerAdded')
    .map(entry => [
      entry.returnValues[1] / 10000000,
      entry.returnValues[2] / 10000000
    ])

  let position = container_locations.length ? container_locations[0] : [0, 0]

  return {
    container_locations,
    position
  }
}

const MapContainer = drizzleConnect(MapComponent, mapStateToProps)

export default MapContainer
