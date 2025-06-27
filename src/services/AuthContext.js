import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const forgotPassword = async (email) => {
    // Aquí va la lógica para llamar a la API del backend para enviar el correo de recuperación
    const response = await fetch('http://localhost:8080/auth/forgot_password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al enviar el correo');
    }

    return data;  // Retorna la respuesta de la API
  };

  return (
    <AuthContext.Provider value={{ user, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
