import { useEffect, useRef, useState } from 'react'
import './App.css'
import 'leaflet/dist/leaflet.css'
import './leafletIcons'
import BirdMap from './BirdMap'

import avesEntreNosotrosImage from './assets/aves-entre-nosotros.png'
import uaoLogo from './assets/uao-logo.png'
import atrapamoscasImage from './assets/birds/atrapamoscas-pechirrojo.jpg'
import bichofueImage from './assets/birds/bichofue-griton.jpg'
import colibriImage from './assets/birds/colibri-cola-canela.jpg'
import mieleroImage from './assets/birds/mielero-comun.jpg'

const birds = [
  {
    commonName: 'Atrapamoscas pechirrojo',
    aliases: 'También llamado titiribí pechirrojo',
    scientificName: 'Pyrocephalus rubinus',
    englishName: 'Vermilion Flycatcher',
    conservation: 'Preocupación Menor (LC)',
    size: '13–14 cm de longitud; 11–14 g aprox.',
    habitat:
      'Áreas abiertas, parques, jardines, bordes de bosque y ambientes ribereños. En Cali está incluido entre las aves que necesitan espacios de naturaleza.',
    caliStatus: 'Necesita espacios de naturaleza',
    description:
      'Pequeño atrapamoscas de hábitats abiertos. El macho adulto presenta rojo intenso en la corona y las partes inferiores; se alimenta principalmente de insectos que captura desde perchas expuestas.',
    image: atrapamoscasImage,
    imagePosition: '48% center',
    photographer: 'Alejandro Bayer Tamayo',
    license: 'CC BY-SA 2.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Pyrocephalus_rubinus_(Petirrojo,_Pechirrojo,_Cardenal)_-_Macho_adulto_(14294083895).jpg',
    videoEmbed: 'https://www.youtube.com/embed/_8kToUL0MjE',
    videoTitle: 'Vermilion Flycatcher (Pyrocephalus rubinus)',
    videoSource: 'YouTube',
    videoSourceUrl: 'https://www.youtube.com/watch?v=_8kToUL0MjE',
    audioEmbed: 'https://macaulaylibrary.org/audio/188210',
    audioTitle: 'Vermilion Flycatcher — canto',
    audioSource: 'Macaulay Library · ML188210',
    audioSourceUrl: 'https://macaulaylibrary.org/asset/188210',
    observationLevel: 'Media',
    observationText:
      'Más favorable en espacios verdes y bordes abiertos; la guía de Cali la clasifica entre las especies que requieren espacios de naturaleza.',
    places: [
      {
        name: 'Ecoparque Río Pance',
        note: 'Vegetación ribereña y áreas suburbanas con alta diversidad de aves.',
        url: 'https://ecopedia.cvc.gov.co/node/363',
            lat: 3.3325, // aproximado (sector Pance, km 12-15 vía La Vorágine)
          lng: -76.5563,
      },
      {
     name: 'Zoológico de Cali / Bosque Municipal',
      note: 'Bosque a orillas del río Cali con amplias zonas abiertas y arboladas dentro de la ciudad.',
        url: 'https://www.zoologicodecali.com.co/',
    lat: 3.4486, // verificado (Wikipedia: 3°26'55"N 76°33'31"W)
    lng: -76.5586,
      },
    ],
    sources: [
      { label: 'eBird / Cornell Lab', url: 'https://ebird.org/species/verfly' },
      { label: 'Guía ilustrada de aves de Cali — CVC', url: 'https://ecopedia.cvc.gov.co/sites/default/files/archivosAdjuntos/libro_de_aves_de_cali.pdf' },
      { label: 'Universidad Icesi — Aves de Cali', url: 'https://www.icesi.edu.co/editorial/aves-de-cali/' },
      { label: 'Cornell Lab — Aves de Sibundoy', url: 'https://www.birds.cornell.edu/latam/wp-content/uploads/2023/09/Aves-de-sibundoy-2014-1.pdf' },
    ],
  },
  {
    commonName: 'Colibrí cola canela',
    scientificName: 'Amazilia tzacatl',
    englishName: 'Rufous-tailed Hummingbird',
    conservation: 'Preocupación Menor (LC)',
    size: '10–12 cm de longitud; aprox. 5,2 g.',
    habitat:
      'Bordes de bosque húmedo, vegetación secundaria, claros, jardines y plantaciones. En Colombia puede encontrarse desde tierras bajas hasta zonas andinas.',
    caliStatus: 'Necesita espacios de naturaleza',
    description:
      'Colibrí mediano de color verde con cola canela. Visita flores y comederos, y cumple un papel importante como polinizador mientras también consume pequeños insectos.',
    image: colibriImage,
    imagePosition: '55% center',
    photographer: 'Jerry Oldenettel',
    license: 'CC BY-SA 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Amazilia_tzacatl.jpg',
    videoEmbed: 'https://www.youtube.com/embed/0O8AFZpI94Q',
    videoTitle: 'Rufous-tailed Hummingbird — Amazilia tzacatl — Colombia',
    videoSource: 'YouTube · Bogota Birding & Colombia Wildlife Tours',
    videoSourceUrl: 'https://www.youtube.com/watch?v=0O8AFZpI94Q',
    audioEmbed: 'https://xeno-canto.org/862598/embed',
    audioTitle: 'Rufous-tailed Hummingbird — llamada',
    audioSource: 'Xeno-canto · XC862598',
    audioSourceUrl: 'https://xeno-canto.org/862598',
    observationLevel: 'Media-Alta',
    observationText:
      'Hay registros en Valle del Cauca y la especie forma parte de las aves de Cali asociadas a espacios de naturaleza.',
    places: [
      {
        name: 'Ecoparque Río Pance',
        note: 'Bosques suburbanos, vegetación ribereña y claros favorables para colibríes.',
        url: 'https://ecopedia.cvc.gov.co/node/363',
            lat: 3.3325, // aproximado
    lng: -76.5563,
      },
      {
        name: 'Lago Universidad del Valle (Campus Meléndez)',
    note: 'Zonas verdes y jardines con floración constante, frecuentadas por colibríes dentro del campus.',
    url: 'https://www.univalle.edu.co/',
    lat: 3.3750, // verificado (Wikipedia)
    lng: -76.5345,
      },
    ],
    sources: [
      { label: 'eBird / Cornell Lab', url: 'https://ebird.org/species/rtlhum' },
      { label: 'Animal Diversity Web', url: 'https://animaldiversity.org/accounts/Amazilia_tzacatl/' },
      { label: 'Universidad Icesi — Aves de Cali', url: 'https://www.icesi.edu.co/editorial/aves-de-cali/' },
      { label: 'Macaulay Library — registros en Colombia', url: 'https://media.ebird.org/es-ES/catalog?birdOnly=true&mediaType=photo&regionCode=CO&taxonCode=rtlhum&view=list' },
    ],
  },
  {
    commonName: 'Bichofué gritón',
    scientificName: 'Pitangus sulphuratus',
    englishName: 'Great Kiskadee',
    conservation: 'Preocupación Menor (LC)',
    size: '21–26 cm de longitud.',
    habitat:
      'Ambientes abiertos, zonas rurales y urbanas, parques, matorrales, arboledas y bordes de ríos o lagos. Es especialmente adaptable a paisajes urbanos.',
    caliStatus: 'Aprovecha recursos urbanos',
    description:
      'Tirano grande y muy visible, con pecho amarillo, cabeza negra y blanca y dorso pardo. Es omnívoro y consume insectos, frutos, pequeños vertebrados y ocasionalmente peces.',
    image: bichofueImage,
    imagePosition: '45% center',
    photographer: 'Donald Hobern',
    license: 'CC BY 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Pitangus_sulphuratus_(30659959896).jpg',
    videoEmbed: 'https://www.youtube.com/embed/cqyJAYlSIyc',
    videoTitle: 'Bichofué — Pitangus sulphuratus — Colombia',
    videoSource: 'YouTube · Dayro Longas',
    videoSourceUrl: 'https://www.youtube.com/watch?v=cqyJAYlSIyc',
    audioEmbed: 'https://xeno-canto.org/593047/embed',
    audioTitle: 'Bichofué — canto registrado en Cali',
    audioSource: 'Xeno-canto · XC593047',
    audioSourceUrl: 'https://xeno-canto.org/593047',
    observationLevel: 'Alta',
    observationText:
      'Es una de las especies de Cali que aprovechan recursos urbanos y es común en ambientes abiertos; por ello es de las más fáciles de detectar.',
    places: [
      {
      name: 'Humedal Charco Azul',
    note: 'Humedal urbano en el oriente de Cali con más de 55 especies de aves registradas, entre ellas el bichofué.',
    url: 'https://www.cali.gov.co/dagma/publicaciones/167210/humedal-charco-azul-un-lugar-ideal-para-el-avistamiento-de-aves-en-el-oriente-de-cali/',
    lat: 3.4550, // aproximado (Av. Ciudad de Cali, Comuna 13, sector oriente)
    lng: -76.4950,
      },
      {
    name: 'Zoológico de Cali / Bosque Municipal',
    note: 'Especie muy adaptable a ambientes urbanos arbolados y cercanos a cuerpos de agua.',
    url: 'https://www.zoologicodecali.com.co/',
    lat: 3.4486, // verificado
    lng: -76.5586,
      },
    ],
    sources: [
      { label: 'eBird / Cornell Lab', url: 'https://ebird.org/species/grekis' },
      { label: 'Animal Diversity Web', url: 'https://animaldiversity.org/accounts/Pitangus_sulphuratus/' },
      { label: 'Universidad Icesi — Aves de Cali', url: 'https://www.icesi.edu.co/editorial/aves-de-cali/' },
      { label: 'SIB Colombia / Parques Nacionales', url: 'https://sib.gob.ar/especies/Pitangus-sulphuratus' },
    ],
  },
  {
    commonName: 'Mielero común',
    scientificName: 'Coereba flaveola',
    englishName: 'Bananaquit',
    conservation: 'Preocupación Menor (LC)',
    size: 'Aproximadamente 11 cm de longitud.',
    habitat:
      'Zonas tropicales con cobertura vegetal: jardines, áreas abiertas con arbustos, bosques secundarios y bordes de bosque. En Cali está clasificado entre las aves que necesitan espacios de naturaleza.',
    caliStatus: 'Necesita espacios de naturaleza',
    description:
      'Ave pequeña, activa y de pico curvado. Busca principalmente néctar en flores, además de frutos y pequeños insectos; suele moverse sola, en pareja o en pequeños grupos.',
    image: mieleroImage,
    imagePosition: 'center',
    photographer: 'Félix Uribe',
    license: 'CC BY-SA 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Coereba_flaveola_Mielero_com%C3%BAn_Bananaquit_(9765564882).jpg',
    videoEmbed: 'https://www.youtube.com/embed/EHm0Q7ZQHcM',
    videoTitle: 'Bananaquits — Coereba flaveola — Colombia',
    videoSource: 'YouTube · Birdfun',
    videoSourceUrl: 'https://www.youtube.com/watch?v=EHm0Q7ZQHcM',
    audioEmbed: 'https://xeno-canto.org/830531/embed',
    audioTitle: 'Mielero común — canto registrado en Palmira, Valle del Cauca',
    audioSource: 'Xeno-canto · XC830531',
    audioSourceUrl: 'https://xeno-canto.org/830531',
    observationLevel: 'Media-Alta',
    observationText:
      'Es abundante y de hábitos adaptables, pero para esta guía se priorizan los espacios naturales y jardines con flores.',
    places: [
      {
    name: 'Ecoparque Río Pance',
    note: 'Bosques secundarios y jardines con arbustos florecidos, hábitat típico de esta especie nectarívora.',
    url: 'https://ecopedia.cvc.gov.co/node/363',
    lat: 3.3325, // aproximado
    lng: -76.5563,
      },
      {
    name: 'Lago Universidad del Valle (Campus Meléndez)',
    note: 'Zonas verdes con flora ornamental que atrae aves nectarívoras dentro del campus universitario.',
    url: 'https://www.univalle.edu.co/',
    lat: 3.3750, // verificado
    lng: -76.5345,
      },
    ],
    sources: [
      { label: 'eBird / Cornell Lab', url: 'https://ebird.org/species/banana' },
      { label: 'Cornell Lab — All About Birds', url: 'https://www.allaboutbirds.org/guide/Bananaquit/lifehistory' },
      { label: 'Universidad Icesi — Aves de Cali', url: 'https://www.icesi.edu.co/editorial/aves-de-cali/' },
      { label: 'Animal Diversity Web', url: 'https://animaldiversity.org/accounts/Coereba_flaveola/' },
    ],
  },
]

const fallingLeaves = [
  { left: '3%', delay: '-8s', duration: '15s', drift: '8rem', sway: '-2rem', scale: '0.72' },
  { left: '10%', delay: '-2s', duration: '13s', drift: '-6rem', sway: '3rem', scale: '0.52' },
  { left: '18%', delay: '-11s', duration: '17s', drift: '5rem', sway: '-4rem', scale: '0.9' },
  { left: '27%', delay: '-5s', duration: '14s', drift: '-8rem', sway: '2rem', scale: '0.62' },
  { left: '35%', delay: '-14s', duration: '18s', drift: '7rem', sway: '-3rem', scale: '0.78' },
  { left: '43%', delay: '-1s', duration: '16s', drift: '-5rem', sway: '4rem', scale: '0.48' },
  { left: '51%', delay: '-9s', duration: '14s', drift: '9rem', sway: '-2rem', scale: '0.84' },
  { left: '59%', delay: '-4s', duration: '17s', drift: '-7rem', sway: '3rem', scale: '0.58' },
  { left: '66%', delay: '-13s', duration: '15s', drift: '6rem', sway: '-4rem', scale: '0.74' },
  { left: '73%', delay: '-6s', duration: '18s', drift: '-9rem', sway: '2rem', scale: '0.92' },
  { left: '80%', delay: '-16s', duration: '19s', drift: '5rem', sway: '-3rem', scale: '0.55' },
  { left: '87%', delay: '-3s', duration: '14s', drift: '-6rem', sway: '4rem', scale: '0.7' },
  { left: '93%', delay: '-10s', duration: '16s', drift: '7rem', sway: '-2rem', scale: '0.82' },
  { left: '23%', delay: '-17s', duration: '20s', drift: '-5rem', sway: '3rem', scale: '0.46' },
  { left: '62%', delay: '-7s', duration: '19s', drift: '8rem', sway: '-4rem', scale: '0.66' },
]

function FallingLeaves() {
  return (
    <div id="leaves" aria-hidden="true">
      {fallingLeaves.map((leaf, index) => (
        <i
          key={index}
          style={{
            '--leaf-left': leaf.left,
            '--leaf-delay': leaf.delay,
            '--leaf-duration': leaf.duration,
            '--leaf-drift': leaf.drift,
            '--leaf-sway': leaf.sway,
            '--leaf-scale': leaf.scale,
          }}
        />
      ))}
    </div>
  )
}

function BirdCard({ bird, isSelected, number, onSelect }) {
  const cardRef = useRef(null)
  const leaveTimer = useRef(null)
  const [transform, setTransform] = useState({ x: 0, y: 0 })

  useEffect(
    () => () => {
      window.clearTimeout(leaveTimer.current)
    },
    [],
  )

  const handleMouseMove = (event) => {
    const bounds = cardRef.current.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5

    setTransform({ x, y })
  }

  const resetCard = () => {
    leaveTimer.current = window.setTimeout(() => {
      setTransform({ x: 0, y: 0 })
    }, 500)
  }

  const cancelReset = () => window.clearTimeout(leaveTimer.current)

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelect(bird)
    }
  }

  return (
    <article
      className={`bird-card-wrap${isSelected ? ' bird-card-wrap--selected' : ''}`}
      onClick={() => onSelect(bird)}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseEnter={cancelReset}
      onMouseLeave={resetCard}
      onFocus={cancelReset}
      onBlur={resetCard}
      ref={cardRef}
      style={{
        '--rotate-x': `${transform.y * -20}deg`,
        '--rotate-y': `${transform.x * 20}deg`,
        '--move-x': `${transform.x * -26}px`,
        '--move-y': `${transform.y * -26}px`,
        viewTransitionName: `bird-card-${number}`,
      }}
      tabIndex="0"
    >
      <div className="bird-card">
        <div
          aria-hidden="true"
          className="bird-card__image"
          style={{
            backgroundImage: `url(${bird.image})`,
            backgroundPosition: bird.imagePosition,
          }}
        />

        <div className="bird-card__shade" aria-hidden="true" />

        <div className="bird-card__topline" aria-hidden="true">
          <span>AVE</span>
          <span>{String(number).padStart(2, '0')}</span>
        </div>

        <div className="bird-card__info">
          {bird.aliases && <p className="bird-card__alias">{bird.aliases}</p>}
          <h2
            className={
              bird.commonName === 'Atrapamoscas pechirrojo'
                ? 'bird-card__title--wide'
                : undefined
            }
          >
            {bird.commonName}
          </h2>
          <p className="bird-card__scientific">
            <i>{bird.scientificName}</i>
          </p>
          <p className="bird-card__description">{bird.description}</p>
          <a
            className="bird-card__credit"
            href={bird.source}
            onClick={(event) => event.stopPropagation()}
            target="_blank"
            rel="noreferrer"
            aria-label={`Ver la fuente de la fotografía de ${bird.commonName}`}
          >
            Foto: {bird.photographer} · {bird.license}
            <span aria-hidden="true"> ↗</span>
          </a>
        </div>
      </div>
    </article>
  )
}

function BirdDetails({ bird, isOpen, onBack }) {
  return (
    <aside
      aria-hidden={!isOpen}
      aria-label={`Ficha de ${bird.commonName}`}
      className={`bird-details${isOpen ? ' bird-details--open' : ''}`}
    >
      <div className="bird-details__inner">
        <div className="bird-details__heading">
          <div>
            <p className="eyebrow">Ficha de la especie</p>
            <h2>{bird.commonName}</h2>
            <p><i>{bird.scientificName}</i></p>
          </div>
          <button
            className="back-button"
            onClick={onBack}
            tabIndex={isOpen ? 0 : -1}
            type="button"
          >
            <span aria-hidden="true">←</span>
            Volver a las tarjetas
          </button>
        </div>

        <div className="bird-details__content">
          <section className="detail-section detail-section--profile">
            <h3>Información general</h3>
            <dl className="bird-facts">
              <div><dt>Nombre común</dt><dd>{bird.commonName}</dd></div>
              <div><dt>Nombre científico</dt><dd><i>{bird.scientificName}</i></dd></div>
              <div><dt>Nombre en inglés</dt><dd>{bird.englishName}</dd></div>
              <div><dt>Condición</dt><dd>{bird.conservation}</dd></div>
              <div><dt>Tamaño aproximado</dt><dd>{bird.size}</dd></div>
              <div><dt>Hábitat</dt><dd>{bird.habitat}</dd></div>
              <div><dt>Situación en Cali</dt><dd>{bird.caliStatus}</dd></div>
            </dl>
          </section>

          <section className="detail-section detail-section--video">
            <h3>Video</h3>
            <div className="media-embed">
              <iframe
                src={bird.videoEmbed}
                title={bird.videoTitle}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <a className="media-credit" href={bird.videoSourceUrl} target="_blank" rel="noreferrer">
              {bird.videoTitle} · {bird.videoSource} ↗
            </a>
          </section>

          <section className="detail-section detail-section--audio">
            <h3>Canto o vocalización</h3>
            <div className="media-embed media-embed--audio">
              <iframe
                src={bird.audioEmbed}
                title={bird.audioTitle}
                loading="lazy"
                allow="autoplay"
              />
            </div>
            <a className="media-credit" href={bird.audioSourceUrl} target="_blank" rel="noreferrer">
              {bird.audioTitle} · {bird.audioSource} ↗
            </a>
          </section>


<section className="detail-section">
  <h3>¿Dónde observarla en Cali?</h3>
  <BirdMap places={bird.places} />
  <div className="observation-places">
    {bird.places.map((place) => (
      <a key={place.name} className="observation-place" href={place.url} target="_blank" rel="noreferrer">
        <strong>{place.name}</strong>
        <span>{place.note}</span>
        <small>Consultar información del sitio ↗</small>
      </a>
    ))}
  </div>
</section>
          <section className="detail-section">
            <h3>Probabilidad de avistamiento</h3>
            <div className="sighting-summary">
              <strong>{bird.observationLevel}</strong>
              <p>{bird.observationText}</p>
            </div>
          </section>

          <section className="detail-section">
            <h3>Horario recomendado</h3>
            <p className="detail-section__empty">
              <strong>06:00–09:00 a. m.</strong> es la franja recomendada para iniciar el recorrido, cuando la actividad de muchas aves es mayor. Para especies de espacios naturales conviene comenzar temprano y recorrer senderos con calma.
            </p>
          </section>

          <section className="detail-section">
            <h3>Fuentes y créditos</h3>
            <div className="source-list">
              {bird.sources.map((source) => (
                <a key={source.label} href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>
              ))}
              <p>Fotografía: {bird.photographer} · {bird.license} · Wikimedia Commons.</p>
            </div>
          </section>
        </div>
      </div>
    </aside>
  )
}
function App() {
  const [isGalleryVisible, setIsGalleryVisible] = useState(false)
  const [selectedBird, setSelectedBird] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const closeTimer = useRef(null)

  useEffect(
    () => () => window.clearTimeout(closeTimer.current),
    [],
  )

  const updateView = (callback) => {
    if (typeof document.startViewTransition === 'function') {
      document.startViewTransition(callback)
      return
    }

    callback()
  }

  const selectBird = (bird) => {
    window.clearTimeout(closeTimer.current)
    updateView(() => {
      setSelectedBird(bird)
      setIsDetailOpen(true)
    })
  }

  const closeDetails = () => {
    setIsDetailOpen(false)
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => {
      updateView(() => setSelectedBird(null))
    }, 360)
  }

  const scrollToSection = (sectionId) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        document.getElementById(sectionId)?.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          block: 'start',
        })
      })
    })
  }

  const showGallery = () => {
    window.clearTimeout(closeTimer.current)
    updateView(() => {
      setIsGalleryVisible(true)
      setIsDetailOpen(false)
      setSelectedBird(null)
    })
    scrollToSection('aves')
  }

  const showHome = () => {
    window.clearTimeout(closeTimer.current)
    updateView(() => {
      setIsGalleryVisible(false)
      setIsDetailOpen(false)
      setSelectedBird(null)
    })
    scrollToSection('inicio')
  }

  return (
    <div className="site-shell">
      <header className="site-header" id="inicio">
        <a className="site-header__brand" href="#inicio" aria-label="Ir al inicio">
          <img aria-hidden="true" src={uaoLogo} alt="" />
          <span>Aves de Cali</span>
        </a>
        <p>Proyecto académico</p>
      </header>

      <nav className="site-nav" aria-label="Navegación principal">
        <a
          aria-current={!isGalleryVisible ? 'page' : undefined}
          href="#inicio"
          onClick={(event) => {
            event.preventDefault()
            showHome()
          }}
        >
          Inicio
        </a>
        <a
          aria-current={isGalleryVisible ? 'page' : undefined}
          href="#aves"
          onClick={(event) => {
            event.preventDefault()
            showGallery()
          }}
        >
          Aves
        </a>
        <a href="#creditos">Créditos</a>
      </nav>

      <main className="birds-section">
        <div className="birds-section__glow" aria-hidden="true" />
        <FallingLeaves />

        {!isGalleryVisible && (
          <section className="birds-hero" aria-labelledby="gallery-title">
            <div className="birds-section__header">
              <p className="eyebrow">Guía de avistamiento · Cali</p>
              <h1 className="birds-section__title" id="gallery-title">
                <img
                  alt="Aves entre nosotros"
                  src={avesEntreNosotrosImage}
                />
              </h1>
              <p className="birds-section__intro">
                Acércate a cada tarjeta para descubrir cuatro especies que llenan de
                color y sonido nuestros paisajes.
              </p>
              <button
                aria-controls="aves"
                aria-expanded={isGalleryVisible}
                className="continue-button"
                onClick={showGallery}
                type="button"
              >
                Continuar
                <span aria-hidden="true">↓</span>
              </button>
            </div>
          </section>
        )}

        {isGalleryVisible && (
          <div className="bird-gallery" id="aves">
            <div className="birds-section__hint" aria-hidden="true">
              <span />
              Mueve el cursor sobre las tarjetas
              <span />
            </div>

            <section
              className={`bird-explorer${selectedBird ? ' bird-explorer--selected' : ''}`}
              aria-label="Galería de aves de Cali"
            >
              <div className="bird-grid">
                {birds.map((bird, index) => (
                  <BirdCard
                    bird={bird}
                    isSelected={selectedBird?.scientificName === bird.scientificName}
                    key={bird.scientificName}
                    number={index + 1}
                    onSelect={selectBird}
                  />
                ))}
              </div>

              {selectedBird && (
                <BirdDetails
                  bird={selectedBird}
                  isOpen={isDetailOpen}
                  onBack={closeDetails}
                />
              )}
            </section>

            <p className="birds-section__source-note">
              Fotografías de Wikimedia Commons. Consulta la autoría y licencia en
              cada tarjeta.
            </p>
          </div>
        )}
      </main>

      <footer className="site-footer" id="creditos">
        <p>Proyecto académico · Arquitectura de Sistemas Multimedia</p>
        <p>Santiago de Cali, Colombia</p>
      </footer>
    </div>
  )
}

export default App
