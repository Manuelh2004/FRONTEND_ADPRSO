import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Carou1 from "../../Imagenes/carou1.jpg";  

const CarruselEventos = () => {
  return (
      <section className="bg-gray-100 py-10 px-4">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Nuestros eventos pasados</h2>
<div className="w-full max-w-[700px] mx-auto">
  <Carousel
    autoPlay
    infiniteLoop
    showThumbs={false}
    showStatus={false}
    showArrows={true}
    className="rounded-xl shadow-lg"
  >
    {/* Slide 1 */}
    <div className="flex flex-col items-center">
      <div className="w-full h-[250px]">
        <img
          src={Carou1}
          alt="Perrito en adopción"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <p className="mt-2 text-center text-lg font-semibold text-blue-800">
        Campaña de vacunación
      </p>
    </div>

    {/* Slide 2 */}
    <div className="flex flex-col items-center">
      <div className="w-full h-[250px]">
        <img
          src="/imagenes/evento2.jpg"
          alt="Voluntariado en albergue"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <p className="mt-2 text-center text-lg font-semibold text-blue-800">
        Voluntariado en albergue
      </p>
    </div>

    {/* Slide 3 */}
    <div className="flex flex-col items-center">
      <div className="w-full h-[250px]">
        <img
          src="/imagenes/evento3.jpg"
          alt="Jornada de adopciones"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <p className="mt-2 text-center text-lg font-semibold text-blue-800">
        Jornada de adopciones
      </p>
    </div>
  </Carousel>
</div>

      </section>
  );
};

export default CarruselEventos;
