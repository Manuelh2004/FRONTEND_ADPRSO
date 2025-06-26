import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Usamos axios para las solicitudes HTTP
import pawPrint from './Imagenes/huella.jpg'; // Imagen de fondo
import dogSilhouette from './Imagenes/perrito-silueta.jpg'; // Imagen del logo

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // Capturar el token de la URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      // Enviar la nueva contraseña al backend con el token
      const response = await axios.post(
        `http://localhost:8080/auth/reset_password?token=${token}`,
        { newPassword }
      );
      
      if (response.data.status === 'success') {
        setSuccessMessage('Contraseña restablecida correctamente.');
        setTimeout(() => navigate('/login'), 3000); // Redirige al login después de 3 segundos
      }
    } catch (err) {
      setError('No se pudo restablecer la contraseña. Intenta nuevamente.');
    }
  };

  const handleInputChange = (e) => {
    setNewPassword(e.target.value);
  };

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
        aria-label="Formulario de restablecimiento de contraseña"
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
          Restablecer Contraseña
        </h2>
        
        <div className="mb-4">
          <div className="relative">
            <input
              id="newPassword"
              type="password"
              name="newPassword"
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-amber-200 rounded-lg focus:border-amber-400 focus:ring-2 focus:ring-amber-100 pl-10"
              required
              autoComplete="new-password"
              aria-required="true"
            />
            <span className="absolute left-3 top-4 text-amber-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold p-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          Restablecer contraseña
        </button>

        {error && (
          <div className="mt-3 text-red-500 text-sm text-center">{error}</div>
        )}

        {successMessage && (
          <div className="mt-3 text-green-500 text-sm text-center">{successMessage}</div>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
