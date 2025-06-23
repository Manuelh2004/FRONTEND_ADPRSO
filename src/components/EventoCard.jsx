// src/components/EventoCard.jsx
import { Link } from "react-router-dom";

export default function EventoCard({ evento }) {
  const crearFechaLocal = (fechaString) => {
    const fecha = new Date(fechaString + "T00:00:00");
    return fecha.toLocaleDateString();
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition">
      {evento.even_imagen && (
        <img
          src={evento.even_imagen}
          alt={evento.even_nombre}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-blue-800">
          {evento.even_nombre}
        </h3>

        {evento.even_fecha_inicio && (
          <p className="text-sm text-gray-500">
            Inicia: {crearFechaLocal(evento.even_fecha_inicio)}
          </p>
        )}

        <p className="text-gray-600 mb-2">{evento.even_lugar}</p>
        <p className="text-gray-700 line-clamp-3 mb-4">{evento.even_descripcion}</p>

        <Link
          to={`/eventos/${evento.even_id}`}
          className="text-amber-600 font-semibold hover:underline"
        >
          Ver más
        </Link>
      </div>
    </div>
  );
}
