import React from "react";
import facebook from "../../Imagenes/facebook.png";
import instagram from "../../Imagenes/instagram.jfif";

const Contacto = () => {
  return (
    <div className="px-6 py-10 max-w-3xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4">Contáctanos</h2>
      <p className="text-center text-gray-600 mb-6">
        Estamos aquí para ayudarte. Puedes comunicarte con nosotros a través de los siguientes medios:
      </p>

      <div className="space-y-4 text-center text-gray-700">
        <p><strong>📍 Dirección:</strong> Puente Piedra 15122, Lima, Perú</p>
        <p><strong>📞 Teléfono:</strong> 922 266 310</p>
      </div>

      <div className="mt-6 flex justify-center gap-6 text-xl text-[#dda15e] font-semibold">
        <a href="https://www.facebook.com/alberguesanfrancisco/?locale=es_LA" target="_blank" rel="noopener noreferrer" className="flex items-center gap-x-2"><img src={facebook} alt="Facebook" className="w-5 h-5" /> Facebook</a> 
        <a href="https://www.instagram.com/albergue.sanfrancisco?igsh=NndxY295MjBkNTN3" target="_blank" rel="noopener noreferrer" className="flex items-center "><img src={instagram} alt="Instagram" className="w-10 h-5" />Instagram</a>
      </div>

      <div className="mt-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3904.960162521917!2d-77.10351242517831!3d-11.838062488382752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105d69e6d058e97%3A0x654a4654714b6155!2sAlbergue%20San%20Francisco!5e0!3m2!1ses-419!2spe!4v1750876031237!5m2!1ses-419!2spe"
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: "12px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa Albergue San Francisco"
        ></iframe>
      </div>
    </div>
  );
};

export default Contacto;

