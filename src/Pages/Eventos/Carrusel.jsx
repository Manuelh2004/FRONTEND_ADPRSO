import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarruselEventos = () => {
  return (
      <section className="bg-gray-100 py-10 px-4">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Nuestros eventos pasados</h2>
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
          <div>
            <img src="/imagenes/evento1.jpg" alt="Evento 1" />
            <p className="legend">Campaña de vacunación</p>
          </div>
          <div>
            <img src="/imagenes/evento2.jpg" alt="Evento 2" />
            <p className="legend">Voluntariado en albergue</p>
          </div>
          <div>
            <img src="/imagenes/evento3.jpg" alt="Evento 3" />
            <p className="legend">Jornada de adopciones</p>
          </div>
        </Carousel>
      </section>
  );
};

export default CarruselEventos;
