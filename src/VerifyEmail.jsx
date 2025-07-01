import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const VerifyEmail = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const location = useLocation();  // Obtener la ubicación actual de la URL
    const navigate = useNavigate();  // Para redirigir después de la verificación

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);  // Extraer parámetros de la URL
        const token = queryParams.get('token');  // Obtener el valor del parámetro 'token'

        if (token) {
            // Llamada al backend para verificar el token
            axios.post(`http://localhost:8080/auth/verify_email?token=${token}`)
                .then((response) => {
                    setMessage('Correo electrónico verificado correctamente.');
                    setLoading(false);
                    setTimeout(() => {
                        history.push('/login');  // Redirigimos al login después de 3 segundos
                    }, 3000);
                })
        } else {
            setMessage('Token no proporcionado.');
            setLoading(false);
        }
    }, [location.search, navigate]);  // Dependencias para que se ejecute cuando cambie la URL

    return (
        <div className="container">
            {loading ? (
                <p>Verificando...</p>
            ) : (
                <div>
                    <p>{message}</p>
                    {!message.includes('correctamente') && (
                        <p>
                            <a href="/register">Regístrate nuevamente</a>
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default VerifyEmail;
