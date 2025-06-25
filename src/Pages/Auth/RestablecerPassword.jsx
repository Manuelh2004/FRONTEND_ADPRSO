// src/pages/RestablecerPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RestablecerPassword() {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      await axios.post('http://localhost:8080/auth/recuperar', email, {
        headers: { 'Content-Type': 'text/plain' }
      });
      setMensaje('Código enviado al correo. Serás redirigido...');
      setTimeout(() => navigate('/cambiar', { state: { email } }), 2000);
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al enviar código de recuperación';
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-amber-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold text-center text-amber-800 mb-4">Recuperar contraseña</h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded">
          Enviar código
        </button>

        {mensaje && <p className="mt-2 text-green-600 text-sm text-center">{mensaje}</p>}
        {error && <p className="mt-2 text-red-500 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
}
