import React, { useEffect, useState } from 'react';
import { fetchMascotas, registrarMascota, actualizarMascota, cambiarEstadoMascota, obtenerMascotasPorEstado, buscarMascotasPorNombre } from '../../../../services/mascota/mascotaAdmApi';
import ApiService from '../../../../services/itemAdmApi'; 
import TablaMascota from './TablaMascota';
import FiltroEstado from './FiltroEstado';  
import FormularioMascota from './FormularioMascota'; 
import ModalMascota from './ModalMascota';

const MascotasAdmin = () => {
  const [mascotas, setMascotas] = useState([]);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const [formData, setFormData] = useState({
    masc_nombre: '',
    masc_fecha_nacimiento: '',
    masc_historia: '',
    masc_observacion: '',
    estadoSalud: '',
    estadoVacuna: '',
    nivelEnergia: '',
    tamanio: '',
    tipoMascota: '',
    sexo: ''
  });  

  const [estadoSalud, setEstadoSalud] = useState([]);
  const [estadoVacuna, setEstadoVacuna] = useState([]);
  const [nivelEnergia, setNivelEnergia] = useState([]);
  const [tamanios, setTamanios] = useState([]);
  const [tipoMascota, setTipoMascota] = useState([]);
  const [sexos, setSexos] = useState([]);
  const [gustos, setGustos] = useState([]);
  const [imagenes, setImagenes] = useState(['']);
  const [gustosSeleccionados, setGustosSeleccionados] = useState([]);

  const [editandoId, setEditandoId] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [registrosPorPagina] = useState(10);
  const [filtroEstado, setFiltroEstado] = useState("");  
  const [searchTerm, setSearchTerm] = useState(""); 
  const token = localStorage.getItem('token');

  useEffect(() => {
    const obtenerMascotas = async () => {      
      if (!token) {
        setError('Token de autenticación es necesario');
        setLoading(false);
        return;
      }

      try {
        const [dataSalud, dataVacuna, dataEnergia, dataTamanio, dataTipoMascota, dataSexo, dataGustos] = await Promise.all([
          ApiService.getData('estado_salud', token),
          ApiService.getData('estado_vacuna', token),
          ApiService.getData('nivel_energia', token),
          ApiService.getData('tamanios', token),
          ApiService.getData('tipo_mascota', token),
          ApiService.getData('sexo', token),
          ApiService.getData('gustos', token),

        ]);       
       
        setEstadoSalud(dataSalud);
        setEstadoVacuna(dataVacuna);
        setNivelEnergia(dataEnergia);
        setTamanios(dataTamanio);
        setTipoMascota(dataTipoMascota);
        setSexos(dataSexo);
        setGustos(dataGustos);       
        
      } catch (error) {
        console.error("Error al cargar las listas de items:", error);
      }    
      
      try{
        const mascotasFiltrados = await obtenerMascotasPorEstado(filtroEstado, token);
        setMascotas(mascotasFiltrados);
      }catch (error) {
        console.error("Error al cargar las mascotas filtradas:", error);
      }    
    };

    obtenerMascotas();
  }, [filtroEstado]);

  useEffect(() => {
  const obtnerMascotasPorNombre = async () => {
    if (searchTerm){
      try {
        const mascotasPorNombre = await buscarMascotasPorNombre(token, searchTerm);
        setMascotas(mascotasPorNombre.data);
      } catch (err) {
          console.error("Error al filtrar mascotas por estado:", err);
      }
    }else{
        const mascotasFiltradas = await obtenerMascotasPorEstado(filtroEstado, token);
        setMascotas(mascotasFiltradas);
    }    
  };

  obtnerMascotasPorNombre();
}, [searchTerm, filtroEstado]);

const mascotasPaginados = Array.isArray(mascotas) && mascotas ? mascotas.slice(
    (paginaActual - 1) * registrosPorPagina,
    paginaActual * registrosPorPagina
  ) : []; 
  const totalPaginas = Math.ceil((Array.isArray(mascotas) ? mascotas.length : 0) / registrosPorPagina);

  const handleCambiarPagina = (pagina) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setPaginaActual(pagina);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editandoId) {      
        const mascotaDTO = {
          mascota: {
            masc_nombre: formData.masc_nombre,
            masc_fecha_nacimiento: formData.masc_fecha_nacimiento,
            sexo: { sex_id: formData.sexo },
            tamanio: { tam_id: formData.tamanio },
            nivel_energia: { nien_id: formData.nivelEnergia },
            tipo_mascota: { tipma_id: formData.tipoMascota },
            estado_salud: { estsa_id: formData.estadoSalud },
            estado_vacuna: { estva_id: formData.estadoVacuna },
            masc_historia: formData.masc_historia,
            masc_observacion: formData.masc_observacion,
          },
          imagenUrls: imagenes,  
          newGustos: gustosSeleccionados  
        };
        try {
    const response = await actualizarMascota(token, editandoId, mascotaDTO);

    if (response && response.masc_id) {
      console.log("Mascota actualizada con éxito:", response);
      setFormData({
        masc_nombre: '',
        masc_fecha_nacimiento: '',
        masc_historia: '',
        masc_observacion: '',
        estadoSalud: '',
        estadoVacuna: '',
        nivelEnergia: '',
        tamanio: '',
        tipoMascota: '',
        sexo: ''
      });
      setImagenes(['']);
      setGustosSeleccionados([]);
    } else {
      console.error('Error al actualizar mascota, respuesta no válida:', response);
      alert('Error al actualizar mascota.');
    }
  } catch (error) {
    console.error("Error al actualizar mascota:", error);
    alert('Hubo un error al actualizar la mascota.');
  }      
  }else{
      const camposObligatorios = [
        formData.masc_nombre,
        formData.masc_fecha_nacimiento,
        formData.estadoSalud,
        formData.estadoVacuna,
        formData.nivelEnergia,
        formData.tamanio,
        formData.tipoMascota,
        formData.sexo
      ];

      if (camposObligatorios.includes('') || imagenes.includes('')) {
        alert('Por favor, complete todos los campos obligatorios.');
        return;
      }

      if (gustosSeleccionados.length === 0) {
        alert('Por favor, seleccione al menos un gusto.');
        return;
      }

      const mascotaDTO = {
        mascota: {
          masc_nombre: formData.masc_nombre,
          masc_fecha_nacimiento: formData.masc_fecha_nacimiento,
          sexo: { sex_id: formData.sexo },
          tamanio: { tam_id: formData.tamanio },
          nivel_energia: { nien_id: formData.nivelEnergia },
          tipo_mascota: { tipma_id: formData.tipoMascota },
          estado_salud: { estsa_id: formData.estadoSalud },
          estado_vacuna: { estva_id: formData.estadoVacuna },
          masc_historia: formData.masc_historia,
          masc_observacion: formData.masc_observacion
        },
        gustosIds: gustosSeleccionados,
        imagenUrls: imagenes
      };

      const token = localStorage.getItem('token');
      if (!token) {
        alert('Token no encontrado.');
        return;
      }

      try {
        const response = await registrarMascota(token, mascotaDTO);  
        if (response.code === 201) {
          console.log("Mascota registrada con éxito:", response.data);
          setFormData({
            masc_nombre: '',
            masc_fecha_nacimiento: '',
            masc_historia: '',
            masc_observacion: '',
            estadoSalud: '',
            estadoVacuna: '',
            nivelEnergia: '',
            tamanio: '',
            tipoMascota: '',
            sexo: ''
          });
          setImagenes(['']);
          setGustosSeleccionados([]);
        } else {
          console.error('Error al registrar mascota:', response);
          alert('Error al registrar mascota.');
        }
      } catch (error) {
        console.error("Error al registrar mascota:", error);
        alert('Hubo un error al registrar la mascota.');
      }
    }
    setEditandoId(null);
    const data = await fetchMascotas(token);
    setMascotas(data);    
  };

  const handleEditar = (mascota) => {
  setEditandoId(mascota.masc_id);
  setFormData({
    masc_nombre: mascota.masc_nombre || '',
    masc_fecha_nacimiento: mascota.masc_fecha_nacimiento || '',
    masc_historia: mascota.masc_historia || '',
    masc_observacion: mascota.masc_observacion || '',
    estadoSalud: mascota.estado_salud.estsa_id,
    estadoVacuna: mascota.estado_vacuna.estva_id,
    nivelEnergia: mascota.nivel_energia.nien_id,
    tamanio: mascota.tamanio.tam_id,
    tipoMascota: mascota.tipo_mascota.tipma_id,
    sexo: mascota.sexo.sex_id
  });

  setGustosSeleccionados(mascota.gustoNames ? mascota.gustoNames.map(gusto => gusto.id) : []);
  setImagenes(mascota.imagenes ? mascota.imagenes.map(img => img.ima_url) : []);
};
const handleCancelar = () => {
  setFormData({
    masc_nombre: '',
    masc_fecha_nacimiento: '',
    masc_historia: '',
    masc_observacion: '',
    estadoSalud: '',
    estadoVacuna: '',
    nivelEnergia: '',
    tamanio: '',
    tipoMascota: '',
    sexo: ''
  });
  setImagenes(['']); 
  setGustosSeleccionados([]); 
  setEditandoId(null);  
};

  const handleCambiarEstado = async (id, estadoActual) => {
    const nuevoEstado = estadoActual === 1 ? 0 : 1;
    const token = localStorage.getItem('token');
    try {
      await cambiarEstadoMascota(token, id, nuevoEstado);
      const mascotasFiltradas = await obtenerMascotasPorEstado(filtroEstado, token);
      setMascotas(mascotasFiltradas);
    } catch (error) {
      console.error('Error al cambiar estado', error);
    }
  };

  const handleVerMas = async (mascota) => {
    try {
      if (!mascota || !mascota.masc_id) {
        console.error('ID de mascota no válido:', evento);
        return;
      }
      const url = `http://localhost:8080/api/mascota/${mascota.masc_id}/public`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al obtener los detalles de la mascota');
      }

      const result = await response.json();
      const mascotaDetails = result.data;

      if (!mascotaDetails) {
        console.error('Detalles de la mascota no encontrados');
        return;
      }

      setMascotaSeleccionada(mascotaDetails);
      console.log('Detalles de la mascota:', mascotaDetails); 
    } catch (error) {
      alert('Hubo un error al cargar los detalles del evento.');
    }
  };  

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (index, value) => {
    const newImagenes = [...imagenes];
    newImagenes[index] = value;
    setImagenes(newImagenes);
  };

  const handleImageRemove = (index) => {
    const newImagenes = [...imagenes];
    newImagenes.splice(index, 1); 
    setImagenes(newImagenes);
  };

  const agregarCampoImagen = () => {
    setImagenes([...imagenes, '']);
  };

  const handleGustoChange = (id) => {
    setGustosSeleccionados(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ backgroundColor: '#F5F5DC' }} className="container mx-auto p-8 bg-gray-50 min-h-screen">
    <h2 className="text-3xl font-bold mb-6 text-center">Gestión de Mascotas</h2>
      {/* Formulario */}
        <FormularioMascota
          formData={formData}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          handleImageRemove={handleImageRemove}
          agregarCampoImagen={agregarCampoImagen}
          handleGustoChange={handleGustoChange}
          gustos={gustos}
          gustosSeleccionados={gustosSeleccionados}
          estadoSalud={estadoSalud}
          estadoVacuna={estadoVacuna}
          nivelEnergia={nivelEnergia}
          tamanios={tamanios}
          tipoMascota={tipoMascota}
          sexos={sexos}
          imagenes={imagenes}
          handleSubmit={handleSubmit}
          editandoId={editandoId}
          handleCancelar={handleCancelar}
        />
        {/* Filtro por estado y búsqueda */}
        <FiltroEstado 
          filtroEstado={filtroEstado} 
          setFiltroEstado={setFiltroEstado} 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
        />
        {/* Tabla de mascotas */}
       <TablaMascota 
        mascotasPaginados={mascotasPaginados}
        handleEditar={handleEditar}
        handleCambiarEstado={handleCambiarEstado}
        handleVerMas={handleVerMas} 
        paginaActual={paginaActual}
        registrosPorPagina={registrosPorPagina}
      />

      {/* Paginación */}
      <div className="flex justify-between items-center mt-6">
        <button onClick={() => handleCambiarPagina(paginaActual - 1)} disabled={paginaActual === 1} className="bg-[#dda15e] text-white px-6 py-2 rounded-lg disabled:opacity-50">
          Anterior
        </button>
        <span className="text-gray-700">
          Página {paginaActual} de {totalPaginas}
        </span>
        <button onClick={() => handleCambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas} className="bg-[#dda15e]  text-white px-6 py-2 rounded-lg disabled:opacity-50">
          Siguiente
        </button>
      </div>

      {/* Mostrar el modal si se ha seleccionado una mascota */}
      {mascotaSeleccionada && (
        <ModalMascota 
          mascotaSeleccionada={mascotaSeleccionada} 
          setMascotaSeleccionada={setMascotaSeleccionada} 
        />
      )}

    </div>
  );
};
export default MascotasAdmin;
