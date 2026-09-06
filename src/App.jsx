import { useEffect, useRef, useState } from 'react'
import './App.css'

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

function PendingText() {
  return <span className="pending-text">Pendiente por completar</span>
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
            <p>
              <i>{bird.scientificName}</i>
            </p>
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
              <div>
                <dt>Nombre común</dt>
                <dd><PendingText /></dd>
              </div>
              <div>
                <dt>Nombre científico</dt>
                <dd><PendingText /></dd>
              </div>
              <div>
                <dt>Nombre en inglés</dt>
                <dd><PendingText /></dd>
              </div>
              <div>
                <dt>Condición</dt>
                <dd><PendingText /></dd>
              </div>
              <div>
                <dt>Tamaño aproximado</dt>
                <dd><PendingText /></dd>
              </div>
              <div>
                <dt>Hábitat</dt>
                <dd><PendingText /></dd>
              </div>
            </dl>
          </section>

          <section className="detail-section detail-section--video">
            <h3>Video</h3>
            <div className="media-placeholder media-placeholder--video">
              <span aria-hidden="true">▶</span>
              <p>Video pendiente de agregar</p>
            </div>
          </section>

          <section className="detail-section detail-section--audio">
            <h3>Canto o vocalización</h3>
            <div className="media-placeholder media-placeholder--audio">
              <span aria-hidden="true">⌁</span>
              <p>Audio pendiente de agregar</p>
            </div>
          </section>

          <section className="detail-section">
            <h3>¿Dónde observarla en Cali?</h3>
            <div className="media-placeholder media-placeholder--map">
              <span aria-hidden="true">⌖</span>
              <p>Mapa de avistamientos pendiente de agregar</p>
            </div>
          </section>

          <section className="detail-section">
            <h3>Probabilidad de avistamiento</h3>
            <ul className="sighting-list">
              <li><span>Alta</span><PendingText /></li>
              <li><span>Media</span><PendingText /></li>
              <li><span>Baja</span><PendingText /></li>
            </ul>
          </section>

          <section className="detail-section">
            <h3>Horario recomendado</h3>
            <p className="detail-section__empty"><PendingText /></p>
          </section>

          <section className="detail-section">
            <h3>Fuentes y créditos</h3>
            <p className="detail-section__empty"><PendingText /></p>
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
