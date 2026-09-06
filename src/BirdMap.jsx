import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function BirdMap({ places }) {
  const validPlaces = places.filter((p) => p.lat && p.lng)
  if (validPlaces.length === 0) return null

  const center = [validPlaces[0].lat, validPlaces[0].lng]

  return (
    <div className="observation-map">
      <MapContainer center={center} zoom={11} style={{ height: '260px', width: '100%', borderRadius: '12px' }}>
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {validPlaces.map((place) => (
          <Marker key={place.name} position={[place.lat, place.lng]}>
            <Popup>
              <strong>{place.name}</strong>
              <br />
              {place.note}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default BirdMap