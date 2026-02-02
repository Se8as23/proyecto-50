import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import ICONO_MAIL from './assets/mail.png';

function App() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const targetDate = new Date("May 15, 2026 20:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      setShowContent(true);
      setTimeout(() => AOS.refresh(), 100);
    }, 800);
  };

  return (
    <div className="app-wrapper">
      {!showContent && (
        <div className={`envelope-overlay ${isOpen ? 'fade-out' : ''}`} onClick={handleOpen}>
          <div style={{textAlign: 'center'}}>
            <div className="envelope">
              <div className="wax-seal-gold">50</div>
            </div>
            <p className="hint-gold">TOCA PARA ABRIR</p>
          </div>
        </div>
      )}

      {showContent && (
        <div className="main-container">
          <section className="hero-section">
            <p data-aos="fade-down">CELEBREMOS LOS</p>
            <h1 className="cursive-name" data-aos="zoom-in">Cecy Mendez</h1>
            <div className="gold-divider"></div>
            <p data-aos="fade-up">15 · MAYO · 2026</p>
          </section>

          <section>
            <div className="luxury-card" data-aos="fade-up">
              <h2 style={{fontFamily: 'Cinzel', color: 'var(--gold)', marginBottom: '20px'}}>Una Noche de Gala</h2>
              <p style={{lineHeight: '1.8', color: '#eee'}}>
                Acompañame a celebrar medio siglo de vida. 
                Será un honor contar con tu presencia en esta fecha tan especial.
              </p>
            </div>
          </section>

          <section>
            <div className="luxury-card" data-aos="fade-up">
              <h2 style={{fontFamily: 'Cinzel', color: 'var(--gold)', marginBottom: '20px'}}>Lugar y Hora</h2>
              <p style={{fontSize: '1.2rem', marginBottom: '10px'}}><b>Salón de Eventos "La Gala"</b></p>
              <p>Vía Principal, Cuenca - Ecuador</p>
              <p style={{fontSize: '1.1rem', color: 'var(--gold-light)', marginTop: '10px'}}>20H00</p>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="btn-gold-action">VER UBICACIÓN</a>
            </div>
          </section>

          <section>
            <div className="luxury-card" data-aos="zoom-in">
              <h2 style={{fontFamily: 'Cinzel', color: 'var(--gold)', marginBottom: '20px'}}>Obsequios</h2>
              <img src={ICONO_MAIL} alt="Buzón" className="mailbox-icon-gold" />
              <p style={{lineHeight: '1.8', color: '#eee'}}>
                Tu presencia es mi mejor regalo, pero si deseas tener un detalle, 
                contaremos con <b>Buzón de Sobres</b> en la entrada del salón.
              </p>
            </div>
          </section>

          <section>
            <div className="luxury-card" data-aos="fade-up" style={{borderStyle: 'dashed'}}>
              <h2 style={{fontFamily: 'Cinzel', color: 'var(--gold)', marginBottom: '20px'}}>Confirmación</h2>
              <p>Por favor, confírmanos tu presencia antes del 1 de mayo.</p>
              <a href="https://wa.me/593XXXXXXXXX?text=Hola%20Cecy,%20confirmo%20mi%20asistencia." target="_blank" rel="noreferrer" className="btn-gold-action">CONFIRMAR ASISTENCIA</a>
            </div>
          </section>

          <section data-aos="fade-up">
            <h2 style={{fontFamily: 'Cinzel', color: 'var(--gold)', marginBottom: '30px'}}>Faltan:</h2>
            <div style={{display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap'}}>
              <div className="time-box"><span>{timeLeft.days}</span><p>Días</p></div>
              <div className="time-box"><span>{timeLeft.hours}</span><p>Hs</p></div>
              <div className="time-box"><span>{timeLeft.minutes}</span><p>Min</p></div>
              <div className="time-box"><span>{timeLeft.seconds}</span><p>Seg</p></div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;