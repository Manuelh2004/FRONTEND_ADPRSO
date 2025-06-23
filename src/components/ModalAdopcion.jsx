// src/components/ModalAdopcion.jsx
import React from 'react';

const ModalAdopcion = ({ visible, motivo, onMotivoChange, onConfirm, onClose }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md space-y-4">
        <h2 className="text-xl font-bold text-[#bc6c25]">Motivo de Adopción</h2>
        <p className="text-gray-700">Cuéntanos por qué quieres adoptar a esta mascota.</p>
        <textarea
          className="w-full h-28 border border-gray-300 rounded p-2 resize-none"
          placeholder="Escribe tu motivo aquí..."
          value={motivo}
          onChange={(e) => onMotivoChange(e.target.value)}
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-[#bc6c25] text-white hover:bg-[#dda15e]"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAdopcion;
