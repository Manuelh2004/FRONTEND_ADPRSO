import React, { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';

import perritoSilueta from "../../Imagenes/perrito-silueta.jpg";
import yape from "../../Imagenes/yape.png";
import plin from "../../Imagenes/plin.png";
import bcp from "../../Imagenes/bcp.jpg";
import interbank from "../../Imagenes/interbank.png";
import western_union from "../../Imagenes/Western-Union-Logo.png";
import paypal from "../../Imagenes/PayPal.png";
import bbva from "../../Imagenes/bbva.jpg";
import { FaWhatsapp } from 'react-icons/fa'; // Importamos el ícono de WhatsApp

const Donaciones = () => {
  const [mostrarModal, setMostrarModal] = useState(false);

  // Reemplaza con tu número de WhatsApp y el mensaje que deseas enviar
  const telefonoWhatsApp = "51922266310";  // Agrega tu número de WhatsApp aquí
  const mensaje = "¡Hola! Quiero saber más sobre cómo puedo ayudar."; // Mensaje predeterminado

  // Enlace a la API de WhatsApp
  const enlaceWhatsApp = `https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(mensaje)}`;

  return (
    <div className="px-8 py-10 space-y-16">

      {/* Explicación de fondos*/}
      <section>
        <h1 style={{ color: '#9A6C3B' }} className="text-4xl font-extrabold text-center text-indigo-700 mb-10">¿A dónde va tu ayuda?</h1>
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
        <h2 style={{ color: '#9A6C3B' }} className="text-4xl font-extrabold text-center text-indigo-700 mb-10">Donación libre</h2>
        
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
      <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex items-center justify-center z-50">
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

      {/* Métodos de pago adicionales */}
      <section>
        <h2 style={{ color: '#9A6C3B' }} className="text-4xl font-extrabold text-center text-indigo-700 mb-10">
          Otras formas de ayudar
        </h2>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="px-4"
        >
          {[ 
            { img: yape, alt: "Yape", info: ["Yape","922-266-310"] }, 
            { img: plin, alt: "Plin", info: ["Plin","922-266-310"] }, 
            { img: bcp, alt: "BCP", info: ["BCP","191-36249867-0-25", "CCI: 00219113624986702559"] },
            { img: interbank, alt: "Interbank Soles", info: ["Interbank Soles","1543147371121"] }, 
            { img: interbank, alt: "Interbank Dólares", info: ["Interbank Dólares", "8983170530579", "CCI: 00389801317053057948"] },
            { img: bbva, alt: "BBVA", info: ["BBVA","001108140221701416"] },
            { img: western_union, alt: "Western Union", info: ["Western Union","tephi.chris@gmail.com"] },
            { img: paypal, alt: "PayPal", info: ["PayPal","tephi.chris@gmail.com"] },
          ].map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-white rounded-xl p-4 shadow-md flex flex-col items-center text-center h-[290px] w-full">
                  <img src={item.img} alt={item.alt} className="w-40 h-40 object-contain mb-2" />
                  <div className="mt-auto space-y-1">
                    {item.info.map((line, i) => (
                      <p key={i} className="text-gray-700 text-lg">{line}</p>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Botón flotante de WhatsApp */}
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

export default Donaciones;
