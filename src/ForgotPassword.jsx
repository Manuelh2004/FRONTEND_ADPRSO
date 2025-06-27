import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Para hacer la solicitud HTTP
import pawPrint from './Imagenes/huella.jpg';
import dogSilhouette from './Imagenes/perrito-silueta.jpg';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    try {
      // Llamamos al backend para enviar el correo de recuperación
      const response = await axios.post('http://localhost:8080/auth/forgot_password', { email });
      if (response.data.status === 'success') {
        setSuccessMessage('Correo de recuperación enviado con éxito.');
        setTimeout(() => navigate('/login'), 3000); // Redirige al login después de 3 segundos
      } else {
        setError('No se pudo enviar el correo de recuperación. Intenta nuevamente.');
      }
    } catch (err) {
      setError('No se pudo enviar el correo de recuperación. Intenta nuevamente.');
    }
  }, [email, navigate]);

  const handleInputChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  return (
    <div 
      className="flex justify-center items-center min-h-screen bg-amber-50 bg-opacity-50"
      style={{
        backgroundImage: `url(${pawPrint})`,
        backgroundSize: '200px',
        backgroundBlendMode: 'overlay'
      }}
    >
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-lg shadow-xl w-80 border-2 border-amber-200 relative overflow-hidden"
        aria-label="Formulario de recuperación de contraseña"
      >
        {/* Decoración de huellitas */}
        <div className="absolute -top-10 -right-10 w-32 h-32">
          <img 
            src={pawPrint} 
            alt="Huella decorativa" 
            className="opacity-20 rotate-45"
          />
        </div>
        
        {/* Logo de perrito */}
        <div className="flex justify-center mb-4">
          <img 
            src={dogSilhouette} 
            alt="Silueta de perrito" 
            className="h-16 w-16"
          />
        </div>
        
        <h2 className="text-2xl font-bold mb-4 text-center text-amber-800">
          Recuperar Contraseña
        </h2>
        
        <div className="mb-4">
          <div className="relative">
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-amber-200 rounded-lg focus:border-amber-400 focus:ring-2 focus:ring-amber-100 pl-10"
              required
              autoComplete="email"
              aria-required="true"
            />
            <span className="absolute left-3 top-4 text-amber-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold p-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Enviar correo
        </button>

        {error && (
          <div className="mt-3 text-red-500 text-sm text-center">{error}</div>
        )}

        {successMessage && (
          <div className="mt-3 text-green-500 text-sm text-center">{successMessage}</div>
        )}

        <div className="mt-4 text-center text-sm text-amber-700">
          ¿Recibiste el correo de recuperación?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-amber-600 hover:text-amber-700 underline"
          >
            Inicia sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
