import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ModalMensaje from '../../components/ModalMensaje';

export default function EventoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();

  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTipo, setModalTipo] = useState("success");
  const [modalMensaje, setModalMensaje] = useState("");

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/evento/${id}/public`);
        const data = await response.json();

        if (response.ok && data.status === 'success') {
          setEvento(data.data);
        } else {
          throw new Error(data.message || 'Error al obtener detalles del evento');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvento();
  }, [id]);

  const handleRegistrarse = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/evento/guardar/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setModalTipo("success");
        setModalMensaje("¡Te has registrado correctamente al evento!");
      } else {
        throw new Error(data.message || "Error al registrarse al evento.");
      }
    } catch (error) {
      setModalTipo("error");
      setModalMensaje(`Error: ${error.message}`);
    } finally {
      setModalVisible(true);
    }
  };

  const crearFechaLocal = (fechaString) => {
    const fecha = new Date(fechaString + 'T00:00:00');
    return fecha;
  };

  const calcularMensajeDias = () => {
    const fechaInicio = crearFechaLocal(evento.even_fecha_inicio);
    const fechaFin = crearFechaLocal(evento.even_fecha_fin);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (hoy < fechaInicio) {
      const diffDias = Math.ceil((fechaInicio - hoy) / (1000 * 60 * 60 * 24));
      return <p className="text-bg-[#dda15e] font-medium">Faltan {diffDias} día{diffDias > 1 ? 's' : ''}</p>;
    } else if (hoy >= fechaInicio && hoy <= fechaFin) {
      const diffDias = Math.ceil((fechaFin - hoy) / (1000 * 60 * 60 * 24));
      return diffDias === 0
        ? <p className="text-orange-600 font-medium">¡Último día del evento!</p>
        : <p className="text-green-600 font-medium">¡Evento en curso! Quedan {diffDias} día{diffDias > 1 ? 's' : ''}</p>;
    } else {
      return <p className="text-red-500 font-medium">Evento finalizado</p>;
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando detalles...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">Error: {error}</p>;
  if (!evento) return <p className="text-center mt-10">Evento no encontrado</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <ModalMensaje
        visible={modalVisible}
        tipo={modalTipo}
        mensaje={modalMensaje}
        onClose={() => setModalVisible(false)}
      />

      {evento.even_imagen && (
        <img
          src={evento.even_imagen}
          alt={evento.even_nombre}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
      )}
      <h2 className="text-3xl font-bold text-bg-[#dda15e]  mb-2">{evento.even_nombre}</h2>
      <p className="text-gray-700 mb-1">
        <strong>Ubicación:</strong> {evento.even_lugar}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>Fecha inicio:</strong> {crearFechaLocal(evento.even_fecha_inicio).toLocaleDateString()}
      </p>
      {calcularMensajeDias()}
      <p className="text-gray-700 mb-4">
        <strong>Fecha fin:</strong> {crearFechaLocal(evento.even_fecha_fin).toLocaleDateString()}
      </p>
      <p className="text-gray-800 leading-relaxed whitespace-pre-line">{evento.even_descripcion}</p>
      <button
        onClick={handleRegistrarse}
        className="text-white font-bold px-4 py-2 rounded mt-4 bg-[#dda15e] hover:bg-[#bc6c25] transition"
      >
        ¡Quiero participar!
      </button>
    </div>
  );
}
