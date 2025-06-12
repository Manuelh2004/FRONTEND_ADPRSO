import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import pawPrint from './Imagenes/huella.jpg'; 
import dogSilhouette from './Imagenes/perrito-silueta.jpg'; 

const Login = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const validUsers = useMemo(() => ({
    admin: 'admin123',
    usuario: 'usuario123',
    voluntario: 'huellitas2023',
  }), []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const { username, password } = credentials;
    const correctPassword = validUsers[username];
    
    if (correctPassword && password === correctPassword) {
      onLoginSuccess(username);
    } else {
      alert('Usuario o contraseña incorrecta');
    }
  }, [credentials, validUsers, onLoginSuccess]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  return (
    <div 
      className="flex justify-center items-center min-h-screen bg-amber-50 bg-opacity-50"
      style={{
        backgroundImage: `url(${pawPrint})`,
        backgroundSize: '200px',
        backgroundBlendMode: 'overlay',
        backgroundOpacity: '0.1'
      }}
    >
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-lg shadow-xl w-80 border-2 border-amber-200 relative overflow-hidden"
        aria-label="Formulario de inicio de sesión"
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
          Ingrese al Albergue Online
        </h2>
        
        <div className="mb-4">
          <label htmlFor="username" className="sr-only">Usuario</label>
          <div className="relative">
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Usuario"
              value={credentials.username}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-amber-200 rounded-lg focus:border-amber-400 focus:ring-2 focus:ring-amber-100 pl-10"
              required
              autoComplete="username"
              aria-required="true"
            />
            <span className="absolute left-3 top-3 text-amber-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="sr-only">Contraseña</label>
          <div className="relative">
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Contraseña"
              value={credentials.password}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-amber-200 rounded-lg focus:border-amber-400 focus:ring-2 focus:ring-amber-100 pl-10"
              required
              autoComplete="current-password"
              aria-required="true"
            />
            <span className="absolute left-3 top-3 text-amber-500">
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Ingresar
        </button>
        
        <div className="mt-4 text-center text-sm text-amber-700">
          ¿Problemas para ingresar? Contacta al administrador
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired
};

export default React.memo(Login);