import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormularioMascota from './FormularioMascota'; // Asegúrate de importar el componente

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

  // Obtener las listas de items desde el servidor
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Realizamos las peticiones a las API
        const responseSalud = await axios.get('http://localhost:8080/admin/api/item/estado_salud', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setEstadoSalud(responseSalud.data.data);

        const responseVacuna = await axios.get('http://localhost:8080/admin/api/item/estado_vacuna', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setEstadoVacuna(responseVacuna.data.data);

        const responseEnergia = await axios.get('http://localhost:8080/admin/api/item/nivel_energia', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setNivelEnergia(responseEnergia.data.data);

        const responseTamanio = await axios.get('http://localhost:8080/admin/api/item/tamanios', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setTamanios(responseTamanio.data.data);

        const responseTipoMascota = await axios.get('http://localhost:8080/admin/api/item/tipo_mascota', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setTipoMascota(responseTipoMascota.data.data);

        const responseSexo = await axios.get('http://localhost:8080/admin/api/item/sexo', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setSexos(responseSexo.data.data);

        const responseGustos = await axios.get('http://localhost:8080/admin/api/item/gustos', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setGustos(responseGustos.data.data);

      } catch (error) {
        console.error("Error al cargar las listas de items:", error);
      }
    };

    fetchData();
  }, []);

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
    newImagenes.splice(index, 1); // Elimina el campo de imagen en la posición `index`
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
    try {
      const response = await axios.post('http://localhost:8080/admin/api/mascota/registrar_mascota', mascotaDTO, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 201) {
        console.log("Mascota registrada con éxito:", response.data);
      } else {
        console.error('Error al registrar mascota:', response);
      }
    } catch (error) {
      console.error("Error al registrar mascota:", error);
    }
  };

  return (
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
  );
};

export default MascotasAdmin;
