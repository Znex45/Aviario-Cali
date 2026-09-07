import { useEffect } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

const CALI_BIRDWATCHING_PLACES = [
  {
    name: 'Ecoparque Lago de las Garzas',
    note: 'Humedal urbano y sitio reconocido para observar aves en el sur de Cali.',
    url: 'https://www.cali.gov.co/dagma/publicaciones/168259/programate-para-disfrutar-de-los-ecoparques-de-cali/',
    lat: 3.3319,
    lng: -76.537,
  },
  {
    name: 'Humedal La Babilla – Zanjón del Burro',
    note: 'Humedal urbano que brinda refugio y alimento a numerosas aves locales.',
    url: 'https://idesc.cali.gov.co/download/turismo/recursos_zonas/RT-32-C22p.pdf',
    lat: 3.3625,
    lng: -76.5367,
  },
  {
    name: 'Parque del Ingenio',
    note: 'Parque urbano incluido por la CVC entre los lugares de avistamiento de aves de Cali.',
    url: 'https://ecopedia.cvc.gov.co/sites/default/files/archivosAdjuntos/libro_de_aves_de_cali.pdf',
    lat: 3.386,
    lng: -76.533,
  },
  {
    name: 'Jardín Botánico de Cali',
    note: 'Área natural junto al río Cali, con senderos y vegetación apropiada para observar aves.',
    url: 'https://www.cvc.gov.co/sites/default/files/2022-02/Plan%20de%20Ordenaci%C3%B3n%20y%20Manejo%20de%20la%20Cuenca%20Hidrogr%C3%A1fica%20del%20R%C3%ADo%20Cali.pdf',
    lat: 3.4531,
    lng: -76.5734,
  },
]

const normalizeName = (name) =>
  name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')

const createObservationIcon = (index) =>
  L.divIcon({
    className: 'bird-map-marker bird-map-marker--observation',
    html: `<span class="bird-map-marker__pin"><b class="bird-map-marker__label">${index + 1}</b></span>`,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -32],
  })

const referenceIcon = L.divIcon({
  className: 'bird-map-marker bird-map-marker--reference',
  html: '<span class="bird-map-marker__pin"><b class="bird-map-marker__label">•</b></span>',
  iconSize: [26, 26],
  iconAnchor: [13, 26],
  popupAnchor: [0, -24],
})

function FitMapToPlaces({ positions }) {
  const map = useMap()
  const positionKey = positions.flat().join(',')

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      map.invalidateSize()

      if (positions.length === 1) {
        map.setView(positions[0], 13)
        return
      }

      map.fitBounds(L.latLngBounds(positions), {
        padding: [28, 28],
        maxZoom: 13,
      })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [map, positionKey, positions])

  return null
}

function BirdMap({ places }) {
  const observationPlaces = places.filter(
    (place) => Number.isFinite(place.lat) && Number.isFinite(place.lng),
  )
  const observationNames = new Set(observationPlaces.map((place) => normalizeName(place.name)))
  const referencePlaces = CALI_BIRDWATCHING_PLACES.filter(
    (place) => !observationNames.has(normalizeName(place.name)),
  )
  const allPlaces = [...observationPlaces, ...referencePlaces]
  const positions = allPlaces.map((place) => [place.lat, place.lng])

  if (observationPlaces.length === 0) return null

  return (
    <div className="observation-map">
      <MapContainer
        className="observation-map__canvas"
        center={[3.4206, -76.5222]}
        zoom={11}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <FitMapToPlaces positions={positions} />

        {observationPlaces.map((place, index) => (
          <Marker
            key={place.name}
            position={[place.lat, place.lng]}
            icon={createObservationIcon(index)}
            alt={`Lugar ${index + 1}: ${place.name}`}
          >
            <Popup className="bird-map-popup">
              <span className="bird-map-popup__eyebrow">Lugar {index + 1} de la ficha</span>
              <strong>{place.name}</strong>
              <p>{place.note}</p>
              <a href={place.url} target="_blank" rel="noreferrer">
                Consultar información del sitio ↗
              </a>
            </Popup>
          </Marker>
        ))}

        {referencePlaces.map((place) => (
          <Marker
            key={place.name}
            position={[place.lat, place.lng]}
            icon={referenceIcon}
            alt={`Otro lugar de avistamiento: ${place.name}`}
          >
            <Popup className="bird-map-popup">
              <span className="bird-map-popup__eyebrow">Otro lugar de avistamiento en Cali</span>
              <strong>{place.name}</strong>
              <p>{place.note}</p>
              <a href={place.url} target="_blank" rel="noreferrer">
                Consultar fuente ↗
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="observation-map__legend" aria-label="Leyenda del mapa">
        <span>
          <i className="map-legend-dot map-legend-dot--observation" aria-hidden="true" />
          Lugares descritos para esta ave
        </span>
        <span>
          <i className="map-legend-dot map-legend-dot--reference" aria-hidden="true" />
          Otros lugares de avistamiento en Cali
        </span>
      </div>
      <p className="observation-map__note">
        Los puntos adicionales son zonas generales para observar aves; no indican por sí solos un
        registro confirmado de la especie seleccionada.
      </p>
    </div>
  )
}

export default BirdMap
