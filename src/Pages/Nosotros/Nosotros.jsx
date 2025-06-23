import React from 'react';

export const Nosotros = () => {
  return (
    <div className="p-8 space-y-12 bg-gray-50">

      {/* Título Principal */}
      <h1 className="text-4xl font-bold text-center text-bg-[#dda15e]  mb-10">¡Conócenos!</h1>

      {/* Misión y Visión */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
        <div className="border-2 border-bg-[#dda15e]  p-6 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-semibold text-bg-[#dda15e] ">Misión</h2>
          <p className="text-gray-700 mt-4">Construir un mundo mejor para los perros y gatos a través de iniciativas sostenibles de adopción, salud y educación.</p>
        </div>
        <div className="border-2 border-bg-[#dda15e]  p-6 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-semibold text-bg-[#dda15e] ">Visión</h2>
          <p className="text-gray-700 mt-4">Ser una organización líder en el bienestar animal, promoviendo la adopción responsable y el respeto por los animales.</p>
        </div>
      </div>

      {/* Nuestra Historia */}
      <div className="bg-bg-[#dda15e] p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center text-yellow-200 mb-6">Nuestra Historia</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <p className="text-white font-medium">
            Desde nuestra fundación, hemos trabajado incansablemente para mejorar la vida de miles de animales. 
            Con el apoyo de voluntarios y aliados estratégicos, hemos logrado esterilizar más de 14,000 animales y entregar más de 71 toneladas de comida.
          </p>
          <img 
            src="https://i.ytimg.com/vi/932XRGF47nQ/maxresdefault.jpg" 
            alt="Historia de WUF"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Estadísticas */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-bg-[#dda15e]  mb-6">Impacto en Números</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4 text-gray-700">
          <div className="bg-blue-100 p-6 rounded-lg shadow-md hover:bg-blue-200 transition-colors duration-300">
            <p className="text-xl font-bold">+14,000</p>
            <p>Esterilizaciones</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg shadow-md hover:bg-blue-200 transition-colors duration-300">
            <p className="text-xl font-bold">+71 TN</p>
            <p>de Comida Entregadas</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg shadow-md hover:bg-blue-200 transition-colors duration-300">
            <p className="text-xl font-bold">+300</p>
            <p>Adopciones</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg shadow-md hover:bg-blue-200 transition-colors duration-300">
            <p className="text-xl font-bold">+520</p>
            <p>Atenciones Veterinarias</p>
          </div>
        </div>
      </div>

      {/* Nuestro Equipo */}
      <div className="text-center py-12 bg-gray-50">
      <h2 className="text-3xl font-semibold text-blue-800 mb-8">Nuestro Equipo</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
      {/* Miembro 1 */}
      <div className="w-80 h-80 bg-white rounded-lg flex flex-col items-center justify-center p-6 transition-transform transform hover:scale-105 border-4 border-blue-900">
      <img 
        src="https://i.ibb.co/0j40Sdf9/Imagen-1.jpg" 
        alt="Miembro del equipo 1"
        className="w-56 h-56 rounded-lg object-cover mb-4"
      />
        <div className="text-center">
          <p className="text-gray-800 font-semibold text-lg">Mary Velásquez</p>
          <p className="text-sm text-gray-500">Coordinadora de Adopciones</p>
        </div>
      </div>

      {/* Miembro 2 */}
      <div className="w-80 h-80 bg-white rounded-lg flex flex-col items-center justify-center p-6 transition-transform transform hover:scale-105 border-4 border-blue-900">
        <img 
          src="https://i.ibb.co/23Tp2Xnt/Imagen-2.jpg" 
          alt="Miembro del equipo 2"
          className="w-56 h-56 rounded-lg object-cover mb-4"
        />
      <div className="text-center">
        <p className="text-gray-800 font-semibold text-lg">Stephanie Mendoza</p>
        <p className="text-sm text-gray-500">Coordinadora de Adopciones</p>
      </div>
      </div>
        </div>
          </div>

      {/* Alianzas Estratégicas */}
      <div className="text-center py-8 bg-blue-50">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6">Alianzas Estratégicas</h2>
        <p className="text-gray-700 mb-6">Si eres una marca y deseas dejar una huella, únete a nuestras alianzas de ayuda, comercial o de marketing. Juntos podemos hacer la diferencia.</p>
      </div>

      {/* Colaboradores */}
      <div className="text-center mt-12">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6">Nuestros Colaboradores</h2>
        <div className="flex justify-center">
          <div className="w-48 h-48 bg-white rounded-lg shadow-lg flex items-center justify-center">
            <img 
              src="https://alberguesanfrancisco.weebly.com/uploads/1/2/1/7/121734170/editor/go-pet.png?1536615299" 
              alt="Colaborador"
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Nosotros;
