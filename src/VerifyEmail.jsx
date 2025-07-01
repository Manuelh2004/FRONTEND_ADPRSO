import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');

        if (token) {
            axios.post(`http://localhost:8080/auth/verify_email?token=${token}`)
                .then((response) => {
                    setMessage('Correo electrónico verificado correctamente.');
                    setLoading(false);
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000);
                })
                .catch(() => {
                    setMessage('Hubo un problema al verificar el correo electrónico.');
                    setLoading(false);
                });
        } else {
            setMessage('Token no proporcionado.');
            setLoading(false);
        }
    }, [location.search, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#a8967d] px-4">
            <div className="bg-[#5a4530] shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
                {loading ? (
                    <p className="text-[#f5f5f5] text-lg font-semibold animate-pulse">
                        Verificando...
                    </p>
                ) : (
                    <div>
                        <p className={`text-lg font-semibold ${
                            message.includes('correctamente') ? 'text-[#936b45]' : 'text-red-300'
                        }`}>
                            {message}
                        </p>
                        {!message.includes('correctamente') && (
                            <p className="mt-4">
                                <a href="/register" className="text-[#a8967d] hover:underline font-medium">
                                    Regístrate nuevamente
                                </a>
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
