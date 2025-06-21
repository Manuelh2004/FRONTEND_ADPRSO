const EventoFila = ({ evento, handleEditar, handleCambiarEstado }) => {
  return (
    <tr>
      <td className="p-2">{evento.even_nombre}</td>
      <td className="p-2">{evento.even_descripcion}</td>
      <td className="p-2">{evento.even_fecha_inicio}</td>
      <td className="p-2">{evento.even_estado === 1 ? 'ACTIVO' : 'INACTIVO'}</td>
      <td className="p-2 space-x-2">
        <button
          onClick={() => handleEditar(evento)}
          className="text-blue-600 hover:underline"
        >
          Editar
        </button>
        <button
          onClick={() => handleCambiarEstado(evento.even_id, evento.even_estado)}
          className="text-red-600 hover:underline"
        >
          Cambiar estado
        </button>
      </td>
    </tr>
  );
};

export default EventoFila;
