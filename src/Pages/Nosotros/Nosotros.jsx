import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export const Nosotros = () => {
  const telefonoWhatsApp = "51922266310";
  const mensaje = "¡Hola! Quiero saber más sobre la organización.";
  const enlaceWhatsApp = `https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(mensaje)}`;

  return (
    <div className="p-8 space-y-12 bg-beige font-sans">
      
      {/* Título Principal */}
      <h1 className="text-4xl font-extrabold text-center text-[#522c02] mb-10">¡Conócenos!</h1>

      {/* Nuestra Historia */}
      <div className="bg-gradient-to-r from-[#9A6C3B] via-[#a1774c] to-[#c49b70] px-10 py-12 rounded-xl shadow-md text-white flex flex-col md:flex-row gap-10 items-center transition-all duration-700 ease-in-out transform hover:scale-[1.01]">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Nuestra Historia</h2>
          <p className="text-base leading-relaxed text-white/90">
            "Este año 2025 cumplimos 13 años de ayudar a muchas colitas. Varios de nuestros rescatados tienen más de media década con nosotros, algunos nacieron en el albergue porque rescatamos a su mamá preñada y otros llegaron enfermos.
            Actualmente tenemos 50 y 22 refugiados, necesitamos de tu apoyo para seguir velando por ellos, ya que también tienen necesidades como cualquiera. Como todos los años les toca su vacuna de refuerzo, necesitamos pipetas y arena para nuestros.
            Y como sabrán nuestro albergue no fue planeado, simplemente se creó por una necesidad que era ayudar a los perritos que se nos cruzaban en el camino. Lo hicimos con lo que pudimos, que fue madera, pero esa madera en 10 años ya se pudrió porque 2 veces se reventó la matriz de agua cerca al albergue y se apolilla con el tiempo. Por más que la hemos parchado o cambiado pedazos, ya no da más, así que esperamos juntar para cercar todo de ladrillo."
          </p>
          <div className="mt-8 bg-white/10 rounded-lg px-4 py-2 w-fit ml-auto">
            <p className="italic text-sm text-white">Atte. Stephanie Mendoza.</p>
          </div>
        </div>
        <div className="md:w-1/2">
          <img 
            src="https://i.ytimg.com/vi/932XRGF47nQ/maxresdefault.jpg" 
            alt="Adopta" 
            className="rounded-xl shadow-xl w-full object-cover"
          />
        </div>
      </div>

      {/* Misión y Visión */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-12">
        <div className="border-l-8 border-[#9A6C3B] p-6 rounded-xl shadow-md bg-white hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-bold text-[#9A6C3B]">🐾 Misión</h2>
          <p className="text-base text-gray-700 mt-3 leading-relaxed">
            Construir un mundo mejor para los perros y gatos a través de iniciativas sostenibles de adopción, salud y educación.
          </p>
        </div>
        <div className="border-l-8 border-[#9A6C3B] p-6 rounded-xl shadow-md bg-white hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-bold text-[#9A6C3B]">🎯 Visión</h2>
          <p className="text-base text-gray-700 mt-3 leading-relaxed">
            Ser una organización líder en el bienestar animal, promoviendo la adopción responsable y el respeto por los animales.
          </p>
        </div>
      </div>

      {/* Impacto en Números */}
      <div className="text-center py-10 bg-[#E3CEB2]">
        <h2 className="text-3xl font-bold text-[#8A572A] mb-8">Impacto en Números</h2>
        
        <div className="flex flex-wrap justify-center items-center gap-10">
          {[
            { color: "#2b1701", cantidad: "70", texto: "Perritos albergados" },
            { color: "#2b1701", cantidad: "3000", texto: "Adoptados" },
            { color: "#2b1701", cantidad: "4000", texto: "Esterilizaciones" },
            { color: "#2b1701", cantidad: "4000", texto: "Rescatados" },
          ].map((item, index) => (
            <div
              key={index}
              className="relative w-48 h-48 transform transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <svg
                viewBox="0 0 32 29.6"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  fill={item.color}
                  d="M23.6,0c-2.9,0-5.4,1.6-6.6,4C15.8,1.6,13.3,0,10.4,0C4.7,0,0,4.7,0,10.4c0,11.1,16,19.2,16,19.2s16-8.1,16-19.2C32,4.7,27.3,0,21.6,0z"
                />
              </svg>
              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white text-center px-2">
                <p className="text-xl font-bold">{item.cantidad}</p>
                <p className="text-sm">{item.texto}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-[#8A572A] font-semibold text-2xl uppercase">
          Tu apoyo no solo cambia vidas, también construye un mundo más justo para quienes no tienen voz
        </p>
        <p className="mt-4 text-[#2b1701] font-bold text-2xl uppercase">
          ¡TÚ TAMBIÉN PUEDES SER PARTE!
        </p>
      </div>


      {/* Nuestro Equipo */}
      <div className="text-center py-12 bg-[#9A6C3B]">
        <h2 className="text-3xl font-bold text-[#F5F5DC] mb-10">Nuestro Equipo</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-4xl mx-auto px-4">
          {[{
            nombre: "Mary Velásquez",
            rol: "Coordinadora de Adopciones",
            imagen: "https://i.ibb.co/0j40Sdf9/Imagen-1.jpg"
          }, {
            nombre: "Stephanie Mendoza",
            rol: "Coordinadora de Adopciones",
            imagen: "https://i.ibb.co/23Tp2Xnt/Imagen-2.jpg"
          }].map((persona, idx) => (
            <div key={idx} className="w-72 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform hover:scale-105">
              <img src={persona.imagen} alt={persona.nombre} className="w-full h-80 object-cover rounded-t-2xl" />
              <div className="py-4">
                <p className="text-lg font-bold text-[#9A6C3B]">{persona.nombre}</p>
                <p className="text-sm text-gray-500">{persona.rol}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alianzas Estratégicas */}
      <div className="bg-[#E5D3BA] py-12 px-4">
        <div className="bg-white max-w-6xl mx-auto rounded-lg shadow-md p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="hover:scale-105 transition-transform">
              <i className="fas fa-heart text-5xl text-gray-400 mb-4"></i>
              <h3 className="text-xl font-bold mb-2">Adopciones</h3>
              <p className="text-base text-gray-700">Adopta un peludito e inicia una historia de complicidad juntos.</p>
            </div>
            <div className="hover:scale-105 transition-transform">
              <i className="fas fa-donate text-5xl text-gray-400 mb-4"></i>
              <h3 className="text-xl font-bold mb-2">Donaciones</h3>
              <p className="text-base text-gray-700">Un aporte voluntario nos ayudará a seguir con nuestro objetivo.</p>
            </div>
            <div className="hover:scale-105 transition-transform">
              <i className="fas fa-hands-helping text-5xl text-gray-400 mb-4"></i>
              <h3 className="text-xl font-bold mb-2">Voluntariado</h3>
              <p className="text-base text-gray-700">Necesitamos de tus manos para nuestros eventos y campañas.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Colaboradores */}
      <div className="text-center mt-12">
        <h2 className="text-3xl font-bold text-[#9A6C3B] mb-6">Nuestros Colaboradores</h2>
        <p className="text-base text-gray-600 mb-6">Gracias a marcas comprometidas como GO Pet, seguimos transformando vidas. 💛</p>
        <div className="flex justify-center">
          <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-white rounded-lg shadow-lg flex items-center justify-center">
            <img 
              src="https://alberguesanfrancisco.weebly.com/uploads/1/2/1/7/121734170/editor/go-pet.png?1536615299" 
              alt="Colaborador"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Botón flotante WhatsApp */}
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
};

export default Nosotros;
