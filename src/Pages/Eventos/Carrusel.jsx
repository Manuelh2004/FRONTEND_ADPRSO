import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Evento1 from "../../Imagenes/Evento1.jpg";
import Evento2 from "../../Imagenes/Evento2.jpg";
import Evento3 from "../../Imagenes/Evento3.jpg";
import Evento4 from "../../Imagenes/Evento4.jpg";        

const CarruselEventos = () => {
  return (
      <section style={{ backgroundColor: '#9A6C3B' }} className="py-10">
        <h2 className="text-2xl font-bold text-center mb-6" style={{ color: '#F5F5DC' }}>Nuestros eventos pasados</h2>
          <div className="w-full">
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              showArrows={true}
              className="rounded-none"
              renderIndicator={(onClickHandler, isSelected, index, label) => {
                const style = {
                  marginLeft: 6,
                  color: isSelected ? '#F5F5DC' : '#888',
                  cursor: 'pointer',
                  fontSize: '2rem',
                  marginTop: '1rem', 
                  marginBottom: '1rem' 
                };
            return (
              <span
                style={style}
                onClick={onClickHandler}
                onKeyDown={onClickHandler}
                value={index}
                key={index}
                role="button"
                tabIndex={0}
              >
                •
              </span>
            );
          }}
          renderItem={(item, options) => <div {...options}>{item}</div>}
        >
            
          {/* Slide 1 */}
          <div className="flex flex-col items-center pb-12">
            <div className="w-full h-[400px] bg-beige flex items-center justify-center">
              <img
                src={Evento1}
                alt="Gran Rifa"
                className="max-h-full object-contain"
              />
            </div>
            <p className="mt-4 mt-2 text-center text-lg font-semibold" style={{ color: '#F5F5DC' }}>
              Gran Rifa
            </p>
          </div>

          {/* Slide 2 */}
          <div className="flex flex-col items-center pb-12">
            <div className="w-full h-[400px] bg-beige flex items-center justify-center">
              <img
                src={Evento2}
                alt="Voluntariado animalista"
                className="max-h-full object-contain"
              />
            </div>
            <p className="mt-4 mt-2 text-center text-lg font-semibold" style={{ color: '#F5F5DC' }}>
              Voluntariado animalista
            </p>
          </div>

          {/* Slide 3 */}
          <div className="flex flex-col items-center pb-12">
            <div className="w-full h-[400px] bg-beige flex items-center justify-center">
              <img
                src={Evento3}
                alt="Proyecto Huellitas en Acción"
                className="max-h-full object-contain"
              />
            </div>
            <p className="mt-4 mt-2 text-center text-lg font-semibold" style={{ color: '#F5F5DC' }}>
              Proyecto Huellitas en Acción
            </p>
          </div>

          {/* Slide 4 */}
          <div className="flex flex-col items-center pb-12">
            <div className="w-full h-[400px] bg-beige flex items-center justify-center">
              <img
                src={Evento4}
                alt="Voluntariado animalista"
                className="max-h-full object-contain"
              />
            </div>
            <p className="mt-4 mt-2 text-center text-lg font-semibold" style={{ color: '#F5F5DC' }}>
              Voluntariado animalista
            </p>
          </div>
        </Carousel>
      </div>
      </section>
  );
};

export default CarruselEventos;
