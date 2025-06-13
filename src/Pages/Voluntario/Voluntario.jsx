import { Link } from "react-router-dom";
import logoFondo from "../../Imagenes/logo.jpeg";  

export default function BannerVoluntariado() {
  return (
    <>
      {/* --- Banner Hero (Imagen de fondo con overlay) --- */}
      <section
        className="relative h-96 md:h-screen max-h-[600px] flex items-center justify-center"
        style={{ backgroundImage: `url(${logoFondo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Overlay oscuro para mejorar legibilidad */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Contenido del banner */}
        <div className="relative z-10 text-center px-4 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            ¡<span className="text-amber-400">Salva una vida</span> hoy!
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Cada pequeño esfuerzo cuenta. Adopta, dona o únete como voluntario para cambiar destinos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/voluntariado"
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full text-lg transition transform hover:scale-105 shadow-lg"
            >
              Sé Voluntario
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}