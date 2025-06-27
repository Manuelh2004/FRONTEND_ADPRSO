import { Link } from "react-router-dom";
import logoFondo from "../../Imagenes/logo3.jpg";  
import ListaEventos from "./ListaEventos";
import CarruselEventos from "./Carrusel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaWhatsapp } from 'react-icons/fa'; // Importamos el ícono de WhatsApp


export default function Eventos() {
  // Reemplaza con tu número de WhatsApp y el mensaje que deseas enviar
  const telefonoWhatsApp = "51922266310";  // Agrega tu número de WhatsApp aquí
  const mensaje = "¡Hola! Quiero saber más sobre los eventos y cómo ayudar."; // Mensaje predeterminado

  // Enlace a la API de WhatsApp
  const enlaceWhatsApp = `https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(mensaje)}`;
  return (
    <div style={{ backgroundColor: '#dbc7ad' }}>
      {/* --- Banner Hero (Imagen de fondo con overlay) --- */}
        <section
          className="relative h-96 md:h-screen max-h-[600px] flex items-center justify-center"
          style={{
            backgroundImage: `url(${logoFondo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
        {/* Contenido del banner */}
        <div className="relative z-10 text-center px-4 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            ¡<span className="text-amber-400">Salva una vida</span> hoy!
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-bold">
            Cada pequeño esfuerzo cuenta. Adopta, dona o únete como voluntario para cambiar destinos.
          </p>
        </div>
      </section>

      {/* --- Carrusel de eventos anteriores --- */}
      <section  className="py-10 px-0">
        <CarruselEventos/>
      </section>  

      {/* --- Lista de Eventos Activos --- */}
      <section className="py-10 px-4">
        <ListaEventos />
      </section>
        {/* --- Botón flotante de WhatsApp --- */}
          <a
            href={enlaceWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition z-50"
            title="Enviar mensaje por WhatsApp"
          >
            <FaWhatsapp size={30} />
          </a> 
    </div>
  );
}