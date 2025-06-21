import React, { useState } from "react";
import perritoSilueta from "../../Imagenes/perrito-silueta.jpg";

const Donaciones = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  return (
    <div className="px-8 py-10 space-y-16">

      {/* Explicación de fondos*/}
      <section>
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-10">¿A dónde va tu ayuda?</h1>
        <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          Cada sol que donas cambia vidas. Con tu ayuda, podemos rescatar, alimentar, y dar una segunda oportunidad a animales que lo necesitan.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center hover:scale-105 transition-transform duration-300 border-t-4 border-yellow-400">
            <div className="w-20 h-20 mx-auto bg-yellow-100 rounded-full flex items-center justify-center text-3xl">🍖</div>
            <h3 className="text-xl font-bold mt-4">Alimentación</h3>
            <p className="text-gray-600 mt-2">Proveemos comida diaria y suplementos para mejorar su salud y crecimiento.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center hover:scale-105 transition-transform duration-300 border-t-4 border-pink-400">
            <div className="w-20 h-20 mx-auto bg-pink-100 rounded-full flex items-center justify-center text-3xl">💉</div>
            <h3 className="text-xl font-bold mt-4">Cuidados médicos</h3>
            <p className="text-gray-600 mt-2">Realizamos tratamientos, vacunaciones y esterilizaciones para el bienestar de los animales.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center hover:scale-105 transition-transform duration-300 border-t-4 border-green-400">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center text-3xl">🏡</div>
            <h3 className="text-xl font-bold mt-4">Refugio y adopciones</h3>
            <p className="text-gray-600 mt-2">Les damos un hogar temporal y buscamos familias amorosas que los adopten.</p>
          </div>
        </div>
      </section>

      {/* Donación libre */}
    <section>
      <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-10">Donación libre</h2>
      
      <div className="flex flex-col items-center gap-8">

        {/* Card de donación */}
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center space-y-4 hover:shadow-2xl transition-shadow">
          <div className="w-48 h-48 bg-gray-300 mx-auto rounded-lg overflow-hidden">
            {/* Reemplaza esto por una imagen real si tienes una */}
            <img
              src={perritoSilueta}
              alt="Perrito en adopción"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-gray-700 text-base">
            Tu apoyo hace la diferencia. Con una donación libre, ayudas a que más perritos para que reciban alimento, cuidados médicos y una oportunidad de ser felices.
          </p>
          <button
            onClick={() => setMostrarModal(true)}
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-2 rounded-lg shadow"
            >
              Donar ahora
          </button>
        </div>
      </div>
    </section>

    {/* Modal con QR */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center shadow-2xl relative">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Escanea el código QR con Yape</h3>
            <img
              src="Imagenes/QR"
              alt="QR Yape"
              className="w-48 h-48 mx-auto object-contain rounded-md"
            />
            <p className="text-sm text-gray-600 mt-4">¡Gracias por todo tu apoyo!</p>
            <button
              onClick={() => setMostrarModal(false)}
              className="mt-6 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Donaciones;
