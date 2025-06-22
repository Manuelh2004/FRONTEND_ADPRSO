import { Link } from "react-router-dom";
import logoFondo from "../../Imagenes/logo3.jpg";  
import ListaEventos from "./ListaEventos";
import CarruselEventos from "./Carrusel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function Eventos() {
  return (
    <>
      {/* --- Banner Hero (Imagen de fondo con overlay) --- */}
        <section
          className="relative h-96 md:h-screen max-h-[600px] flex items-center justify-center"
          style={{
            backgroundImage: `url(${logoFondo})`,  // ← backticks aquí
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
        {/* Overlay oscuro para mejorar legibilidad */}
        {/* <div className="absolute inset-0 bg-black opacity-50"></div>*/}

        {/* Contenido del banner */}
        <div className="relative z-10 text-center px-4 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            ¡<span className="text-amber-400">Salva una vida</span> hoy!
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Cada pequeño esfuerzo cuenta. Adopta, dona o únete como voluntario para cambiar destinos.
          </p>
        </div>
      </section>

      {/* --- Carrusel de eventos anteriores --- */}
      <section className="bg-gray-100 py-10 px-4">
        <CarruselEventos/>
      </section>  

      {/* --- Lista de Eventos Activos --- */}
      <section className="bg-gray-100 py-10 px-4">
        <ListaEventos />
      </section> 
    </>
  );
}