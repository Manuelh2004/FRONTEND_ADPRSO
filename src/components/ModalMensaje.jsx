import React from "react";

export default function ModalMensaje({ visible, tipo = "success", mensaje = "", onClose }) {
  if (!visible) return null;

  const iconos = {
    success: (
      <div className="text-green-500 text-4xl mb-2">✅</div>
    ),
    error: (
      <div className="text-red-500 text-4xl mb-2">❌</div>
    ),
    info: (
      <div className="text-blue-500 text-4xl mb-2">ℹ️</div>
    ),
  };

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        {iconos[tipo] || iconos.info}

        <p className="text-gray-800 text-base whitespace-pre-wrap">{mensaje}</p>
      </div>
    </div>
  );
}