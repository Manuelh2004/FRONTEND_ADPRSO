// src/pages/VerificarCuenta.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function VerificarCuenta() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailParam = location.state?.email || '';

  const [email, setEmail] = useState(emailParam);
  const [codigo, setCodigo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleVerificar = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      const response = await axios.post('http://localhost:8080/auth/verificar', {
        email,
        codigo: parseInt(codigo)
      });

      setMensaje(response.data.message || 'Cuenta verificada correctamente');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al verificar cuenta';
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-amber-50">
      <form onSubmit={handleVerificar} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold text-center text-amber-800 mb-4">Verificación de cuenta</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Código de verificación"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded"
        >
          Verificar
        </button>

        {mensaje && <p className="mt-2 text-green-600 text-sm text-center">{mensaje}</p>}
        {error && <p className="mt-2 text-red-500 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
}
