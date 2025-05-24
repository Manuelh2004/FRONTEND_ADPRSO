import React from 'react';

export const Nosotros = () => {
  return (
    <div className="p-6 space-y-12">
      <h1 className="text-3xl font-bold text-center text-blue-900">¡CONÓCENOS MÁS!</h1>

      {/* Visión y Misión */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
        <div>
          <h2 className="text-2xl font-semibold text-blue-800">Visión</h2>
          <p className="text-gray-700 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-blue-800">Misión</h2>
          <p className="text-gray-700 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.</p>
        </div>
      </div>
      {/* Nuestra historia */}
      <div>
        <h2 className="text-2xl font-semibold text-center text-yellow-600 mb-6">Nuestra historia</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <p className="md:col-span-1 text-gray-700">En junio de 2012 se rescataron los primeros perros, Sabina y Lucky, 
            fundando un albergue que creció rápidamente. Tras rescatar más animales, se habilitó un terreno más grande. 
            En octubre de 2015 se creó una página para promover adopciones. Actualmente, albergamos 15 gatos y 22 perros, 
            con 98 adopciones registradas, enfocándose en rescate, curación, esterilización y adopción, 
            con la meta de seguir ayudando animales necesitados.</p>
          <div className="bg-gray-300 h-48 md:col-span-1" />
          <div className="bg-gray-300 h-24" />
          <div className="bg-gray-300 h-24" />
        </div>
      </div>
      {/* Estadísticas */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-blue-800">Nuestras estadísticas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-gray-700">
          <div className="bg-gray-200 p-4 rounded shadow">Adoptados: 50</div>
          <div className="bg-gray-200 p-4 rounded shadow">Abergados: 80</div>
          <div className="bg-gray-200 p-4 rounded shadow">Esterilizados: 70</div>
          <div className="bg-gray-200 p-4 rounded shadow">Rescatados: 15</div>
        </div>
      </div>
      {/* Logros y Colaboradores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Logros */}
        <div>
          <h2 className="text-xl font-semibold text-blue-800 mb-2">Logros</h2>
          <p className="text-gray-700 mb-4">Texto sobre logros aquí...</p>
          <div className="flex gap-4">
            <div className="bg-gray-300 h-32 w-32" />
            <div className="bg-gray-300 h-32 w-32" />
          </div>
        </div>
        {/* Colaboradores */}
        <div>
          <h2 className="text-xl font-semibold text-blue-800 mb-2">Colaboradores</h2>
          <p className="text-gray-700 mb-4">Texto sobre colaboradores aquí...</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-300 h-24" />
            <div className="bg-gray-300 h-24" />
            <div className="bg-gray-300 h-24" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nosotros;
