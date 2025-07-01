import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contacto = () => {
  const telefonoWhatsApp = "51922266310";
  const mensaje = "¡Hola! Necesito más información sobre el albergue.";
  const enlaceWhatsApp = `https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(mensaje)}`;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ backgroundColor: '#F5F5DC' }}
        className="mt-16 px-6 py-10 max-w-3xl mx-auto p-6 shadow-lg rounded-lg"
      >
        <h2 className="text-4xl font-extrabold text-center text-[#9A6C3B] drop-shadow-sm mb-6">Contáctanos</h2>
        <p className="text-center text-gray-600 mb-6">
          Estamos aquí para ayudarte. Puedes comunicarte con nosotros a través de los siguientes medios:
        </p>

        <div className="space-y-3 text-center text-gray-800 font-medium mb-10">
          <p><strong>📍 Dirección:</strong> Puente Piedra, Lima, Perú</p>
          <p><strong>📞 Teléfono:</strong> 922 266 310</p>
        </div>

        {/* Redes Sociales con efectos */}
        <div className="mt-10 flex justify-center gap-14 text-[#dda15e]">
          <a href="https://www.facebook.com/alberguesanfrancisco/?locale=es_LA" target="_blank" rel="noopener noreferrer"
            className="flex flex-col items-center hover:text-blue-600 transition transform hover:scale-110 duration-300">
            <FaFacebookF size={100} className="drop-shadow-lg" />
            <span className="text-base mt-2">Facebook</span>
          </a>
          <a href="https://www.instagram.com/albergue.sanfrancisco?igsh=NndxY295MjBkNTN3" target="_blank" rel="noopener noreferrer"
            className="flex flex-col items-center hover:text-pink-600 transition transform hover:scale-110 duration-300">
            <FaInstagram size={100} className="drop-shadow-lg" />
            <span className="text-base mt-2">Instagram</span>
          </a>
          <a href="https://www.tiktok.com/@albergue.sanfrancisco" target="_blank" rel="noopener noreferrer"
            className="flex flex-col items-center hover:text-black transition transform hover:scale-110 duration-300">
            <FaTiktok size={100} className="drop-shadow-lg" />
            <span className="text-base mt-2">TikTok</span>
          </a>
        </div>
      </motion.div>

      {/* Botón flotante de WhatsApp fuera de la animación */}
      <a
        href={enlaceWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition z-50"
        title="Enviar mensaje por WhatsApp"
      >
        <FaWhatsapp size={30} />
      </a>
    </>
  );
};

export default Contacto;


