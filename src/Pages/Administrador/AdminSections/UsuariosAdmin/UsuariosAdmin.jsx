import React from 'react';

const UsuariosAdmin = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-[#a68b5b]">Gestión de Usuarios</h2>
      <p className="mb-2">Administra usuarios del sistema: voluntarios, administradores, adoptantes.</p>
      {/* Tabla y formulario CRUD aquí */}
      <div className="bg-white p-4 shadow rounded">
        <p>Lista de usuarios (tabla)</p>
      </div>
    </div>
  );
};

export default UsuariosAdmin;
