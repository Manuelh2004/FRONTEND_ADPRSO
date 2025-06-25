import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMascotaDetalle } from '../../services/mascotaApi';
import GaleriaImagenes from '../../components/GaleriaImagenes';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import ModalAdopcion from '../../components/ModalAdopcion';
import ModalMensaje from '../../components/ModalMensaje';

const MascotaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mascota, setMascota] = useState(null);
  const { isAuthenticated, token } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const [motivoAdopcion, setMotivoAdopcion] = useState('');
  const [mensajeModal, setMensajeModal] = useState({ mensaje: null, tipo: 'success' });

  useEffect(() => {
    getMascotaDetalle(id)
      .then(res => {
        setMascota(res.data.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);

  const handleAdopcion = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setModalOpen(true);
    }
  };

  const handleConfirmAdopcion = async () => {
    if (!motivoAdopcion.trim()) {
      setMensajeModal('Debes ingresar un motivo válido para la adopción.');
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/api/adopcion/guardar/${mascota.masc_id}`,
        {
          adop_motivo: motivoAdopcion,
          mascota: mascota,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMensajeModal('¡Adopción registrada correctamente!');
    } catch (error) {
      const mensaje = error.response?.data?.message || 'Ocurrió un error al registrar la adopción.';
      setMensajeModal({ mensaje, tipo: 'error' });
    } finally {
      setModalOpen(false);
      setMotivoAdopcion('');
    }
  };

  if (!mascota) {
    return <div className="text-center py-10">Cargando información...</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <GaleriaImagenes imagenes={mascota.imagenes || []} />

      {/* Info */}
      <div className="bg-white rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-[#bc6c25]">{mascota.masc_nombre}</h2>
          <p><strong className="text-gray-700">Registrado el:</strong> {new Date(mascota.masc_fecha_registro).toLocaleDateString()}</p>
          <p><strong className="text-gray-700">Sexo:</strong> {mascota.sexo?.sex_nombre}</p>
          <p><strong className="text-gray-700">Tamaño:</strong> {mascota.tamanio?.tam_nombre}</p>
          <p><strong className="text-gray-700">Tipo:</strong> {mascota.tipo_mascota?.tipma_nombre}</p>
          <p><strong className="text-gray-700">Nivel de energía:</strong> {mascota.nivel_energia?.nien_nombre}</p>
          <p><strong className="text-gray-700">Salud:</strong> {mascota.estado_salud?.estsa_nombre}</p>
          <p><strong className="text-gray-700">Vacunas:</strong> {mascota.estado_vacuna?.estva_nombre}</p>
        </div>
        <div>
          {mascota.gustoNames?.length > 0 && (
            <>
              <h3 className="font-semibold text-xl mb-3 text-gray-800">Le gusta:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {mascota.gustoNames.map((gusto, idx) => (
                  <li key={idx}>{gusto.nombre}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* Historia */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Historia</h3>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {mascota.masc_historia}
        </p>
      </div>

      {/* Botones */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleAdopcion}
          className="bg-[#bc6c25] text-white font-bold px-6 py-2 rounded-full shadow hover:bg-[#dda15e] transition"
        >
          ¡Quiero adoptar!
        </button>
        <button
          onClick={() => navigate(-1)}
          className="text-bg-[#dda15e]  text-sm underline"
        >
          ← Volver
        </button>
      </div>

      {/* Modal de adopción */}
      <ModalAdopcion
        visible={modalOpen}
        motivo={motivoAdopcion}
        onMotivoChange={setMotivoAdopcion}
        onConfirm={handleConfirmAdopcion}
        onClose={() => {
          setModalOpen(false);
          setMotivoAdopcion('');
        }}
      />

      {/* Modal de mensaje (opcional si usas ModalMensaje aparte) */}
      {mensajeModal.mensaje && (
        <ModalMensaje
          visible={!!mensajeModal.mensaje}
          mensaje={mensajeModal.mensaje}
          tipo={mensajeModal.tipo}
          onClose={() => setMensajeModal({ mensaje: null, tipo: 'success' })}
        />
      )}
    </div>
  );
};

export default MascotaDetalle;