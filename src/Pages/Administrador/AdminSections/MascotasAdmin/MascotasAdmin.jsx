import React, { useEffect, useState } from 'react';
import FormularioMascota from './FormularioMascota'; // Asegúrate de importar el componente
import ApiService from '../../../../services/itemAdmApi'; 
import { registrarMascota, obtenerMascotasPorEstado, buscarMascotasPorNombre } from '../../../../services/mascota/mascotaAdmApi';
import TablaMascota from './TablaMascota';
import FiltroEstado from './FiltroEstado';  // Importar el filtro

const MascotasAdmin = () => {
  // Declaración de los estados
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

  const [mascotas, setMascotas] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("");  // Estado del filtro
  const [searchTerm, setSearchTerm] = useState("");  // Filtro por nombre
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  // Obtener las listas de items desde el servidor
  useEffect(() => {
    const fetchData = async () => {      
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

        // Traer las mascotas con el filtro de estado
        const mascotasData = await obtenerMascotasPorEstado(filtroEstado, token);
        setMascotas(mascotasData.data);
      } catch (error) {
        console.error("Error al cargar las listas de items:", error);
        setError('Error al cargar las mascotas');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filtroEstado, token]);  

  // Función para aplicar el filtro por nombre
  useEffect(() => {
    const applySearchFilter = () => {
      if (searchTerm) {
        const filteredMascotas = mascotas.filter((mascota) => 
          mascota.masc_nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setMascotas(filteredMascotas);
      } else {
        // Si no hay término de búsqueda, volvemos a las mascotas originales filtradas por estado
        const fetchMascotas = async () => {
          const mascotasData = await obtenerMascotasPorEstado(filtroEstado, token);
          setMascotas(mascotasData.data);
        };
        fetchMascotas();
      }
    };

    applySearchFilter();
  }, [searchTerm, mascotas, filtroEstado, token]);

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
    newImagenes.splice(index, 1); // Elimina el campo de imagen en la posición index
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos obligatorios
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
      const response = await registrarMascota(token, mascotaDTO);  // Usamos el servicio aquí

      // Verificar si la respuesta fue exitosa
      if (response.code === 201) {
        console.log("Mascota registrada con éxito:", response.data);

        // Limpiar los campos del formulario después del registro exitoso
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
  };

  return (
    <div>
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
      />
      <FiltroEstado 
        filtroEstado={filtroEstado} 
        setFiltroEstado={setFiltroEstado} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
      />
      <TablaMascota mascotas={mascotas} /> 
    </div>
  );
};

export default MascotasAdmin;
