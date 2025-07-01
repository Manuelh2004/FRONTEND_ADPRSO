import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { loginRequest } from '../services/auth';
import { useNavigate } from 'react-router-dom'; // 👈 importar esto

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate(); // 👈 inicializar useNavigate

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      const decoded = jwtDecode(storedToken);
      setRole(decoded.role);
    }
  }, []);

  const login = async (correo, contrasena) => {
    try {
      const accessToken = await loginRequest(correo, contrasena);
      const decoded = jwtDecode(accessToken);
      setToken(accessToken);
      setRole(decoded.role);
      localStorage.setItem('token', accessToken);
      //console.log('Token después de login:', accessToken);  // Imprime el token en consola
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    navigate('/nosotros'); // 👈 redirige después de cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
   return useContext(AuthContext);
$};