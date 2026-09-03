import { useEffect, useRef, useState } from 'react'
import './App.css'

import atrapamoscasImage from './assets/birds/atrapamoscas-pechirrojo.jpg'
import bichofueImage from './assets/birds/bichofue-griton.jpg'
import colibriImage from './assets/birds/colibri-cola-canela.jpg'
import mieleroImage from './assets/birds/mielero-comun.jpg'

const birds = [
  {
    commonName: 'Atrapamoscas pechirrojo',
    aliases: 'También llamado titiribí pechirrojo',
    scientificName: 'Pyrocephalus rubinus',
    description:
      'El macho destaca por su intenso plumaje rojo. Desde una percha visible emprende vuelos cortos para atrapar insectos.',
    image: atrapamoscasImage,
    imagePosition: '48% center',
    photographer: 'Alejandro Bayer Tamayo',
    license: 'CC BY-SA 2.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Pyrocephalus_rubinus_(Petirrojo,_Pechirrojo,_Cardenal)_-_Macho_adulto_(14294083895).jpg',
  },
  {
    commonName: 'Colibrí cola canela',
    scientificName: 'Amazilia tzacatl',
    description:
      'Un colibrí verde de cola rojiza que visita flores y jardines. Su vuelo veloz lo convierte en un polinizador muy activo.',
    image: colibriImage,
    imagePosition: '55% center',
    photographer: 'Jerry Oldenettel',
    license: 'CC BY-SA 2.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Amazilia_tzacatl.jpg',
  },
  {
    commonName: 'Bichofué gritón',
    scientificName: 'Pitangus sulphuratus',
    description:
      'Se reconoce por el pecho amarillo y la cabeza blanca y negra. Su potente canto “bi-cho-fué” es común en zonas abiertas.',
    image: bichofueImage,
    imagePosition: '45% center',
    photographer: 'Donald Hobern',
    license: 'CC BY 2.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Pitangus_sulphuratus_(30659959896).jpg',
  },
  {
    commonName: 'Mielero común',
    scientificName: 'Coereba flaveola',
    description:
      'Pequeño y muy inquieto, usa su pico curvo para obtener néctar. También se alimenta de frutos y pequeños insectos.',
    image: mieleroImage,
    imagePosition: 'center',
    photographer: 'Félix Uribe',
    license: 'CC BY-SA 2.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Coereba_flaveola_Mielero_com%C3%BAn_Bananaquit_(9765564882).jpg',
  },
]

function BirdCard({ bird, number }) {
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

  return (
    <article
      className="bird-card-wrap"
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

function App() {
  return (
    <div className="site-shell">
      <header className="site-header" id="inicio">
        <a className="site-header__brand" href="#inicio" aria-label="Ir al inicio">
          Aves de Cali
        </a>
        <p>Proyecto académico</p>
      </header>

      <nav className="site-nav" aria-label="Navegación principal">
        <a href="#inicio">Inicio</a>
        <a href="#aves">Aves</a>
        <a href="#creditos">Créditos</a>
      </nav>

      <main className="birds-section" id="aves">
        <div className="birds-section__glow" aria-hidden="true" />

        <section className="birds-section__header" aria-labelledby="gallery-title">
          <p className="eyebrow">Guía de avistamiento · Cali</p>
          <h1 id="gallery-title">Aves que viven entre nosotros</h1>
          <p className="birds-section__intro">
            Acércate a cada tarjeta para descubrir cuatro especies que llenan de
            color y sonido nuestros paisajes.
          </p>
          <div className="birds-section__hint" aria-hidden="true">
            <span />
            Mueve el cursor sobre las tarjetas
            <span />
          </div>
        </section>

        <section className="bird-grid" aria-label="Galería de aves de Cali">
          {birds.map((bird, index) => (
            <BirdCard key={bird.scientificName} bird={bird} number={index + 1} />
          ))}
        </section>

        <p className="birds-section__source-note">
          Fotografías de Wikimedia Commons. Consulta la autoría y licencia en
          cada tarjeta.
        </p>
      </main>

      <footer className="site-footer" id="creditos">
        <p>Proyecto académico · Arquitectura de Sistemas Multimedia</p>
        <p>Santiago de Cali, Colombia</p>
      </footer>
    </div>
  )
}

export default App
