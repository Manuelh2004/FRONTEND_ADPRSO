import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CambiarPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  const [codigo, setCodigo] = useState('');
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nuevaPassword.length < 6) {
    setError("La contraseña debe tener al menos 6 caracteres.");
    return ;
  }
  if (!email) {
    navigate('/login'); // o a una vista donde pueda ingresar su email primero
  }
    try {
      await axios.post('http://localhost:8080/auth/restablecer', {
        email,
        codigo,
        nuevaPassword
      });
      setMensaje('Contraseña actualizada. Redirigiendo...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al restablecer contraseña';
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-amber-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold text-center text-amber-800 mb-4">Cambiar contraseña</h2>

        <input
          type="text"
          placeholder="Código de verificación"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={nuevaPassword}
          onChange={(e) => setNuevaPassword(e.target.value)}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded">
          Cambiar contraseña
        </button>

        {mensaje && <p className="mt-2 text-green-600 text-sm text-center">{mensaje}</p>}
        {error && <p className="mt-2 text-red-500 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
}
